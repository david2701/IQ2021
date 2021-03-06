import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { CountryTitle } from "../country/CountryTitle";
import { MatchTitle } from "../match/MatchTitle";
import { Team as TTeam } from "../api/team/Team";

type Data = TTeam[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "colorA",
    title: "ColorA",
    sortable: false,
  },
  {
    name: "colorB",
    title: "ColorB",
    sortable: false,
  },
  {
    name: "colorC",
    title: "ColorC",
    sortable: false,
  },
  {
    name: "country",
    title: "Country",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "league",
    title: "League",
    sortable: false,
  },
  {
    name: "logo",
    title: "Logo",
    sortable: false,
  },
  {
    name: "matches",
    title: "Matches",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "visitor",
    title: "Visitor",
    sortable: false,
  },
];

export const TeamList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/teams",
    async () => {
      const response = await api.get("/api/teams");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Teams"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/teams/new"}>
            <Button>Create Team </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: TTeam) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/teams"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>{item.colorA}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.colorB}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.colorC}</>
                </DataGridCell>
                <DataGridCell>
                  <CountryTitle id={item.country?.id} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.league}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.logo}</>
                </DataGridCell>
                <DataGridCell>
                  <MatchTitle id={item.matches?.id} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <MatchTitle id={item.visitor?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
