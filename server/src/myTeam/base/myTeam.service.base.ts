import { PrismaService } from "nestjs-prisma";
import {
  FindOneMyTeamArgs,
  FindManyMyTeamArgs,
  MyTeamCreateArgs,
  MyTeamUpdateArgs,
  MyTeamDeleteArgs,
  Subset,
} from "@prisma/client";

export class MyTeamServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyMyTeamArgs>(args: Subset<T, FindManyMyTeamArgs>) {
    return this.prisma.myTeam.findMany(args);
  }
  findOne<T extends FindOneMyTeamArgs>(args: Subset<T, FindOneMyTeamArgs>) {
    return this.prisma.myTeam.findOne(args);
  }
  create<T extends MyTeamCreateArgs>(args: Subset<T, MyTeamCreateArgs>) {
    return this.prisma.myTeam.create<T>(args);
  }
  update<T extends MyTeamUpdateArgs>(args: Subset<T, MyTeamUpdateArgs>) {
    return this.prisma.myTeam.update<T>(args);
  }
  delete<T extends MyTeamDeleteArgs>(args: Subset<T, MyTeamDeleteArgs>) {
    return this.prisma.myTeam.delete(args);
  }
}
