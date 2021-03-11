import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerWhereInput } from "./PlayerWhereInput";

@ArgsType()
class FindManyPlayerArgs {
  @Field(() => PlayerWhereInput, { nullable: true })
  where?: PlayerWhereInput;
}

export { FindManyPlayerArgs };
