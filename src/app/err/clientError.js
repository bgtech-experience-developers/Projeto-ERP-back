export class Exist extends Error {
  constructor(message) {
    super(message);
    this.name = "usuário ja registrado";
    this.status = 400;
  }
}
export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "usuário não encontrado";
    this.status = 400;
  }
}
