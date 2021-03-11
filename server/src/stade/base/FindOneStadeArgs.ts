import { ArgsType, Field } from "@nestjs/graphql";
import { StadeWhereUniqueInput } from "./StadeWhereUniqueInput";

@ArgsType()
class FindOneStadeArgs {
  @Field(() => StadeWhereUniqueInput, { nullable: false })
  where!: StadeWhereUniqueInput;
}

export { FindOneStadeArgs };
