import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateTeamArgs } from "./CreateTeamArgs";
import { UpdateTeamArgs } from "./UpdateTeamArgs";
import { DeleteTeamArgs } from "./DeleteTeamArgs";
import { TeamFindManyArgs } from "./TeamFindManyArgs";
import { TeamFindUniqueArgs } from "./TeamFindUniqueArgs";
import { Team } from "./Team";
import { PlayerLegendaryFindManyArgs } from "../../playerLegendary/base/PlayerLegendaryFindManyArgs";
import { PlayerLegendary } from "../../playerLegendary/base/PlayerLegendary";
import { PlayerFindManyArgs } from "../../player/base/PlayerFindManyArgs";
import { Player } from "../../player/base/Player";
import { Country } from "../../country/base/Country";
import { Match } from "../../match/base/Match";
import { TeamService } from "../team.service";

@graphql.Resolver(() => Team)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TeamResolverBase {
  constructor(
    protected readonly service: TeamService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Team])
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async teams(
    @graphql.Args() args: TeamFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Team, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "own",
  })
  async team(
    @graphql.Args() args: TeamFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Team",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Team)
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "create",
    possession: "any",
  })
  async createTeam(
    @graphql.Args() args: CreateTeamArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Team",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Team"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        country: args.data.country
          ? {
              connect: args.data.country,
            }
          : undefined,

        matches: args.data.matches
          ? {
              connect: args.data.matches,
            }
          : undefined,

        visitor: args.data.visitor
          ? {
              connect: args.data.visitor,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Team)
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "update",
    possession: "any",
  })
  async updateTeam(
    @graphql.Args() args: UpdateTeamArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Team",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Team"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          country: args.data.country
            ? {
                connect: args.data.country,
              }
            : undefined,

          matches: args.data.matches
            ? {
                connect: args.data.matches,
              }
            : undefined,

          visitor: args.data.visitor
            ? {
                connect: args.data.visitor,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Team)
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "delete",
    possession: "any",
  })
  async deleteTeam(@graphql.Args() args: DeleteTeamArgs): Promise<Team | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [PlayerLegendary])
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async playerLegendaries(
    @graphql.Parent() parent: Team,
    @graphql.Args() args: PlayerLegendaryFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PlayerLegendary[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PlayerLegendary",
    });
    const results = await this.service.findPlayerLegendaries(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Player])
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async players(
    @graphql.Parent() parent: Team,
    @graphql.Args() args: PlayerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Player",
    });
    const results = await this.service.findPlayers(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Country, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async country(
    @graphql.Parent() parent: Team,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Country | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Country",
    });
    const result = await this.service.getCountry(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Match, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async matches(
    @graphql.Parent() parent: Team,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Match | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Match",
    });
    const result = await this.service.getMatches(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Match, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async visitor(
    @graphql.Parent() parent: Team,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Match | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Match",
    });
    const result = await this.service.getVisitor(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
