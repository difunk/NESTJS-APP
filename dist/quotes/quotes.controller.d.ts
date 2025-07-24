import { QuotesService } from "./quotes.service";
export declare class QuotesController {
    private readonly quotesService;
    constructor(quotesService: QuotesService);
    showHello(): string;
    showRandomQuote(): Promise<any>;
    showAllQuotes(): Promise<string[]>;
}
