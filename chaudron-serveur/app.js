import express from 'express'

import cors from 'cors'; // Utilisez import

const app = express()
import { PrismaClient } from '@prisma/client';

const port = 3009;

app.use(cors());

const prisma = new PrismaClient();

app.get('/recipes', async (req, res) => {
    try {
      const recipes = await prisma.recipe.findMany();
      console.log(JSON.stringify(recipes));
      console.log("Successfull")
      res.json(recipes);
    } catch (error) {
      console.error('Erreur de récupératio des recettes', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

  app.get('/marks', async (req, res) => {
    try {
      const marks = await prisma.recipeMark.findMany();
      console.log(JSON.stringify(marks));
      console.log("Successfull")
      res.json(marks);
    } catch (error) {
      console.error('Erreur de récupératio des notes', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

app.get('/api', function (request, response) {
    // TODO
})

app.use(express.static('./public'))

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });