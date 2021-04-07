import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerLegendaryWhereInput } from "./PlayerLegendaryWhereInput";

@ArgsType()
class FindManyPlayerLegendaryArgs {
  @Field(() => PlayerLegendaryWhereInput, { nullable: true })
  where?: PlayerLegendaryWhereInput;
}

export { FindManyPlayerLegendaryArgs };
