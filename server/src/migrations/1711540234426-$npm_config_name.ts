import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1711540234426 implements MigrationInterface {
    name = ' $npmConfigName1711540234426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "something"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "something" character varying`);
    }

}
