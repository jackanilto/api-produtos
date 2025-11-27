import { v4 } from "uuid"

export async function produtosRoutes(fastify, opts) {
  const { produtos, saveToDB } = opts

  const produtosSchema = {
    type: 'object',
    required: ['nome', 'preco', 'estoque'],
    properties: {
      id: { type: 'string' },
      nome: { type: 'string' },
      preco: { type: 'string' },
      estoque: { type: 'integer' }
    }
  }

  // LISTAR COM FILTRO DE NOME
  fastify.get('/', (request, reply) => {
  const { nome } = request.query

  if (nome) {
    const filtrados = produtos.filter(p => 
      p.nome.toLowerCase().includes(nome.toLowerCase())
    )
    return reply.send(filtrados)
  }
  reply.send(produtos)
})

  // LISTAR POR ID
  fastify.get('/:id', (request, response) => {
    const produto = produtos.find(p => p.id == request.params.id)

    produto
      ? response.send(produto)
      : response.code(404).send({ error: 'Produto não existe!' })
  })

// CADASTRAR
fastify.post('/', {
  schema: {
    description: 'Cadastra Produto',
    tags: ['Produtos'],
    body: {
      type: 'object',
      required: ['nome', 'preco', 'estoque'],
      properties: {
        nome: { type: 'string' },
        preco: { type: 'string' },
        estoque: { type: 'integer' }
      }
    },
    response: {
      201: produtosSchema
    }
  }
}, (request, response) => {

  const novoProduto = { id: v4(), ...request.body }

  // VALIDAÇÃO SIMPLES DE DADOS
  if (Number(novoProduto.preco) <= 0) {
    return response.code(400).send({ error: 'O preço inválido.' })
  }

  // SALVAR PRODUTO
  produtos.push(novoProduto)
  saveToDB()

  response.code(201).send(novoProduto)
})

  // EDITAR PARCIAL (PATCH)
  fastify.patch('/:id', 
    (request, response) => { const produto = produtos.find(p => p.id == request.params.id)

    if (!produto) {
      return response.code(404).send({ error: 'Produto não encontrado!' })
    }

    Object.assign(produto, request.body)

    saveToDB()

    response.code(202).send(produto)
  })

  // EDITAR TOTAL (PUT)
  fastify.put('/:id', (request, response) => { const index = produtos.findIndex(p => p.id == request.params.id)

    if (index === -1) {
      return response.code(404).send({ error: 'Produto não encontrado!' })
    }

    produtos[index] = { id: request.params.id, ...request.body }

    saveToDB()

    response.code(200).send(produtos[index])
  })

  // DELETAR
  fastify.delete('/:id', (request, response) => {
    const index = produtos.findIndex(p => p.id == request.params.id)

    if (index === -1) {
      return response.code(404).send({ error: 'Produto não encontrado!' })
    }

    produtos.splice(index, 1)
    saveToDB()

    response.code(200).send({ message: 'Produto deletado com sucesso.' })
  })


  // 🔍 CONSULTA POR PREÇO
  fastify.get('/preco/:valor', (request, response) => {
    const valor = Number(request.params.valor)

    const filtrados = produtos.filter(p => Number(p.preco) === valor)

    if (filtrados.length === 0) {
      return response.code(404).send({ error: 'Nenhum produto encontrado com esse preço.' })
    }
    response.send(filtrados)
  })


  // 🔍 CONSULTA POR NOME
  fastify.get('/nome/:nome', (request, response) => {
    const nome = request.params.nome.toLowerCase()
    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(nome))

    if (filtrados.length === 0) {
      return response.code(404).send({ error: 'Nenhum produto encontrado com esse nome.' })
    }
    response.send(filtrados)
  })  


}
