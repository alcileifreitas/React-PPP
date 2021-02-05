import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMedicos1606783408359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'); // Cria a extensao para nao ocorrer o erro de uuid_generate_v4() does not exist.
        await queryRunner.createTable(
            new Table({
               name: 'medicos',
               columns: [
                   {
                    name: 'id', // Define o nome da coluna
                    type: 'uuid', // Define o tipo do dado da coluna
                    isPrimary: true, // Essa flag diz se a primary key ou não
                    generationStrategy: 'uuid', // Essa flag define o metodo de geração como uuid para o id
                    default: 'uuid_generate_v4()' // define a função para gerar o uuid v4
                   },
                   {
                    name: 'name',
                    type: 'varchar',
                   },
                   {
                    name: 'created_at', // Criamos esses campos por uma questão mais de auditoria
                    type: 'timestamp',
                    default: 'now()'
                   },
                   {
                    name: 'updated_at', // Criamos esses campos por uma questão mais de auditoria
                    type: 'timestamp',
                    default: 'now()'
                   },
               ]

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('medicos');
    }
}
