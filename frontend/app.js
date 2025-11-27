const API_URL = "http://localhost:3000/produtos";

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const estoque = document.getElementById("estoque").value;

  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco, estoque })
  });

  const data = await resposta.json();
  carregarProdutos();
});

async function carregarProdutos() {
  const resposta = await fetch(API_URL);
  const produtos = await resposta.json();

  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  produtos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} — R$ ${p.preco} — Estoque: ${p.estoque}`;
    lista.appendChild(li);
  });
}

carregarProdutos();