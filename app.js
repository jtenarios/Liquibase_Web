// Para correr el proyecto escribir en una terminal node app.js

// Despues de cada cambio abría que cerrar y abrir de nuevo el servidor pero tenemos nodemon que hace esto por nosotros con cada cambio
// Para ejecutar con nodemon poner en una terminal "npm run dev"

// Node.js y express no funcionan con los .html sino con ficheros .ejs, para ello deberemos instalar "ejs" en las dependencias
// poner las vistas (ejs/html) en una carpeta llamda views

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    //res.send('Hola Jaime'); envía este mensaje por pantalla
    res.render('index'); // Renderiza un html
})

app.get('/Jaime', (req, res) =>{
    res.render('jaime'); // Renderiza un html
})

app.listen(3000, (req, res) => {
    console.log('Corriendo en el puerto 300');
});