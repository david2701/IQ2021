import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { MatchList } from "./MatchList";
import { CreateMatch } from "./CreateMatch";
import { Match } from "./Match";

export const MatchIndex = (): React.ReactElement => {
  useBreadcrumbs("/matches/", "Matches");

  return (
    <Switch>
      <PrivateRoute exact path={"/matches/"} component={MatchList} />
      <PrivateRoute path={"/matches/new"} component={CreateMatch} />
      <PrivateRoute path={"/matches/:id"} component={Match} />
    </Switch>
  );
};
