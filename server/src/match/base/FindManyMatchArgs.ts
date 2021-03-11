import { ArgsType, Field } from "@nestjs/graphql";
import { MatchWhereInput } from "./MatchWhereInput";

@ArgsType()
class FindManyMatchArgs {
  @Field(() => MatchWhereInput, { nullable: true })
  where?: MatchWhereInput;
}

export { FindManyMatchArgs };
