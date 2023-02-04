Uma entidade é algo que é unico
Entity === IDENTIDADE

Quando vemos um id, isso já da pra imaginar que é unico


<!-- A diferença desses metodos  
é que um está trazendo especificidade/expressividade
de por exemplo uma regra de negócio (Inteção de negócio)
-->
changeName(name: string) { 
  this._name = name;
}

set name(name: string) {
  this._name = name;
}
--------------------------------------------------
As entidades precisam ter consistencia
não é legal deixar atributos em branco quando deveriam estar preenchidos
como um cliente sem um nome

As entidades precisam ser confiaveis
Os dados precisam estar consistentes

--------------------------------------------------
Uma Entidade DEVE SEMPRE se VALIDAR
--------------------------------------------------
Entidade Vs ORM

ENTIDADE -> NEGOCIO

ORM -> Persistir dados

Geralmente temos duas entidades, uma para o negócio e outra pra persistir dados

Mas geralmente chamamos a entidade de persistencia com outro nome, como:
Model, Persistence

Ex: CustomerModel or CustomerPersistence

Podemos incluve ter separações explicitas de organização

Domain -> negocio
  Entity
    -customer(regra de negocio)
infra -> mundo externo (banco de dados)
  Entity or Model
    -customer(get e set)
--------------------------------------------------

# Value Object 
Quando voce se preocupa apenas com os atributos de um elemento de um model, classifique isso como um Value Object

"Trate o Value Object como imutável"

Cuidado com os tipos primitivos

<!-- ! não -->
address: Object
street: string

<!-- * Sim -->
address: Address

Address : {
  street: string
  city: string
  ...
  validate()
}
--------------------------------------------------
# Agregate
conjunto d objetos associados que tratamos como uma unidade para proposito de mudança de dados