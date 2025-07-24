import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { readFile } from "fs/promises";
import * as path from "path";
import { Quote } from "./quote.entity";
import { Repository } from "typeorm";

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>
  ) {}

  generateQuote(): string {
    return "Hello Quote";
  }

  async saveQuotesFromJson() {
    const filePath = path.join(__dirname, "../data/quotes.json");
    const data = await readFile(filePath, "utf-8");
    const quotes = JSON.parse(data);
    await this.quoteRepository.save(quotes);
  }

  // get all
  async getAllQuotesFromDB() {
    await this.quoteRepository.find();
  }

  async getAllQuotes(): Promise<string[]> {
    const filePath = path.join(__dirname, "../data/quotes.json");
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  // get random
  async getRandomQuoteFromDB() {
    const allQuotes = await this.quoteRepository.find();
    return allQuotes[Math.floor(Math.random() * allQuotes.length)];
  }

  async getRandomQuote(): Promise<any> {
    const filePath = path.join(__dirname, "../data/quotes.json");
    const data = await readFile(filePath, "utf-8");
    const quotes = JSON.parse(data);
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return randomQuote;
  }
}
