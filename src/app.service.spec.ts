import { AppService } from "./app.service";
import { QuotesService } from "./quotes/quotes.service";

describe("AppService", () => {
  let service: AppService;

  beforeEach(() => {
    const quoteServiceMock: Partial<QuotesService> = {};
    service = new AppService(quoteServiceMock as QuotesService);
  });

  it('should return "Hello World"', () => {
    expect(service.helloWorld()).toBe("Hello World");
  });
});
