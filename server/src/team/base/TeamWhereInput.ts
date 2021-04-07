import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CountryWhereUniqueInput } from "../../country/base/CountryWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { MatchWhereUniqueInput } from "../../match/base/MatchWhereUniqueInput";
@InputType()
class TeamWhereInput {
  @ApiProperty({
    required: false,
    type: CountryWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => CountryWhereUniqueInput)
  @IsOptional()
  country?: CountryWhereUniqueInput | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;
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
  @ApiProperty({
    required: false,
    type: MatchWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => MatchWhereUniqueInput)
  @IsOptional()
  matches?: MatchWhereUniqueInput | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date;
  @ApiProperty({
    required: false,
    type: MatchWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => MatchWhereUniqueInput)
  @IsOptional()
  visitor?: MatchWhereUniqueInput;
}
export { TeamWhereInput };
