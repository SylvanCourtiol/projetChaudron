import { PrismaClient } from '@prisma/client'
import { marked, use } from 'marked';

const prisma = new PrismaClient()

//#region Recipes

export async function getRecipeById(id, options) {
    const defaultOptions = { noContent: false, contentType: 'text/markdown' }
    options = {
        ...defaultOptions,
        ...options,
    }

    const recipe = await prisma.Recipe.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            markdown: !options.noContent
        }
    })

    // adapter le format du content
    if (recipe !== null && !options.noContent) {
        if (options.contentType == "text/html") {
            recipe.content = marked.parse(recipe.markdown)
        } else {
            recipe.content = recipe.markdown
        }
        delete recipe.markdown
    }
    return recipe;
}

export async function getRecipes(options) {

    const defaultOptions = { noContent: false, contentType: 'text/markdown' }
    options = {
        ...defaultOptions,
        ...options,
    }

    const recipes = await prisma.Recipe.findMany({
        select: {
            id: true,
            name: true,
            markdown: !options.noContent
        }
    })

    // adapter le format du content
    if (recipes !== null && !options.noContent) {
        recipes.forEach(element => {
            if (options.contentType == "text/html") {
                element.content = marked.parse(element.markdown)
            } else {
                element.content = element.markdown
            }
            delete element.markdown
        });
    }
    return recipes;
}

export async function createRecipe(toCreate) {
    const recipe = await prisma.Recipe.create({
        data: toCreate,
    })

    return recipe;
}

export async function updateRecipe(id, toUpdate) {
    const recipe = await prisma.Recipe.update({
        where: {
            id: id,
        },
        data: toUpdate,
    })
}

//#endregion Recipes

//#region Marks

export async function getAverageRecipeMark(recipeId) {

    if (await getRecipeById(recipeId) === null) {
        throw "Not found"
    }
    const recipeMark = await prisma.RecipeMark.aggregate({
        _avg: {
            mark: true,
        },
        where: {
            recipe_id: recipeId
        },
    })
    return recipeMark._avg
}

export async function getUserRecipeMark(recipeId, userId) {
    const recipe = await prisma.RecipeMark.findUnique({
        where: {
            user_id_recipe_id: {
                user_id: userId,
                recipe_id: recipeId
            },
        },
    })
    return recipe
}

export async function createOrUpdateUserRecipeMark(recipeId, userId, mark) {
    try {
        const upsertMark = await prisma.RecipeMark.upsert({
            where: {
                user_id_recipe_id: {
                    user_id: userId,
                    recipe_id: recipeId
                },
            },
            update: {
                mark: mark,
            },
            create: {
                recipe_id: recipeId,
                user_id: userId,
                mark: mark,
            },
        })
        return upsertMark
    } catch (e) {
        return null
    }
}

//#endregion Marks

//#region Users

export async function getUser(name, pwd) {
    const user = await prisma.User.findFirst({
        where: {
            username: name,
        }
    })
    if (!user) {
        return null; //utilisateur non trouvé
    }

    if (pwd === user.password) {
        delete user.password
        console.log(user)
        return user;
    } else {
        return null;
    }

}

export async function createUser(toCreate) {

    if (await getUser(toCreate.name) !== null) {
        throw "Already exists"
    }
    const user = await prisma.User.create({
        data: toCreate,
    })
    return user
}

//#endregion User