import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
class Client {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	cpf: string

	@Column('text')
	adress: string

	@Column('decimal')
	income: number

	@Column('enum', { enum: ['pending', 'approved', 'denied'] })
	status: StatusEnum

	@UpdateDateColumn({ default: new Date() })
	status_updated_at: Date
}

export default Client
