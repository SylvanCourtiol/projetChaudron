import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()

const prisma = new PrismaClient()

app.get('/api/custom/recipes/:id/content', async function (request, response) {
    const id = parseInt(request.params.id)
    if (parseInt === NaN) {
        // problème
        response.statusCode = 400
        response.send('Bad request')
    }
    const recipe = await prisma.Recipe.findUnique({
        where: {
          id: id,
        },
    })
    if (recipe === undefined) {
        response.statusCode = 404
        response.send('Not found')
    }
    if (request.headers['content-type'] == 'text/html') {

    } else if (request.headers['content-type'] == 'text/markdown') {
        response.headers['content-type'] = 'text/markdown'
        response.send(recipe.markdown) //TODO
    } else {
        response.statusCode = 400
        response.send('Bad request')
    }
})

app.use(express.static('./public'))

app.listen(3000, function () {
    console.log("Server listening on port 3000")
  })