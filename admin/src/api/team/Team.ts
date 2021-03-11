import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";
import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";

export type Team = {
  country?: CountryWhereUniqueInput | null;
  createdAt: Date;
  id: string;
  league: string | null;
  matches?: MatchWhereUniqueInput | null;
  updatedAt: Date;
  visitor?: MatchWhereUniqueInput;
};
