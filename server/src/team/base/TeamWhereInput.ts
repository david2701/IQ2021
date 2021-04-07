import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested, IsDate } from "class-validator";
import { CountryWhereUniqueInput } from "../../country/base/CountryWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import { MatchWhereUniqueInput } from "../../match/base/MatchWhereUniqueInput";
@InputType()
class TeamWhereInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  colorA?: string | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  colorB?: string | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  colorC?: string | null;
  @ApiProperty({
    required: false,
    type: CountryWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => CountryWhereUniqueInput)
  @IsOptional()
  @Field(() => CountryWhereUniqueInput, {
    nullable: true,
  })
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
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  logo?: string | null;
  @ApiProperty({
    required: false,
    type: MatchWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => MatchWhereUniqueInput)
  @IsOptional()
  @Field(() => MatchWhereUniqueInput, {
    nullable: true,
  })
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
  @Field(() => MatchWhereUniqueInput, {
    nullable: true,
  })
  visitor?: MatchWhereUniqueInput;
}
export { TeamWhereInput };
