class Cliente {
  constructor(id, nome, email, idade) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.idade = idade;
  }
}

if (typeof module !== "undefined") {
  module.exports = Cliente; 
}