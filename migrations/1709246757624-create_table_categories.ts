import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCategories1709246757624 implements MigrationInterface {
    private readonly logger = new Logger(CreateTableCategories1709246757624.name);

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up');
        await queryRunner.query(`
            CREATE TABLE "public"."categories" ( 
                "id" UUid DEFAULT uuid_generate_v4() NOT NULL,
                "name" Character Varying NOT NULL,
                "created_at" Timestamp Without Time Zone DEFAULT now() NOT NULL,
                PRIMARY KEY ( "id" ) );
            ;

            CREATE INDEX "index_categories_created_at" ON "public"."categories" USING btree( "created_at" );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Down');
        await queryRunner.query(`
            drop table categories;
        `);
    }

}
