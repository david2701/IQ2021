import { ArgsType, Field } from "@nestjs/graphql";
import { GoalkeeperWhereInput } from "./GoalkeeperWhereInput";

@ArgsType()
class FindManyGoalkeeperArgs {
  @Field(() => GoalkeeperWhereInput, { nullable: true })
  where?: GoalkeeperWhereInput;
}

export { FindManyGoalkeeperArgs };
