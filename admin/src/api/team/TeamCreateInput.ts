import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";
import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";

export type TeamCreateInput = {
  country?: CountryWhereUniqueInput | null;
  league?: string | null;
  matches?: MatchWhereUniqueInput | null;
  visitor?: MatchWhereUniqueInput;
};
