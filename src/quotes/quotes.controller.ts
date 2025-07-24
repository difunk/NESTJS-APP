import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { QuotesService } from "./quotes.service";
import { Quote } from "./quote.entity";
import { QuoteDto } from "./dto/quote.dto";

@Controller()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get("/randomQuote")
  async showRandomQuote() {
    return await this.quotesService.getRandomQuoteFromDB();
  }

  @Get("/allQuotes")
  async showAllQuotes() {
    return await this.quotesService.getAllQuotesFromDB();
  }

  @Get("/quote/:id")
  async getQuoteById(@Param("id") id: number) {
    return await this.quotesService.getQuoteByIdFromDB(id);
  }

  @Post("/generateQuote")
  async generateQuote(@Body() body: QuoteDto): Promise<Quote> {
    return await this.quotesService.createQuote(body);
  }

  @Put("/quote/:id")
  async updateQuote(
    @Body() updateData: QuoteDto,
    @Param("id") id: number
  ): Promise<Quote> {
    return await this.quotesService.updateQuote(id, updateData);
  }

  @Delete("/quote/:id")
  async deleteQuote(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.quotesService.deleteQuote(id);
  }
}
