import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TeamModule } from "./team/team.module";
import { CountryModule } from "./country/country.module";
import { PlayerModule } from "./player/player.module";
import { MatchModule } from "./match/match.module";
import { GoalkeeperModule } from "./goalkeeper/goalkeeper.module";
import { MyTeamModule } from "./myTeam/myTeam.module";
import { StadeModule } from "./stade/stade.module";
import { PlayerLegendaryModule } from "./playerLegendary/playerLegendary.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    TeamModule,
    CountryModule,
    PlayerModule,
    MatchModule,
    GoalkeeperModule,
    MyTeamModule,
    StadeModule,
    PlayerLegendaryModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
