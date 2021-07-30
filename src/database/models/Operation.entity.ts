import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import Client from './Client.entity'

@Entity({ name: 'operations' })
class Operation {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	client_id: number

	@Column()
	to_client: number

	@Column()
	cost: number

	@Column()
	current_balance: number

	@Column()
	previous_balance: number

	@CreateDateColumn()
	created_at: Date

	@ManyToOne(() => Client, (client) => client.operations)
	@JoinColumn({ name: 'client_id' })
	client_from: Client

	@ManyToOne(() => Client, (client) => client.operations)
	@JoinColumn({ name: 'to_client' })
	client_to: Client
}

export default Operation
