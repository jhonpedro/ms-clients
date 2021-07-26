import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class clients1627103001111 implements MigrationInterface {
	tableName = 'clients'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: this.tableName,
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
						unsigned: true,
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'email',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'adress',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'cpf',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'income',
						type: 'decimal',
						isNullable: false,
						precision: 2,
					},
					{
						name: 'balance',
						type: 'decimal',
						isNullable: false,
						default: 0,
						precision: 2,
					},
					{
						name: 'status',
						type: 'enum',
						enum: ['pending', 'approved', 'denied'],
						default: 'pending',
					},
					{
						name: 'status_updated_at',
						type: 'timestamp',
						default: new Date(),
					},
				],
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable(this.tableName)
	}
}
