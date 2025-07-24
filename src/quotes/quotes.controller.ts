import { Controller, Get } from "@nestjs/common";
import { QuotesService } from "./quotes.service";

@Controller()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get("/quotes")
  showHello() {
    return this.quotesService.generateQuote();
  }

  @Get("/randomQuote")
  async showRandomQuote() {
    return await this.quotesService.getRandomQuoteFromDB();
  }

  @Get("/allQuotes")
  showAllQuotes() {
    return this.quotesService.getAllQuotesFromDB();
  }
}
