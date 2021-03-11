import { PrismaService } from "nestjs-prisma";
import {
  FindOneCountryArgs,
  FindManyCountryArgs,
  CountryCreateArgs,
  CountryUpdateArgs,
  CountryDeleteArgs,
  Subset,
} from "@prisma/client";

export class CountryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyCountryArgs>(
    args: Subset<T, FindManyCountryArgs>
  ) {
    return this.prisma.country.findMany(args);
  }
  findOne<T extends FindOneCountryArgs>(args: Subset<T, FindOneCountryArgs>) {
    return this.prisma.country.findOne(args);
  }
  create<T extends CountryCreateArgs>(args: Subset<T, CountryCreateArgs>) {
    return this.prisma.country.create<T>(args);
  }
  update<T extends CountryUpdateArgs>(args: Subset<T, CountryUpdateArgs>) {
    return this.prisma.country.update<T>(args);
  }
  delete<T extends CountryDeleteArgs>(args: Subset<T, CountryDeleteArgs>) {
    return this.prisma.country.delete(args);
  }
}
