import { ArgsType, Field } from "@nestjs/graphql";
import { MyTeamWhereUniqueInput } from "./MyTeamWhereUniqueInput";

@ArgsType()
class FindOneMyTeamArgs {
  @Field(() => MyTeamWhereUniqueInput, { nullable: false })
  where!: MyTeamWhereUniqueInput;
}

export { FindOneMyTeamArgs };
