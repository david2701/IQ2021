import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type MatchWhereInput = {
  createdAt?: Date;
  date?: Date | null;
  id?: string;
  local?: TeamWhereUniqueInput | null;
  updatedAt?: Date;
  visitor?: TeamWhereUniqueInput | null;
};
