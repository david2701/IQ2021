import { ArgsType, Field } from "@nestjs/graphql";
import { MatchWhereUniqueInput } from "./MatchWhereUniqueInput";

@ArgsType()
class DeleteMatchArgs {
  @Field(() => MatchWhereUniqueInput, { nullable: false })
  where!: MatchWhereUniqueInput;
}

export { DeleteMatchArgs };
