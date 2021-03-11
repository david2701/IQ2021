import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { MyTeamList } from "./MyTeamList";
import { CreateMyTeam } from "./CreateMyTeam";
import { MyTeam } from "./MyTeam";

export const MyTeamIndex = (): React.ReactElement => {
  useBreadcrumbs("/my-teams/", "My teams");

  return (
    <Switch>
      <PrivateRoute exact path={"/my-teams/"} component={MyTeamList} />
      <PrivateRoute path={"/my-teams/new"} component={CreateMyTeam} />
      <PrivateRoute path={"/my-teams/:id"} component={MyTeam} />
    </Switch>
  );
};
