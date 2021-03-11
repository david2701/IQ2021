import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type Match = {
  createdAt: Date;
  date: Date | null;
  id: string;
  local?: TeamWhereUniqueInput;
  updatedAt: Date;
  visitor?: TeamWhereUniqueInput | null;
};
