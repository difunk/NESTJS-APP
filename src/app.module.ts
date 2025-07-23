import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { QuoteModule } from "./quotes/quotes.module";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [QuoteModule],
})
export class AppModule {}
