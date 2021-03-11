import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerUpdateInput = {
  league?: string | null;
  name?: string | null;
  number?: string | null;
  team?: TeamWhereUniqueInput | null;
};
