import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerWhereUniqueInput } from "./PlayerWhereUniqueInput";

@ArgsType()
class FindOnePlayerArgs {
  @Field(() => PlayerWhereUniqueInput, { nullable: false })
  where!: PlayerWhereUniqueInput;
}

export { FindOnePlayerArgs };
