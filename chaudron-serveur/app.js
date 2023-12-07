import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

import * as RecipeService from './RecipeService.mjs'

const app = express()

app.use(express.json());

//#region Recipes

app.get('/api/custom/recipes', async function (request, response) {
    const options = {
        noContent: request.query.noContent !== undefined && request.query.noContent.toLowerCase() == "true",
    }
    if (request.query.contentType !== undefined) {
        options.contentType = request.query.contentType
    }
    const recipes = await RecipeService.getRecipes(options)

    if (recipes !== null) {
        response.send(recipes)
    } else {
        response.statusCode = 404
        response.send('Not found')
    }
})

app.get('/api/custom/recipes/:id', async function (request, response) {
    const id = parseInt(request.params.id)
    if (!id) {
        // problème
        response.statusCode = 400
        response.send('Bad request')
        return
    }
    const options = {
        noContent: request.query.noContent !== undefined && request.query.noContent.toLowerCase() == "true",
    }
    if (request.query.contentType !== undefined) {
        options.contentType = request.query.contentType
    }
    const recipe = await RecipeService.getRecipeById(id, options)

    if (recipe !== null) {
        console.log(recipe)
        response.send(recipe)
    } else {
        response.statusCode = 404
        response.send('Not found')
    }
})

app.get('/api/custom/recipes/:id/content', async function (request, response) {
    const id = parseInt(request.params.id)
    if (!id) {
        // problème
        response.statusCode = 400
        response.send('Bad request')
        return
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

    const recipe = await RecipeService.getRecipeById(id, options)

    if (recipe !== null) {
        response.setHeader('content-type', options.contentType)
        response.send(recipe.content)
    } else {
        response.statusCode = 404
        response.send('Not found')
    }
})

app.post('/api/custom/recipes', async function (request, response) {

    if (!request.body || !request.body.name || !request.body.content) {
        response.statusCode = 400
        response.send('Bad request')
        return
    }

    const toCreate = {
        name: request.body.name,
        markdown: request.body.content,
    }

    const recipe = await RecipeService.createRecipe(toCreate)

    if (recipe !== null) {
        response.send(recipe)
    } else {
        response.statusCode = 400
        response.send('Bad request')
    }
})

app.patch('/api/custom/recipes/:id', async function (request, response) {
    const id = parseInt(request.params.id)
    if (id === NaN) {
        // problème
        response.statusCode = 400
        response.send('Bad request')
        return
    }
    
    const toUpdate = {};

    let somethingToUpdate = false;
    if (request.body.name) {
        toUpdate.name = request.body.name
        somethingToUpdate = true
    }
    if (request.body.content) {
        toUpdate.markdown = request.body.content
        somethingToUpdate = true
    }

    if (!somethingToUpdate) {
        response.statusCode = 400
        response.send('Bad request')
        return
    }

    let recipe = null
    try {
        recipe = await RecipeService.updateRecipe(id, toUpdate)  
    } catch (e) {
        // empty body
    }
    if (recipe !== null) {
        response.send(recipe)
    } else {
        response.statusCode = 400
        response.send('Bad request')
    }
    
})

//#endregion Recipes

//#region Marks

app.get('/api/custom/recipesMarks/:recipeId', async function (request, response) {
    const recipeId = parseInt(request.params.recipeId)
    if (recipeId === NaN) {
        // problème
        response.statusCode = 400
        response.send('Bad request')
        return
    }

    try {
        const mark = await RecipeService.getAverageRecipeMark(recipeId)

        mark.recipeId = recipeId
        response.send(mark)
    } catch (e) {
        response.statusCode = 404
        response.send('Not found')
        return
    }
})

app.get('/api/custom/recipesMarks/:recipeId/:userId', async function (request, response) {
    const recipeId = parseInt(request.params.recipeId)
    const userId = parseInt(request.params.userId)
    if (recipeId === NaN || userId === NaN) {
        // problème
        response.statusCode = 400
        response.send('Bad request')
        return
    }
    try {
        const mark = await RecipeService.getUserRecipeMark(recipeId, userId)
        mark.recipeId = recipeId
        mark.userId = userId

        response.send(mark)
    } catch (e) {
        response.statusCode = 404
        response.send('Not found')
        return
    }
})

app.put('/api/custom/recipesMarks/:recipeId/:userId', async function (request, response) {
    const recipeId = parseInt(request.params.recipeId)
    const userId = parseInt(request.params.userId)
    if (recipeId === NaN || userId === NaN) {
        // problème
        response.statusCode = 400
        response.send('Bad request')
        return
    }
    const mark = request.body.mark
    if (!Number.isInteger(mark) || mark < 0 || mark > 10) {
        response.statusCode = 400
        response.send('Bad request')
        return
    }

    const recipe = await RecipeService.createOrUpdateUserRecipeMark(recipeId, userId, mark)

    if (recipe !== null) {
        response.send(recipe)
    } else {
        response.statusCode = 404
        response.send('Not found')
    }
})

//#endregion Marks

//#region Users

const secretKey = crypto.randomBytes(64).toString('hex');
app.post('/api/custom/users/authentification', async function (request, response) {
    const { username, password } = request.body
    if (!username || ! password || username.length === 0 || password.length === 0) {
        response.statusCode = 400
        response.send('Bad request')
        return
    }

    const user = await RecipeService.getUser(username, password)

    if (user !== null) {
        const token = jwt.sign(user, secretKey, {expiresIn: '2h'})
        user.token = token
        response.send(user)
    } else {
        response.statusCode = 404
        response.send('Not found')
    }
})

app.post('/api/custom/users/add', async function (request, response) {
    try {
        if (!request.body || !request.body.username || request.body.length === 0) {
            response.statusCode = 400
            response.send('Bad request')
            return
        }
        const hashedPwd = await bcrypt.hash(request.body.password, 10);
        const toCreate = { 
            username: request.body.username, 
            password: hashedPwd, 
            mail: request.body.email, 
            birthdate: request.body.dob +'T00:00:00Z'
        };
    
        const user = await RecipeService.createUser(toCreate)
    
        if (user !== null) {
            response.send(user)
        } else {
            response.statusCode = 404
            response.send('Not found')
            return
        }
    } catch (e) {
        console.log(e)
        response.statusCode = 409
        response.send('Conflict')
        return
    }

})

app.get('/api/custom/users/verify', async function (request, response) {
    const username = request.query.username;
    if (!username || username.length === 0) {
        response.statusCode = 400
        response.send('Bad request')
        return
    }

    response.send({'exists' : await RecipeService.verifyUser(username) != null});
})

//#endregion Users

// app.use(express.static('./public'))

app.listen(3000, function () {
    console.log("Server listening on port 3000")
  })