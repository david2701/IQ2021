import { ArgsType, Field } from "@nestjs/graphql";
import { CountryWhereUniqueInput } from "./CountryWhereUniqueInput";

@ArgsType()
class FindOneCountryArgs {
  @Field(() => CountryWhereUniqueInput, { nullable: false })
  where!: CountryWhereUniqueInput;
}

export { FindOneCountryArgs };
