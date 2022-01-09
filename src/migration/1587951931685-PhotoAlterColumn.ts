import { MigrationInterface, QueryRunner } from 'typeorm';

export class PhotoAlterColumn1587951931685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "photo" RENAME COLUMN "photo" TO "picture"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "photo" RENAME COLUMN "login" TO "picture"`
    );
  }
}
