import { QuotesService } from "./quotes/quotes.service";
export declare class AppService {
    private readonly quotesService;
    constructor(quotesService: QuotesService);
    generateMessage(): string;
}
