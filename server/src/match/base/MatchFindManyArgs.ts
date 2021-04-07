import { ArgsType, Field } from "@nestjs/graphql";
import { MatchWhereInput } from "./MatchWhereInput";

@ArgsType()
class MatchFindManyArgs {
  @Field(() => MatchWhereInput, { nullable: true })
  where?: MatchWhereInput;
}

export { MatchFindManyArgs };
