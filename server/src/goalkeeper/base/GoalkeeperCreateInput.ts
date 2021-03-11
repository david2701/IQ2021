import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GoalkeeperWhereUniqueInput } from "./GoalkeeperWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class GoalkeeperCreateInput {
  @ApiProperty({
    required: false,
    type: GoalkeeperWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GoalkeeperWhereUniqueInput)
  @IsOptional()
  @Field(() => GoalkeeperWhereUniqueInput, {
    nullable: true,
  })
  goalkeeper?: GoalkeeperWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  positionGoalkeeper?: string | null;
}
export { GoalkeeperCreateInput };
