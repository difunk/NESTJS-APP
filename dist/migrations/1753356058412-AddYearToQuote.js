"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddYearToQuote1753356058412 = void 0;
class AddYearToQuote1753356058412 {
    constructor() {
        this.name = 'AddYearToQuote1753356058412';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "quote" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" text NOT NULL, "author" varchar(100) NOT NULL, "year" integer)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "quote"`);
    }
}
exports.AddYearToQuote1753356058412 = AddYearToQuote1753356058412;
//# sourceMappingURL=1753356058412-AddYearToQuote.js.map