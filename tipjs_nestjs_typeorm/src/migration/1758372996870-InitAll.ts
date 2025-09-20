import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAll1758372996870 implements MigrationInterface {
    name = 'InitAll1758372996870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`x_001\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id of XXX', \`x_1\` text 
            NOT NULL COMMENT 'string by x_1', \`x2\` varchar(15) NOT NULL DEFAULT 'x_2', \`x3\` 
            double NOT NULL, UNIQUE INDEX \`IDX_932383c53cfe4b8baccd69d1ca\` (\`x2\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_932383c53cfe4b8baccd69d1ca\` ON \`x_001\``);
        await queryRunner.query(`DROP TABLE \`x_001\``);
    }

}
