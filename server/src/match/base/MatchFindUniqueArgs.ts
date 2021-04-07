import { ArgsType, Field } from "@nestjs/graphql";
import { MatchWhereUniqueInput } from "./MatchWhereUniqueInput";

@ArgsType()
class MatchFindUniqueArgs {
  @Field(() => MatchWhereUniqueInput, { nullable: false })
  where!: MatchWhereUniqueInput;
}

export { MatchFindUniqueArgs };
