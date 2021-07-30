export interface NewClient {
	name: string
	email: string
	password: string
	cpf: string
	adress: string
	income: number
}

export enum StatusEnum {
	pending = 'pending',
	approved = 'approved',
	denied = 'denied',
}

/**
 * iat and exp probably in unix timestamp
 */
export interface JWTAuthToken {
	id: number
	iat: number
	exp: number
}
