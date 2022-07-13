const express = require("express");
const app = express();
const port = process.env.PORT || 8080
const Contenedor = require('./archivosEnJavascript')

const myWine = new Contenedor("./baseProductos.json");


const server = app.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto: ${server.address().port}`)
})

app.on('error', (err) => {
    console.log(err)
})


app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html; charset=UTF8')
    res.send(`
            Bienvenido al sitio de Prueba de Server Express <br>
            Seleccione la opción a probar: <br>
            <ul>
                <li><a href="/productos">/productos</a></li>
                <li><a href="/productoRandom">/productoRandom</a></li>
            </ul>
            `)
})


let visitas = 0;

let cadena = "./baseProductos.json"

app.get('/visitas', (req,res) => {
    visitas++;
    res.send(`La cantidad de visitas ${visitas}`)
})

app.get('/fyh', (req,res) =>{
    const fechaYHora = new Date(Date.now()).toLocaleString()
    res.send({fyh: fechaYHora})
})

app.get('/productos', (req, res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    myWine.getAll()
        .then((products)=>res.send(products))
})

app.get('/productoRandom', (req, res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    myWine.getRandom()
        .then((product)=>res.send(product))
})

server.on("error", error => console.log(`Error: ${error}`))



