import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679400745477 implements MigrationInterface {
    name = 'default1679400745477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`installmentNumber\` \`installmentsNumber\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`installments\` ADD \`installmentNumber\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`installments\` DROP COLUMN \`installmentNumber\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`installmentsNumber\` \`installmentNumber\` int NOT NULL`);
    }

}
