import { Controller, Get, Query, Param } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  showHello() {
    return this.appService.generateMessage();
  }

  @Get("/hello")
  helloWorld(@Query("name") name?: string) {
    if (name) {
      return `Hello, ${name}!`;
    }
    return this.appService.helloWorld();
  }
}
