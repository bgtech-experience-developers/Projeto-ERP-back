
http://localhost:3000/clientes//atualizarCliente/1234

Corpo para teste:
{
	"nome":"fulano",
	"rg":"1234123411234",
	"tipo":"pf",
	"cpf":"123123123-45",
	"email":"fulano@gmail.com",
	"situacao": true,
	"telefone":"123123123",
	"celular":"123123123",
	"cep":"123123123",
	"logradouro":"avenida",
	"numero": 123,
	"complemento": "avenida",
	"bairro": "good garden",
	"cidade": "fortaleza"
}

// Pensar como vai ser o momento de inserção na tabela roleadm, sendo que no banco já deve estar definido os papeis(role) e ele só ser passado para o roleadm
// Complexidade.
// Preciso cadastrar um adm, mas, os papeis(roles) já estão definidos no banco de dados, como faço para que ao inserir não passe o dado para ser inserido, mas, sim esse dado ser relacionado ao a tabela que é a junção de adm com roles
//  a tabela que é a junção de adm com roles

Criado o Schema de validação de campos --> Onde vai ser chamado! -->
Repository--> controller -->middleware