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
import { PlayerLegendary } from "../api/playerLegendary/PlayerLegendary";
import { PlayerLegendaryCreateInput } from "../api/playerLegendary/PlayerLegendaryCreateInput";

const INITIAL_VALUES = {} as PlayerLegendaryCreateInput;

export const CreatePlayerLegendary = (): React.ReactElement => {
  useBreadcrumbs("/player-legendaries/new", "Create Player Legendary");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    PlayerLegendary,
    AxiosError,
    PlayerLegendaryCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/player-legendaries", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/player-legendaries"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: PlayerLegendaryCreateInput) => {
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
            <FormHeader title={"Create Player Legendary"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
