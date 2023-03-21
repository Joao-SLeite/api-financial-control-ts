import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679401216119 implements MigrationInterface {
    name = 'default1679401216119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`amount\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`installments\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`installments\` ADD \`amount\` float NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`installments\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`installments\` ADD \`amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`amount\` int NOT NULL`);
    }

}
