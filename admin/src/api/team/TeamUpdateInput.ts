import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";

export type TeamUpdateInput = {
  country?: CountryWhereUniqueInput | null;
  league?: string | null;
};
