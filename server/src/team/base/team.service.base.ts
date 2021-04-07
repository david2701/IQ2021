import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  Team,
  PlayerLegendary,
  Player,
  Country,
  Match,
} from "@prisma/client";

export class TeamServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.TeamFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamFindManyArgs>
  ): Promise<Team[]> {
    return this.prisma.team.findMany(args);
  }
  async findOne<T extends Prisma.TeamFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamFindUniqueArgs>
  ): Promise<Team | null> {
    return this.prisma.team.findUnique(args);
  }
  async create<T extends Prisma.TeamCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamCreateArgs>
  ): Promise<Team> {
    return this.prisma.team.create<T>(args);
  }
  async update<T extends Prisma.TeamUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamUpdateArgs>
  ): Promise<Team> {
    return this.prisma.team.update<T>(args);
  }
  async delete<T extends Prisma.TeamDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamDeleteArgs>
  ): Promise<Team> {
    return this.prisma.team.delete(args);
  }

  async findPlayerLegendaries(
    parentId: string,
    args: Prisma.PlayerLegendaryFindManyArgs
  ): Promise<PlayerLegendary[]> {
    return this.prisma.team
      .findUnique({
        where: { id: parentId },
      })
      .playerLegendaries(args);
  }

  async findPlayers(
    parentId: string,
    args: Prisma.PlayerFindManyArgs
  ): Promise<Player[]> {
    return this.prisma.team
      .findUnique({
        where: { id: parentId },
      })
      .players(args);
  }

  async getCountry(parentId: string): Promise<Country | null> {
    return this.prisma.team
      .findUnique({
        where: { id: parentId },
      })
      .country();
  }

  async getMatches(parentId: string): Promise<Match | null> {
    return this.prisma.team
      .findUnique({
        where: { id: parentId },
      })
      .matches();
  }

  async getVisitor(parentId: string): Promise<Match | null> {
    return this.prisma.team
      .findUnique({
        where: { id: parentId },
      })
      .visitor();
  }
}
