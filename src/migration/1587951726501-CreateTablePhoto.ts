import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePhoto1587951726501 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photo" ("id" SERIAL NOT NULL, "login" 
        character varying(200) NOT NULL, "firstName" character varying(100) NOT NULL, 
        "lastName" character varying(100) NOT NULL, "photo" character varying(255) NOT NULL, 
        CONSTRAINT "PK_cacj4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "photo"`, undefined);
  }
}
