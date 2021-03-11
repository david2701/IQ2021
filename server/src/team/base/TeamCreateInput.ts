import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CountryWhereUniqueInput } from "../../country/base/CountryWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class TeamCreateInput {
  @ApiProperty({
    required: false,
    type: CountryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CountryWhereUniqueInput)
  @IsOptional()
  @Field(() => CountryWhereUniqueInput, {
    nullable: true,
  })
  country?: CountryWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  league?: string | null;
}
export { TeamCreateInput };
