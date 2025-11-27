document.getElementById('btnBuscar').addEventListener('click', async () => {
  const nome = document.getElementById('busca').value.trim()
  const lista = document.getElementById('resultado')
  lista.innerHTML = ""

  if (!nome) {
    lista.innerHTML = "<li>Digite um nome do Produto.</li>"
    return
  }

  try {
    const response = await fetch(`http://localhost:3000/produtos?nome=${encodeURIComponent(nome)}`)

    const dados = await response.json()

    if (!dados.length) {
      lista.innerHTML = "<li>Nenhum produto encontrado.</li>"
      return
    }

    dados.forEach(produto => {
      const li = document.createElement("li")
      li.textContent = `${produto.nome} — R$ ${produto.preco} — Estoque: ${produto.estoque}`
      lista.appendChild(li)
    })

  } catch (error) {
    lista.innerHTML = "<li>Erro na consulta.</li>"
  }
})
