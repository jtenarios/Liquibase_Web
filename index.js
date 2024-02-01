const { log } = require('console')
const express = require('express')

const app = express()

// forma sendFile: se espcifica la ruta y la página a mostrar
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html') // __dirname es la ruta absoluta del proyecto
})

// app.get('/page1', (req, res) => {
//     res.sendFile(__dirname + '/static/page1.html') // __dirname es la ruta absoluta del proyecto
// })


// forma use: enviar la carpeta public (deja todo el contenido disponible)
// se puede acceder a los ficheros poniendo la ruta completa, 
// ej. http://localhost:3000/login.html
// ej. http://localhost:3000/style.css
app.use(express.static('public'))




app.listen(3000)
console.log('Server on port 3000!');

