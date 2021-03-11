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
import { GoalkeeperSelect } from "./GoalkeeperSelect";
import { Goalkeeper as TGoalkeeper } from "../api/goalkeeper/Goalkeeper";
import { GoalkeeperUpdateInput } from "../api/goalkeeper/GoalkeeperUpdateInput";

export const Goalkeeper = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/goalkeepers/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TGoalkeeper,
    AxiosError,
    [string, string]
  >(["get-/api/goalkeepers", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/goalkeepers"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TGoalkeeper, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/goalkeepers"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//goalkeepers");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TGoalkeeper, AxiosError, GoalkeeperUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/goalkeepers"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: GoalkeeperUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.positionGoalkeeper);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["goalkeeper", "positionGoalkeeper"]),
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
                title={`${"Goalkeeper"} ${
                  data?.positionGoalkeeper && data?.positionGoalkeeper.length
                    ? data.positionGoalkeeper
                    : data?.id
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
              <GoalkeeperSelect label="Goalkeeper" name="goalkeeper.id" />
            </div>
            <div>
              <TextField
                label="Position_Goalkeeper"
                name="positionGoalkeeper"
              />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
