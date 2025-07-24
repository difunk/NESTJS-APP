"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const quotes_service_1 = require("./quotes/quotes.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const quotesService = app.get(quotes_service_1.QuotesService);
    await quotesService.saveQuotesFromJson();
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map