import { PrismaService } from "nestjs-prisma";
import {
  FindOneMatchArgs,
  FindManyMatchArgs,
  MatchCreateArgs,
  MatchUpdateArgs,
  MatchDeleteArgs,
  Subset,
} from "@prisma/client";

export class MatchServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyMatchArgs>(args: Subset<T, FindManyMatchArgs>) {
    return this.prisma.match.findMany(args);
  }
  findOne<T extends FindOneMatchArgs>(args: Subset<T, FindOneMatchArgs>) {
    return this.prisma.match.findOne(args);
  }
  create<T extends MatchCreateArgs>(args: Subset<T, MatchCreateArgs>) {
    return this.prisma.match.create<T>(args);
  }
  update<T extends MatchUpdateArgs>(args: Subset<T, MatchUpdateArgs>) {
    return this.prisma.match.update<T>(args);
  }
  delete<T extends MatchDeleteArgs>(args: Subset<T, MatchDeleteArgs>) {
    return this.prisma.match.delete(args);
  }
}
