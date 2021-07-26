interface NewClient {
	name: string
	email: string
	cpf: string
	adress: string
	income: number
}

enum StatusEnum {
	pending = 'pending',
	approved = 'approved',
	denied = 'denied',
}
