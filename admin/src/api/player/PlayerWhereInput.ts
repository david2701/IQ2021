import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerWhereInput = {
  createdAt?: Date;
  id?: string;
  league?: string | null;
  name?: string | null;
  number?: string | null;
  team?: TeamWhereUniqueInput | null;
  updatedAt?: Date;
};
