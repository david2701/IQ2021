import { ArgsType, Field } from "@nestjs/graphql";
import { MatchWhereUniqueInput } from "./MatchWhereUniqueInput";

@ArgsType()
class FindOneMatchArgs {
  @Field(() => MatchWhereUniqueInput, { nullable: false })
  where!: MatchWhereUniqueInput;
}

export { FindOneMatchArgs };
