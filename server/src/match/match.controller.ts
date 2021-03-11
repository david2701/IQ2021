import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { MatchService } from "./match.service";
import { MatchControllerBase } from "./base/match.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("matches")
@common.Controller("matches")
export class MatchController extends MatchControllerBase {
  constructor(
    protected readonly service: MatchService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
