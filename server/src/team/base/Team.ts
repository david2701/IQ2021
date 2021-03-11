import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CountryWhereUniqueInput } from "../../country/base/CountryWhereUniqueInput";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { MatchWhereUniqueInput } from "../../match/base/MatchWhereUniqueInput";
@ObjectType()
class Team {
  @ApiProperty({
    required: false,
    type: CountryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CountryWhereUniqueInput)
  @IsOptional()
  country?: CountryWhereUniqueInput | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  league!: string | null;
  @ApiProperty({
    required: false,
    type: MatchWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => MatchWhereUniqueInput)
  @IsOptional()
  matches?: MatchWhereUniqueInput | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
  @ApiProperty({
    required: false,
    type: MatchWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => MatchWhereUniqueInput)
  @IsOptional()
  visitor?: MatchWhereUniqueInput;
}
export { Team };
