import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679358739373 implements MigrationInterface {
    name = 'default1679358739373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`amount\` int NOT NULL, \`creationDate\` datetime NOT NULL, \`installmentNumber\` int NOT NULL, \`typeTransaction\` enum ('fixedexpenses', 'variableexpenses', 'income') NOT NULL DEFAULT 'variableexpenses', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`installments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`dueDate\` datetime NOT NULL, \`transaction_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`installments\` ADD CONSTRAINT \`FK_9cb7014960cf0697929c2623a5e\` FOREIGN KEY (\`transaction_id\`) REFERENCES \`transactions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`installments\` DROP FOREIGN KEY \`FK_9cb7014960cf0697929c2623a5e\``);
        await queryRunner.query(`DROP TABLE \`installments\``);
        await queryRunner.query(`DROP TABLE \`transactions\``);
    }

}
