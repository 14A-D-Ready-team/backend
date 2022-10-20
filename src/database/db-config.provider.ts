import { MIKRO_ORM_MODULE_OPTIONS } from "@mikro-orm/nestjs";
import { FactoryProvider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export const dbConfigProvider: FactoryProvider = {
  provide: MIKRO_ORM_MODULE_OPTIONS,
  useFactory(configService: ConfigService) {},
  inject: [ConfigService],
};
