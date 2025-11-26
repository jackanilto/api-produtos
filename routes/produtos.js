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

  fastify.get('/', function (request, response) {
    response.send(produtos)
  })

  fastify.get('/:id', function (request, response) {
    const pet = produtos.find(p => String(p.id) == request.params.id)

    pet ? response.send(pet) : response.code(404).send({ error: 'Produto nao existe!' })
  })

  fastify.post('/', {
    schema: {
      description: 'cadastra Produto',
      tags: ['Produtos'],
      body: {
        type: 'object',
        required: ['nome', 'preco', 'estoque'],
        properties: {
          nome: { type: 'string' },
          preco: { type: 'string' },
          estoque: { type: 'integer' }
        }
      }
    },
    response: {
      201: produtosSchema
    }
  }, function (request, response) {
    const newProdutos = { id: v4(), ...request.body }

    produtos.push(newProdutos)
    saveToDB()
    response.code(201).send(newProdutos)

  })

  fastify.patch('/:id', function (request, response) {
    const produtos = produtos.find(p => String(p.id) == request.params.id)

    if (!pet) {
      return response.code(404).send({ error: 'Altera Produto!' })
    }

    Object.assign(produtos, request.body)

    saveToDB()
    response.code(202).send(pet)

  })

  fastify.put('/:id', function (request, response) {
    const index = produtos.findIndex(p => String(p.id) == request.params.id)

    if (index === -1) {
      return response.code(404).send({ error: 'Produto nao encontrado!' })
    }

    pets[index] = { id: request.params.id, ...request.body }

    saveToDB()

    response.code(200).send(pets[index])

  })

  fastify.delete('/:id', function (request, response) {
    const index = produtos.findIndex(p => String(p.id) == request.params.id)
    if (index === -1) {
      return response.code(404).send({ error: 'Produto nao encontrado!' })
    }
    produtos.splice(index, 1)
    saveToDB()

    response.code(200).send({ message: 'Resource deleted' })
  })
}