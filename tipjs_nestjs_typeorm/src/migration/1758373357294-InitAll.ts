import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAll1758373357294 implements MigrationInterface {
    name = 'InitAll1758373357294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`x_001\` ADD \`x4\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`x_001\` DROP COLUMN \`x4\``);
    }

}
