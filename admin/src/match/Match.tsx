import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TeamSelect } from "../team/TeamSelect";
import { Match as TMatch } from "../api/match/Match";
import { MatchUpdateInput } from "../api/match/MatchUpdateInput";

export const Match = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/matches/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TMatch,
    AxiosError,
    [string, string]
  >(["get-/api/matches", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/matches"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TMatch, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/matches"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//matches");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TMatch, AxiosError, MatchUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/matches"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: MatchUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["date", "local", "visitor"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Match"} ${
                  data?.id && data?.id.length ? data.id : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField type="datetime-local" label="Date" name="date" />
            </div>
            <div>
              <TeamSelect label="Local" name="local.id" />
            </div>
            <div>
              <TeamSelect label="Visitor" name="visitor.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
