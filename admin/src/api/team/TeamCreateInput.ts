import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";
import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";

export type TeamCreateInput = {
  colorA?: string | null;
  colorB?: string | null;
  colorC?: string | null;
  country?: CountryWhereUniqueInput | null;
  league?: string | null;
  logo?: string | null;
  matches?: MatchWhereUniqueInput | null;
  visitor?: MatchWhereUniqueInput;
};
