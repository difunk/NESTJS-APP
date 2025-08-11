import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { QuoteModule } from "./quotes/quotes.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quote } from "./quotes/quote.entity";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entity/user.entity";
import { AuthModule } from "./auth/auth.module";
import { dataSourceOptions } from "./data-source";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    QuoteModule,
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [Quote, User],
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
