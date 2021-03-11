import { PrismaService } from "nestjs-prisma";
import {
  FindOnePlayerArgs,
  FindManyPlayerArgs,
  PlayerCreateArgs,
  PlayerUpdateArgs,
  PlayerDeleteArgs,
  Subset,
} from "@prisma/client";

export class PlayerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyPlayerArgs>(args: Subset<T, FindManyPlayerArgs>) {
    return this.prisma.player.findMany(args);
  }
  findOne<T extends FindOnePlayerArgs>(args: Subset<T, FindOnePlayerArgs>) {
    return this.prisma.player.findOne(args);
  }
  create<T extends PlayerCreateArgs>(args: Subset<T, PlayerCreateArgs>) {
    return this.prisma.player.create<T>(args);
  }
  update<T extends PlayerUpdateArgs>(args: Subset<T, PlayerUpdateArgs>) {
    return this.prisma.player.update<T>(args);
  }
  delete<T extends PlayerDeleteArgs>(args: Subset<T, PlayerDeleteArgs>) {
    return this.prisma.player.delete(args);
  }
}
