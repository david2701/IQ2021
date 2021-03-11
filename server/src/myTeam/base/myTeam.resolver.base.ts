import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteMyTeamArgs } from "./DeleteMyTeamArgs";
import { FindManyMyTeamArgs } from "./FindManyMyTeamArgs";
import { FindOneMyTeamArgs } from "./FindOneMyTeamArgs";
import { MyTeam } from "./MyTeam";
import { FindManyPlayerArgs } from "../../player/base/FindManyPlayerArgs";
import { Player } from "../../player/base/Player";
import { MyTeamService } from "../myTeam.service";

@graphql.Resolver(() => MyTeam)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class MyTeamResolverBase {
  constructor(
    protected readonly service: MyTeamService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [MyTeam])
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "read",
    possession: "any",
  })
  async myTeams(
    @graphql.Args() args: FindManyMyTeamArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MyTeam[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "MyTeam",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => MyTeam, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "read",
    possession: "own",
  })
  async myTeam(
    @graphql.Args() args: FindOneMyTeamArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MyTeam | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "MyTeam",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => MyTeam)
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "delete",
    possession: "any",
  })
  async deleteMyTeam(
    @graphql.Args() args: DeleteMyTeamArgs
  ): Promise<MyTeam | null> {
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

  @graphql.ResolveField(() => [Player])
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "read",
    possession: "any",
  })
  async players(
    @graphql.Parent() parent: MyTeam,
    @graphql.Args() args: FindManyPlayerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Player",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .players(args);
    return results.map((result) => permission.filter(result));
  }
}
