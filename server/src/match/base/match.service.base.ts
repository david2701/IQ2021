import { PrismaService } from "nestjs-prisma";
import { Prisma, Match, Team } from "@prisma/client";

export class MatchServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.MatchFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchFindManyArgs>
  ): Promise<Match[]> {
    return this.prisma.match.findMany(args);
  }
  async findOne<T extends Prisma.MatchFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchFindUniqueArgs>
  ): Promise<Match | null> {
    return this.prisma.match.findUnique(args);
  }
  async create<T extends Prisma.MatchCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchCreateArgs>
  ): Promise<Match> {
    return this.prisma.match.create<T>(args);
  }
  async update<T extends Prisma.MatchUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchUpdateArgs>
  ): Promise<Match> {
    return this.prisma.match.update<T>(args);
  }
  async delete<T extends Prisma.MatchDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchDeleteArgs>
  ): Promise<Match> {
    return this.prisma.match.delete(args);
  }

  async getLocal(parentId: string): Promise<Team | null> {
    return this.prisma.match
      .findUnique({
        where: { id: parentId },
      })
      .local();
  }

  async getVisitor(parentId: string): Promise<Team | null> {
    return this.prisma.match
      .findUnique({
        where: { id: parentId },
      })
      .visitor();
  }
}
