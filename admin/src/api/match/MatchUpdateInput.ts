import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type MatchUpdateInput = {
  date?: Date | null;
  local?: TeamWhereUniqueInput;
  visitor?: TeamWhereUniqueInput | null;
};
