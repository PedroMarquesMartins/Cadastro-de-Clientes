const Cliente = require("../public/cliente");

describe("Classe Cliente", () => {
  test("Deve criar um cliente corretamente", () => {
    const cliente = new Cliente(1, "João", "joao@email.com", 25);

    expect(cliente.id).toBe(1);
    expect(cliente.nome).toBe("João");
    expect(cliente.email).toBe("joao@email.com");
    expect(cliente.idade).toBe(25);
  });
});
