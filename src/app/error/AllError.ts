export class AllError extends Error {
  status: number;
  constructor(mensagem: string, status: number = 400) {
    super(mensagem);
    this.status = status;
  }
}
