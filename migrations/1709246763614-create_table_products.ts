import { MigrationInterface, QueryRunner } from "typeorm";
import { Logger } from '@nestjs/common';

export class CreateTableProducts1709246763614 implements MigrationInterface {
    private readonly logger = new Logger(CreateTableProducts1709246763614.name);

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up');
        await queryRunner.query(`
        CREATE TABLE "public"."products" ( 
        	"id" UUid NOT NULL,
        	"name" Character Varying NOT NULL,
        	"sku" Character Varying NOT NULL,
        	"price" Integer NOT NULL,
        	"stock" Integer NOT NULL,
        	"category_id" UUid NOT NULL,
        	"created_at" Timestamp Without Time Zone DEFAULT now() NOT NULL,
        	PRIMARY KEY ( "id" ),
        	CONSTRAINT "unique_products_sku" UNIQUE( "sku" ) );
         ;

        CREATE INDEX "index_products_category_id" ON "public"."products" USING btree( "category_id" );

        CREATE INDEX "index_products_created_at" ON "public"."products" USING btree( "created_at" );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Down');
        await queryRunner.query(`
            drop table products;
        `);
    }

}
