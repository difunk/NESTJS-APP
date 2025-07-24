import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { readFile } from "fs/promises";
import * as path from "path";
import { Quote } from "./quote.entity";
import { FindManyOptions, Repository } from "typeorm";
import { QuoteDto } from "./dto/quote.dto";



@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>
  ) { }

  async createQuote(draftQuote: Omit<Quote, "id">): Promise<Quote> {
    // const result = await this.quoteRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Quote)
    //   .values([
    //     {
    //       quote: draftQuote.quote,
    //       author: draftQuote.author,
    //       year: draftQuote.year,
    //     },
    //   ])
    //   .execute();

    // const newId = result.identifiers[0].id;
    // const newQuote = await this.quoteRepository.findOneBy({ id: newId });

    return await this.quoteRepository.save(draftQuote);
  }

  async getQuoteById(id: number): Promise<Quote | null> {
    return await this.quoteRepository.findOne({ where: { id } });
  }

  async getAllQuotes(options: { page?: number, pageSize?: number }): Promise<Quote[]> {
    let { page, pageSize } = options

    let findOptions: FindManyOptions = {
      take: pageSize,
      skip: page !== undefined && pageSize !== undefined ? (page - 1) * pageSize : undefined
    }
    return await this.quoteRepository.find(findOptions);
  }

  async getRandomQuote(): Promise<Quote> {
    const allQuotes = await this.quoteRepository.find();
    return allQuotes[Math.floor(Math.random() * allQuotes.length)];
  }

  async updateQuote(id: number, updateData: QuoteDto): Promise<Quote | null> {
    await this.quoteRepository.update(id, updateData);
    const updatedQuote = await this.quoteRepository.findOneBy({ id });
    return updatedQuote ?? null;
  }

  async deleteQuote(id: number): Promise<void> {
    console.log(id, typeof id);
    if (typeof id !== "number") {
      throw new Error("ID must be number");
    }
    await this.quoteRepository.delete(id);
  }
}
