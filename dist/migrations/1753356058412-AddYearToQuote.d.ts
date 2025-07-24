import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddYearToQuote1753356058412 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
