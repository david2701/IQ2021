import { ArgsType, Field } from "@nestjs/graphql";
import { GoalkeeperWhereUniqueInput } from "./GoalkeeperWhereUniqueInput";

@ArgsType()
class FindOneGoalkeeperArgs {
  @Field(() => GoalkeeperWhereUniqueInput, { nullable: false })
  where!: GoalkeeperWhereUniqueInput;
}

export { FindOneGoalkeeperArgs };
