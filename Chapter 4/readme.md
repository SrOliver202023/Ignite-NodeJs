# Cadastro de carro

**RF** => 
Deve ser posssivel cadastrar um novo carro.
Deve ser possivel listar todas as categorias.
**RN** => 
Nao deve ser possivel cadastrar um carro com uma placa ja existente.
Nao deve ser possivel alterar a placa de um carro ja cadastrado.
O carro deve ser cadastrado com disponibilidade.
O usuario responsavel pelo cadastro deve ser um usuario administrador.


# Listagem de carros

**RF** => 

Deve ser possivel listar todos os carros disponiveis

Deve ser possivel listar todos os carros disponiveis pelo nome da categoria

Deve ser possivel listar todos os carros disponiveis pelo nome da marca

**RN** => 

O usuario nao precisa estar logado no sistema 

# Cadastro de Especificacao no carro

**RF**
Deve ser possivel cadastrar uma specificacao para um carro
Deve ser possivel listar todas as especificacoes
Deve ser possivel listar todos os carros

**RN**
Nao deve ser possivel cadastrar uma especificacao para um carro nao cadastrado.
Nao deve ser possivel cadastrar uma especificao ja existente para o mesmo carro.
O usuario responsavel pelo cadastro deve ser um usuario administrador.

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel

**RNF**

**RN**

O aluguel deve ter duracao minima de 24 horas.

Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario

Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro





<!-- 

**RF** => Requisitos funcionais

**RNF** => Requisitos nao funcionais

**RN** => Regra de negocio

# Jest
1 - yarn add jest -D
2 - yarn add @types/jest -D
3 - yarn jest --init
4 - yarn add ts-jest -D
5 - in -> jest.config.ts, find preset and define as preset:"ts-jest"
6 - in -> jest.config.ts, find testMatch
7 - in -> jest.config.ts, find bail and define as bail:true -->