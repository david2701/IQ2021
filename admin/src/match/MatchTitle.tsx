import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Match } from "../api/match/Match";

type Props = { id: string };

export const MatchTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Match,
    AxiosError,
    [string, string]
  >(["get-/api/matches", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/matches"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/matches"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
