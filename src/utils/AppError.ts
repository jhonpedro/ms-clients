class AppError {
	public readonly name: string
	public readonly message: string
	public readonly status: number

	constructor(message: string, status = 400) {
		this.name = 'AppError'
		this.message = message
		this.status = status
	}
}

export default AppError
