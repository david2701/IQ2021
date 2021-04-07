import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TeamSelect } from "../team/TeamSelect";
import { Match as TMatch } from "../api/match/Match";
import { MatchCreateInput } from "../api/match/MatchCreateInput";

const INITIAL_VALUES = {} as MatchCreateInput;

export const CreateMatch = (): React.ReactElement => {
  useBreadcrumbs("/matches/new", "Create Match");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TMatch,
    AxiosError,
    MatchCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/matches", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/matches"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: MatchCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Match"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
