import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { StatusEnum } from '../../@types'
import bcrypt from 'bcrypt'
import Operation from './Operation.entity'

@Entity({ name: 'clients' })
class Client {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	email: string

	@Column({ select: false })
	password: string

	@Column()
	cpf: string

	@Column('text')
	adress: string

	@Column('decimal')
	income: number

	@Column('decimal')
	balance: number

	@Column('enum', { enum: ['pending', 'approved', 'denied'] })
	status: StatusEnum

	@UpdateDateColumn({ default: new Date() })
	status_updated_at: Date

	@Column()
	forgot_password_token: string

	@OneToMany(() => Operation, (operation) => operation.client_from)
	operations: Operation[]

	@OneToMany(() => Operation, (operation) => operation.client_to)
	received_operations: Operation[]

	@BeforeUpdate()
	@BeforeInsert()
	beforeInsertHook() {
		if (!!this.password) {
			this.password = bcrypt.hashSync(this.password, 6)
		}
	}
}

export default Client
