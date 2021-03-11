import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerLegendaryWhereUniqueInput } from "./PlayerLegendaryWhereUniqueInput";

@ArgsType()
class FindOnePlayerLegendaryArgs {
  @Field(() => PlayerLegendaryWhereUniqueInput, { nullable: false })
  where!: PlayerLegendaryWhereUniqueInput;
}

export { FindOnePlayerLegendaryArgs };
