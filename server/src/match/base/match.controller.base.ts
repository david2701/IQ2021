import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { MatchService } from "../match.service";
import { MatchCreateInput } from "./MatchCreateInput";
import { MatchWhereInput } from "./MatchWhereInput";
import { MatchWhereUniqueInput } from "./MatchWhereUniqueInput";
import { MatchUpdateInput } from "./MatchUpdateInput";
import { Match } from "./Match";

export class MatchControllerBase {
  constructor(
    protected readonly service: MatchService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Match })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: MatchCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Match> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Match",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Match"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        local: data.local
          ? {
              connect: data.local,
            }
          : undefined,

        visitor: data.visitor
          ? {
              connect: data.visitor,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        date: true,
        id: true,

        local: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        visitor: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Match] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: MatchWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Match[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Match",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        date: true,
        id: true,

        local: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        visitor: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Match })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: MatchWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Match | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Match",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        date: true,
        id: true,

        local: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        visitor: {
          select: {
            id: true,
          },
        },
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Match })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: MatchWhereUniqueInput,
    @common.Body()
    data: MatchUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Match | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Match",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Match"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          local: data.local
            ? {
                connect: data.local,
              }
            : undefined,

          visitor: data.visitor
            ? {
                connect: data.visitor,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          date: true,
          id: true,

          local: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          visitor: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Match })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: MatchWhereUniqueInput
  ): Promise<Match | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          date: true,
          id: true,

          local: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          visitor: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
