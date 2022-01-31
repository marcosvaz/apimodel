import app from './app'

console.log('Servidor rodando em http://localhost:' + process.env.PORT)

app.listen(process.env.PORT)
