
export default class ErrorMessages {

    errorMessages: any = {
        500: 'Erro interno do servidor.',
        getById: {
            404: 'Pokémon não encontrado.',
        },
        update: {
            404: 'Pokémon não encontrado. Pode ter sido removido.',
        },
        delete: {
            404: 'Pokémon não encontrado.',
        },
    }

    getMessage = (requestName: string, statusCode: number) => {
        if (!this.errorMessages[requestName] || !this.errorMessages[requestName][statusCode]) {
            return this.errorMessages[statusCode] || 'Erro desconhecido.'
        }
        return this.errorMessages[requestName][statusCode]
    }
}