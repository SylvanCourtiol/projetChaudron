import { PrismaClient } from '@prisma/client'
import { marked } from 'marked';

const prisma = new PrismaClient()

export async function getRecipeById(id, options) {
    const defaultOptions = { noContent: false, contentType: 'text/markdown'}
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

    const defaultOptions = { noContent: false, contentType: 'text/markdown'}
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