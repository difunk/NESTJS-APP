import { Quote } from "./quote.entity";
import { Repository } from "typeorm";
export declare class QuotesService {
    private quoteRepository;
    constructor(quoteRepository: Repository<Quote>);
    generateQuote(): string;
    saveQuotesFromJson(): Promise<void>;
    getAllQuotes(): Promise<string[]>;
    getRandomQuote(): Promise<any>;
}
