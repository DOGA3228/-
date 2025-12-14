import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1765555140624 implements MigrationInterface {
    name = 'Init1765555140624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "materials" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "missingPercent" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2fd1a93ecb222a28bef28663fa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_types" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "coefficient" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6ad7b08e6491a02ebc9ed82019d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "article" character varying(50) NOT NULL, "minimumCost" numeric(12,2) NOT NULL, "typeId" integer NOT NULL, "materialId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type_id" integer, "material_id" integer, CONSTRAINT "UQ_e3c0b01c8df8b391e132379445e" UNIQUE ("article"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_workshops" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "productionTime" numeric(10,2) NOT NULL, "workshopId" integer NOT NULL, "productId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workshop_id" integer, "product_id" integer, CONSTRAINT "PK_1e936c5dc068aaaa205ee1e18de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workshops" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "type" character varying(100) NOT NULL, "numberWorkers" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6d0e82a124f5b53df91c8989848" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d6f2a3ca463504c78d90b029f00" FOREIGN KEY ("type_id") REFERENCES "product_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_211fb444345b0221eab8cbc5522" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_workshops" ADD CONSTRAINT "FK_4cf7c41e92e8a6ca74b09dffed0" FOREIGN KEY ("workshop_id") REFERENCES "workshops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_workshops" ADD CONSTRAINT "FK_6c5e480a3af5c01cb36fd5aae71" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_workshops" DROP CONSTRAINT "FK_6c5e480a3af5c01cb36fd5aae71"`);
        await queryRunner.query(`ALTER TABLE "product_workshops" DROP CONSTRAINT "FK_4cf7c41e92e8a6ca74b09dffed0"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_211fb444345b0221eab8cbc5522"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d6f2a3ca463504c78d90b029f00"`);
        await queryRunner.query(`DROP TABLE "workshops"`);
        await queryRunner.query(`DROP TABLE "product_workshops"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "product_types"`);
        await queryRunner.query(`DROP TABLE "materials"`);
    }

}
