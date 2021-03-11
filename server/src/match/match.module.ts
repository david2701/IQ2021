import { Module } from "@nestjs/common";
import { MatchModuleBase } from "./base/match.module.base";
import { MatchService } from "./match.service";
import { MatchController } from "./match.controller";
import { MatchResolver } from "./match.resolver";

@Module({
  imports: [MatchModuleBase],
  controllers: [MatchController],
  providers: [MatchService, MatchResolver],
  exports: [MatchService],
})
export class MatchModule {}
