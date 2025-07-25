import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { QuotesService } from "./quotes.service";
import { Quote } from "./quote.entity";
import { QuoteDto } from "./dto/quote.dto";

@Controller()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}
  static DEFAULT_PAGE_SIZE = 3;

  @Get("/randomQuote")
  async showRandomQuote(
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number
  ) {
    return await this.quotesService.getRandomQuote({ limit });
  }

  @Get("/allQuotes")
  async showAllQuotes(
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("pageSize", new ParseIntPipe({ optional: true })) pageSize?: number
  ) {
    if (page !== undefined && pageSize === undefined) {
      pageSize = QuotesController.DEFAULT_PAGE_SIZE;
    }

    return await this.quotesService.getAllQuotes({ page, pageSize });
  }

  @Get("/quote/:id")
  async getQuoteById(@Param("id") id: number) {
    return await this.quotesService.getQuoteById(id);
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
