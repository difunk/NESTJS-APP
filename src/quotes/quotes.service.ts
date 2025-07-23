import { Injectable } from "@nestjs/common";
import { readFile } from "fs/promises";
import * as path from "path";

@Injectable()
export class QuotesService {
  generateQuote(): string {
    return "Hello Quote";
  }

  async getAllQuotes(): Promise<string[]> {
    const filePath = path.join(__dirname, "../data/quotes.json");
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  async getRandomQuote(): Promise<any> {
    const filePath = path.join(__dirname, "../data/quotes.json");
    const data = await readFile(filePath, "utf-8");
    const quotes = JSON.parse(data);
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return randomQuote;
  }
}
