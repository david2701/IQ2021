import { ArgsType, Field } from "@nestjs/graphql";
import { CountryWhereInput } from "./CountryWhereInput";

@ArgsType()
class FindManyCountryArgs {
  @Field(() => CountryWhereInput, { nullable: true })
  where?: CountryWhereInput;
}

export { FindManyCountryArgs };
