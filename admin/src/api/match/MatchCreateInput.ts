import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type MatchCreateInput = {
  date?: Date | null;
  local?: TeamWhereUniqueInput | null;
  visitor?: TeamWhereUniqueInput | null;
};
