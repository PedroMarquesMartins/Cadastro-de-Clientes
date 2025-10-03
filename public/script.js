document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('clienteForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;

    const cliente = { nome, email, idade };

    try {
      const response = await fetch('/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });

      if (response.ok) {
        const novoCliente = await response.json();
        alert(`Cliente ${novoCliente.nome} cadastrado com sucesso!`);
        form.reset();
        carregarClientes(); 
      } else {
        alert('Erro ao cadastrar cliente');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão com o servidor');
    }
  });

  async function carregarClientes() {
    const tabelaBody = document.querySelector("#tabelaClientes tbody");
    tabelaBody.innerHTML = '';
    try {
      const response = await fetch('/clientes');
      const clientes = await response.json();
      clientes.forEach(c => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${c.id}</td>
          <td>${c.nome}</td>
          <td>${c.email}</td>
          <td>${c.idade}</td>
        `;
        tabelaBody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }

  carregarClientes(); 
});
