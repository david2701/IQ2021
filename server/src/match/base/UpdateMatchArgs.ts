import { ArgsType, Field } from "@nestjs/graphql";
import { MatchWhereUniqueInput } from "./MatchWhereUniqueInput";
import { MatchUpdateInput } from "./MatchUpdateInput";

@ArgsType()
class UpdateMatchArgs {
  @Field(() => MatchWhereUniqueInput, { nullable: false })
  where!: MatchWhereUniqueInput;
  @Field(() => MatchUpdateInput, { nullable: false })
  data!: MatchUpdateInput;
}

export { UpdateMatchArgs };
