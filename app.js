const express = require('express')//constante //
const app = express()//executando uma funcao//
const port = 3001
app.use(express.json());

let bd = [

    {
        id: "1",
        name: "Luiz Carlos"
    },
    {
        id: "2",
        nome: "Bruna"
    }
]

//get users
app.get('/users', (request, response) => {

  response.json(bd);
  
})
app.get('/users/:id', (request, response) => {
//pegar o id da requisicao
const idUser = request.params.id;

// encontrar o usuario correspondente no bd
const user = bd.filter((usuario) => usuario.id === idUser);

//responder a requisicao com as info do users
response.json(user);

})

app.post("/users",(request, response) =>{

//pegar o corpo da requisiscao
const body = request.body;

//criar um novo objeto a partir desse corpo
const newUser = {
  id:(bd.length+1).toString(),
  name: body.name
}

//adicionar esse novo objeto no banco
bd.push(newUser);

//responder a requisicao com o banco completo
response.json(bd);

})
app.delete("/users/:id",(request, response) => {
  // pegar o id da requisicao
const idUser = request.params.id;
  //pecorer o banco e encontrar quem tem o id da requisicao
bd = bd.filter((usuario) => usuario.id != idUser);
  //deleta o condenado

  //responder com o meu banco atualizado
response.json(bd);
})

app.patch("/users/:id",(request, response) => {

  //pegar o id da requisicao
const idUser = request.params.id

  //pegar o corpo da requisicao
const body = request.body;

  //percorrer o banco
bd= bd.map((usuario) => {
  if(usuario.id === idUser){
  //atualizar as informações
  usuario.name = body.name;
  }
  return usuario
})
  //responder a requisição com o banco
  response.json(bd);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})