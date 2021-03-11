import { PrismaService } from "nestjs-prisma";
import {
  FindOneStadeArgs,
  FindManyStadeArgs,
  StadeCreateArgs,
  StadeUpdateArgs,
  StadeDeleteArgs,
  Subset,
} from "@prisma/client";

export class StadeServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyStadeArgs>(args: Subset<T, FindManyStadeArgs>) {
    return this.prisma.stade.findMany(args);
  }
  findOne<T extends FindOneStadeArgs>(args: Subset<T, FindOneStadeArgs>) {
    return this.prisma.stade.findOne(args);
  }
  create<T extends StadeCreateArgs>(args: Subset<T, StadeCreateArgs>) {
    return this.prisma.stade.create<T>(args);
  }
  update<T extends StadeUpdateArgs>(args: Subset<T, StadeUpdateArgs>) {
    return this.prisma.stade.update<T>(args);
  }
  delete<T extends StadeDeleteArgs>(args: Subset<T, StadeDeleteArgs>) {
    return this.prisma.stade.delete(args);
  }
}
