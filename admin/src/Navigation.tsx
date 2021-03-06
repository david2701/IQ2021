import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="Teams" to="/teams" />
      <NavigationItem name="Countries" to="/countries" />
      <NavigationItem name="Players" to="/players" />
      <NavigationItem name="Matches" to="/matches" />
      <NavigationItem name="Goalkeepers" to="/goalkeepers" />
      <NavigationItem name="My teams" to="/my-teams" />
      <NavigationItem name="Stades" to="/stades" />
      <NavigationItem name="Player Legendaries" to="/player-legendaries" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
