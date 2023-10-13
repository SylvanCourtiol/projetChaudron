import express from 'express'

const app = express()

app.get('/api', function (request, response) {
    // TODO
})

app.use(express.static('./static'))

app.listen(3000, function () {
    console.log("Server listening on port 3000")
  })