import { ArgsType, Field } from "@nestjs/graphql";
import { StadeWhereInput } from "./StadeWhereInput";

@ArgsType()
class FindManyStadeArgs {
  @Field(() => StadeWhereInput, { nullable: true })
  where?: StadeWhereInput;
}

export { FindManyStadeArgs };
