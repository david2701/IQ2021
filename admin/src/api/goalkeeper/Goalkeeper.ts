import { GoalkeeperWhereUniqueInput } from "./GoalkeeperWhereUniqueInput";

export type Goalkeeper = {
  createdAt: Date;
  goalkeeper?: GoalkeeperWhereUniqueInput | null;
  id: string;
  positionGoalkeeper: string | null;
  updatedAt: Date;
};
