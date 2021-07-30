import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm'

export class clients1627103001111 implements MigrationInterface {
	clientsTableName = 'clients'
	operationsTableName = 'operations'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: this.clientsTableName,
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
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'password',
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
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'income',
						type: 'real',
						isNullable: false,
					},
					{
						name: 'balance',
						type: 'real',
						isNullable: false,
						default: 0,
					},
					{
						name: 'status',
						type: 'enum',
						enum: ['pending', 'approved', 'denied'],
						enumName: 'status_enum',
						default: `'pending'`,
					},
					{
						name: 'status_updated_at',
						type: 'timestamp',
						default: 'NOW()',
					},
					{
						name: 'forgot_password_token',
						type: 'varchar',
						isNullable: true,
						isUnique: true,
					},
				],
			})
		)
		await queryRunner.createTable(
			new Table({
				name: this.operationsTableName,
				columns: [
					{
						name: 'id',
						type: 'integer',
						isGenerated: true,
						generationStrategy: 'increment',
						isPrimary: true,
					},
					{
						name: 'client_id',
						type: 'integer',
						isNullable: false,
					},
					{
						name: 'to_client',
						type: 'integer',
						isNullable: true,
					},
					{
						name: 'cost',
						type: 'real',
						isNullable: false,
					},
					{
						name: 'current_balance',
						type: 'real',
						isNullable: false,
					},
					{
						name: 'previous_balance',
						type: 'real',
						isNullable: false,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'NOW()',
					},
				],
			})
		)

		queryRunner.createForeignKeys(this.operationsTableName, [
			new TableForeignKey({
				name: this.operationsTableName,
				columnNames: ['client_id'],
				referencedColumnNames: ['id'],
				referencedTableName: this.clientsTableName,
			}),
			new TableForeignKey({
				name: this.operationsTableName,
				columnNames: ['client_id'],
				referencedColumnNames: ['id'],
				referencedTableName: this.clientsTableName,
			}),
		])
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.clientsTableName)
		await queryRunner.dropTable(this.operationsTableName)
	}
}
