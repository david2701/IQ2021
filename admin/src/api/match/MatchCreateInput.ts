import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type MatchCreateInput = {
  date?: Date | null;
  local?: TeamWhereUniqueInput;
  visitor?: TeamWhereUniqueInput | null;
};
