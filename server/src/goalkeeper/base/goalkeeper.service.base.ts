import { PrismaService } from "nestjs-prisma";
import {
  FindOneGoalkeeperArgs,
  FindManyGoalkeeperArgs,
  GoalkeeperCreateArgs,
  GoalkeeperUpdateArgs,
  GoalkeeperDeleteArgs,
  Subset,
} from "@prisma/client";

export class GoalkeeperServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyGoalkeeperArgs>(
    args: Subset<T, FindManyGoalkeeperArgs>
  ) {
    return this.prisma.goalkeeper.findMany(args);
  }
  findOne<T extends FindOneGoalkeeperArgs>(
    args: Subset<T, FindOneGoalkeeperArgs>
  ) {
    return this.prisma.goalkeeper.findOne(args);
  }
  create<T extends GoalkeeperCreateArgs>(
    args: Subset<T, GoalkeeperCreateArgs>
  ) {
    return this.prisma.goalkeeper.create<T>(args);
  }
  update<T extends GoalkeeperUpdateArgs>(
    args: Subset<T, GoalkeeperUpdateArgs>
  ) {
    return this.prisma.goalkeeper.update<T>(args);
  }
  delete<T extends GoalkeeperDeleteArgs>(
    args: Subset<T, GoalkeeperDeleteArgs>
  ) {
    return this.prisma.goalkeeper.delete(args);
  }
}
