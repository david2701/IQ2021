import { GoalkeeperWhereUniqueInput } from "./GoalkeeperWhereUniqueInput";

export type GoalkeeperWhereInput = {
  createdAt?: Date;
  goalkeeper?: GoalkeeperWhereUniqueInput | null;
  id?: string;
  positionGoalkeeper?: string | null;
  updatedAt?: Date;
};
