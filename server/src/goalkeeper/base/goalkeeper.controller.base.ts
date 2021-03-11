import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { GoalkeeperService } from "../goalkeeper.service";
import { GoalkeeperCreateInput } from "./GoalkeeperCreateInput";
import { GoalkeeperWhereInput } from "./GoalkeeperWhereInput";
import { GoalkeeperWhereUniqueInput } from "./GoalkeeperWhereUniqueInput";
import { GoalkeeperUpdateInput } from "./GoalkeeperUpdateInput";
import { Goalkeeper } from "./Goalkeeper";

export class GoalkeeperControllerBase {
  constructor(
    protected readonly service: GoalkeeperService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Goalkeeper })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: GoalkeeperCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Goalkeeper> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Goalkeeper",
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
        `providing the properties: ${properties} on ${"Goalkeeper"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        goalkeeper: data.goalkeeper
          ? {
              connect: data.goalkeeper,
            }
          : undefined,
      },
      select: {
        createdAt: true,

        goalkeeper: {
          select: {
            id: true,
          },
        },

        id: true,
        positionGoalkeeper: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Goalkeeper] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: GoalkeeperWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Goalkeeper[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Goalkeeper",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,

        goalkeeper: {
          select: {
            id: true,
          },
        },

        id: true,
        positionGoalkeeper: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Goalkeeper })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: GoalkeeperWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Goalkeeper | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Goalkeeper",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,

        goalkeeper: {
          select: {
            id: true,
          },
        },

        id: true,
        positionGoalkeeper: true,
        updatedAt: true,
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
    resource: "Goalkeeper",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Goalkeeper })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: GoalkeeperWhereUniqueInput,
    @common.Body()
    data: GoalkeeperUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Goalkeeper | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Goalkeeper",
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
        `providing the properties: ${properties} on ${"Goalkeeper"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          goalkeeper: data.goalkeeper
            ? {
                connect: data.goalkeeper,
              }
            : undefined,
        },
        select: {
          createdAt: true,

          goalkeeper: {
            select: {
              id: true,
            },
          },

          id: true,
          positionGoalkeeper: true,
          updatedAt: true,
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
    resource: "Goalkeeper",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Goalkeeper })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: GoalkeeperWhereUniqueInput
  ): Promise<Goalkeeper | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,

          goalkeeper: {
            select: {
              id: true,
            },
          },

          id: true,
          positionGoalkeeper: true,
          updatedAt: true,
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
  @common.Get("/:id/goalkeepers")
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "read",
    possession: "any",
  })
  async findManyGoalkeepers(
    @common.Param() params: GoalkeeperWhereUniqueInput,
    @common.Query() query: GoalkeeperWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Goalkeeper[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Goalkeeper",
    });
    const results = await this.service.findOne({ where: params }).goalkeepers({
      where: query,
      select: {
        createdAt: true,

        goalkeeper: {
          select: {
            id: true,
          },
        },

        id: true,
        positionGoalkeeper: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/goalkeepers")
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "update",
    possession: "any",
  })
  async createGoalkeepers(
    @common.Param() params: GoalkeeperWhereUniqueInput,
    @common.Body() body: GoalkeeperWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      goalkeepers: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Goalkeeper",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Goalkeeper"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/goalkeepers")
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "update",
    possession: "any",
  })
  async updateGoalkeepers(
    @common.Param() params: GoalkeeperWhereUniqueInput,
    @common.Body() body: GoalkeeperWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      goalkeepers: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Goalkeeper",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Goalkeeper"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/goalkeepers")
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "update",
    possession: "any",
  })
  async deleteGoalkeepers(
    @common.Param() params: GoalkeeperWhereUniqueInput,
    @common.Body() body: GoalkeeperWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      goalkeepers: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Goalkeeper",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Goalkeeper"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
