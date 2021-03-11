import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";

export type TeamCreateInput = {
  country?: CountryWhereUniqueInput | null;
  league?: string | null;
};
