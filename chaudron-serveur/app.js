import express from 'express'

import { getRecipeById, getRecipes } from './RecipeService.mjs'

const app = express()

// Pour post ou patch => attention injection de sql

app.get('/api/custom/recipes', async function (request, response) {
    const options = {
        noContent: request.query.noContent !== undefined && request.query.noContent.toLowerCase() == "true",
    }
    if (request.query.contentType !== undefined) {
        options.contentType = request.query.contentType
    }
    const recipes = await getRecipes(options)

    if (recipes !== null) {
        response.send(recipes)
    } else {
        response.statusCode = 404
        response.send('Not found')
    }
})

app.get('/api/custom/recipes/:id', async function (request, response) {
    const id = parseInt(request.params.id)
    if (parseInt === NaN) {
        // problème
        response.statusCode = 400
        response.send('Bad request')
        return;
    }
    const options = {
        noContent: request.query.noContent !== undefined && request.query.noContent.toLowerCase() == "true",
    }
    if (request.query.contentType !== undefined) {
        options.contentType = request.query.contentType
    }
    const recipe = await getRecipeById(id, options)

    if (recipe !== null) {
        response.send(recipe)
    } else {
        response.statusCode = 404
        response.send('Not found')
    }
})

app.get('/api/custom/recipes/:id/content', async function (request, response) {
    const id = parseInt(request.params.id)
    if (parseInt === NaN) {
        // problème
        response.statusCode = 400
        response.send('Bad request')
        return;
    }
    const options = {
        noContent: request.query.noContent !== undefined && request.query.noContent.toLowerCase() == "true",
    }

    const requestContentType = request.headers['content-type']
    if (requestContentType == 'text/html' || requestContentType == 'text/markdown') {
        options.contentType =requestContentType
    } else {
        response.statusCode = 400
        response.send('Bad request')
    }

    const recipe = await getRecipeById(id, options)

    if (recipe !== null) {
        response.setHeader('content-type', options.contentType)
        response.send(recipe.content)
    } else {
        response.statusCode = 404
        response.send('Not found')
    }
})

// app.use(express.static('./public'))

app.listen(3000, function () {
    console.log("Server listening on port 3000")
  })