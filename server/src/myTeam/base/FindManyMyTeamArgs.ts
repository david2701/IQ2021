import { ArgsType, Field } from "@nestjs/graphql";
import { MyTeamWhereInput } from "./MyTeamWhereInput";

@ArgsType()
class FindManyMyTeamArgs {
  @Field(() => MyTeamWhereInput, { nullable: true })
  where?: MyTeamWhereInput;
}

export { FindManyMyTeamArgs };
