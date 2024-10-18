# PrismaClientError

## Prisma Client(Query Engine)
```
P2000 -> The provided value for the column is too long for the column's type. Column: {column_name}	>>>>>>>> Tamanho maior do que o esperado no banco de dados!

P2002 -> Unique constraint failed on the {constraint} >>>>>>>> Erro quando no banco tem uma restrição de unicidade.

P2025 -> An operation failed because it depends on one or more records that were required but not found. {cause} >>>>>>>>>>>> Registro não encontrado!

```

## Status Code
```
200 -> Ok

201 -> Ok e Criado

404 -> Not Found

409 -> Conflict

500 -> Internal Server Error
```


http://localhost:3000/clientes//atualizarCliente/1234

Corpo para teste: Fornecedor/ cliente
{
    "name": "Bruno Alves",
    "rg": "098765432",
    "date_birth": "1995-07-22",
    "type": "null",
    "cpf": "567.890.123-45",
    "email": "bruno.alves@example.com",
    "situation": false,
    "telefone": "2134477788",
    "celular": "85999885544",
    "cep": "6096000",
    "logradouro": "Rua dos Pássaros",
    "numero": "43",
    "complemento": "q07, lt12",
    "bairro": "Cocó",
    "cidade": "Fortaleza"
  }