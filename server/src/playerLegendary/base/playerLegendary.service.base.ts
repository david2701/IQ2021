import { PrismaService } from "nestjs-prisma";
import {
  FindOnePlayerLegendaryArgs,
  FindManyPlayerLegendaryArgs,
  PlayerLegendaryCreateArgs,
  PlayerLegendaryUpdateArgs,
  PlayerLegendaryDeleteArgs,
  Subset,
} from "@prisma/client";

export class PlayerLegendaryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyPlayerLegendaryArgs>(
    args: Subset<T, FindManyPlayerLegendaryArgs>
  ) {
    return this.prisma.playerLegendary.findMany(args);
  }
  findOne<T extends FindOnePlayerLegendaryArgs>(
    args: Subset<T, FindOnePlayerLegendaryArgs>
  ) {
    return this.prisma.playerLegendary.findOne(args);
  }
  create<T extends PlayerLegendaryCreateArgs>(
    args: Subset<T, PlayerLegendaryCreateArgs>
  ) {
    return this.prisma.playerLegendary.create<T>(args);
  }
  update<T extends PlayerLegendaryUpdateArgs>(
    args: Subset<T, PlayerLegendaryUpdateArgs>
  ) {
    return this.prisma.playerLegendary.update<T>(args);
  }
  delete<T extends PlayerLegendaryDeleteArgs>(
    args: Subset<T, PlayerLegendaryDeleteArgs>
  ) {
    return this.prisma.playerLegendary.delete(args);
  }
}
