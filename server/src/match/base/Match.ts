import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TeamWhereUniqueInput } from "../../team/base/TeamWhereUniqueInput";
@ObjectType()
class Match {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  date!: Date | null;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: false,
    type: TeamWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TeamWhereUniqueInput)
  @IsOptional()
  local?: TeamWhereUniqueInput | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
  @ApiProperty({
    required: false,
    type: TeamWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TeamWhereUniqueInput)
  @IsOptional()
  visitor?: TeamWhereUniqueInput | null;
}
export { Match };
