"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuote1753355435578 = void 0;
class CreateQuote1753355435578 {
    constructor() {
        this.name = "CreateQuote1753355435578";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "quote" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" text NOT NULL, "author" varchar(100) NOT NULL)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "quote"`);
    }
}
exports.CreateQuote1753355435578 = CreateQuote1753355435578;
//# sourceMappingURL=1753355435578-CreateQuote.js.map