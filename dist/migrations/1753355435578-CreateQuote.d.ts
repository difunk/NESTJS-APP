import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateQuote1753355435578 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
