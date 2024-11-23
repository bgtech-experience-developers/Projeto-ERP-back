export class AllError extends Error {
    status;
    constructor(mensagem, status = 400) {
        super(mensagem);
        this.status = status;
    }
}
