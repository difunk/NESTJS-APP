"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotesController = void 0;
const common_1 = require("@nestjs/common");
const quotes_service_1 = require("./quotes.service");
let QuotesController = class QuotesController {
    constructor(quotesService) {
        this.quotesService = quotesService;
    }
    showHello() {
        return this.quotesService.generateQuote();
    }
    async showRandomQuote() {
        return await this.quotesService.getRandomQuote();
    }
    showAllQuotes() {
        return this.quotesService.getAllQuotes();
    }
};
exports.QuotesController = QuotesController;
__decorate([
    (0, common_1.Get)("/quotes"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "showHello", null);
__decorate([
    (0, common_1.Get)("/randomQuote"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "showRandomQuote", null);
__decorate([
    (0, common_1.Get)("/allQuotes"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "showAllQuotes", null);
exports.QuotesController = QuotesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [quotes_service_1.QuotesService])
], QuotesController);
//# sourceMappingURL=quotes.controller.js.map