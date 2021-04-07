import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";
import { MatchWhereUniqueInput } from "../match/MatchWhereUniqueInput";

export type TeamWhereInput = {
  colorA?: string | null;
  colorB?: string | null;
  colorC?: string | null;
  country?: CountryWhereUniqueInput | null;
  createdAt?: Date;
  id?: string;
  league?: string | null;
  logo?: string | null;
  matches?: MatchWhereUniqueInput | null;
  updatedAt?: Date;
  visitor?: MatchWhereUniqueInput;
};
