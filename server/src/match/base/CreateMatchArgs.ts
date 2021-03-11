import { ArgsType, Field } from "@nestjs/graphql";
import { MatchCreateInput } from "./MatchCreateInput";

@ArgsType()
class CreateMatchArgs {
  @Field(() => MatchCreateInput, { nullable: false })
  data!: MatchCreateInput;
}

export { CreateMatchArgs };
