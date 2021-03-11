import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";

export type Team = {
  country?: CountryWhereUniqueInput | null;
  createdAt: Date;
  id: string;
  league: string | null;
  updatedAt: Date;
};
