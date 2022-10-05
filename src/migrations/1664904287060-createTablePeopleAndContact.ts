import { MigrationInterface, QueryRunner } from "typeorm";

export class createTablePeopleAndContact1664904287060 implements MigrationInterface {
    name = 'createTablePeopleAndContact1664904287060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "peoples" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_6e07258072dcc27e4935e1f075e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "infoContacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "info" character varying NOT NULL, "peopleId" uuid, "nameId" uuid, CONSTRAINT "UQ_3e1491066c83464d1f20f2a3e5d" UNIQUE ("info"), CONSTRAINT "PK_9b6fd47e923f0e99acb204b99d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contact" character varying NOT NULL, CONSTRAINT "UQ_b20f7ccc21a2e3509b775f89607" UNIQUE ("contact"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "infoContacts" ADD CONSTRAINT "FK_76bc0a9bb97f971c9db6f20e87f" FOREIGN KEY ("peopleId") REFERENCES "peoples"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "infoContacts" ADD CONSTRAINT "FK_6988566e9fd25950be241459007" FOREIGN KEY ("nameId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "infoContacts" DROP CONSTRAINT "FK_6988566e9fd25950be241459007"`);
        await queryRunner.query(`ALTER TABLE "infoContacts" DROP CONSTRAINT "FK_76bc0a9bb97f971c9db6f20e87f"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "infoContacts"`);
        await queryRunner.query(`DROP TABLE "peoples"`);
    }

}
