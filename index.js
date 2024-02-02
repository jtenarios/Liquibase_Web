const { log } = require('console')
const express = require('express')
const { spawn } = require('child_process')

const app = express()
const port = 3000

// forma sendFile: se espcifica la ruta y la página a mostrar
app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/index.html') // __dirname es la ruta absoluta del proyecto
})


// app.get('/page1', (req, res) => {
//     res.sendFile(__dirname + '/static/page1.html') // __dirname es la ruta absoluta del proyecto
// })


// forma use: enviar la carpeta public (deja todo el contenido disponible)
// se puede acceder a los ficheros poniendo la ruta completa, 
// ej. http://localhost:3000/login.html
// ej. http://localhost:3000/style.css
app.use(express.static('public'))

// Llamando a la url que ejecuta el python
// Ejemplo de uso "http://localhost:3000/script1"
app.get('/script1', (req, resp) => {
    // console.log('Llamando al end point de python')
    // resp.send('Llamando al end point de python')

    let data1;
    const pythonOne = spawn('python', ['script1.py'])

    pythonOne.stdout.on('data', function (data) {
        // data return buffer data here
        data1 = data.toString();
    })

    pythonOne.on('close', (code) => {
        console.log('code', code)
        console.log('data1', data1)
        resp.send(data1)
    })

})

// Recibe dos parámetros
// Ejemplo de uso "http://localhost:3000/script2/Nombre/Apellidos"
app.get('/script2/:fname/:lname', (req, resp) => {
    // console.log('Llamando al end point de python')
    // resp.send('Llamando al end point de python')

    let data2;
    const pythonOne = spawn('python', ['script2.py', req.params.fname, req.params.lname])

    pythonOne.stdout.on('data', function (data) {
        // data return buffer data here
        data2 = data.toString();
    })

    pythonOne.on('close', (code) => {
        console.log('code', code)
        console.log('data2', data2)
        resp.send(data2)
    })

})

app.get('/scriptPythonOri', (req, resp) => {
    // child_process: Módulo que nos permite generar subprocesos.
    // spawn: Método que genera un subproceso
    const spawn = require('child_process').spawn
    // spawn recibe el comando a ejecutar y los argumentos, es similar a utilizar desde línea de comandos "python script_python.py"
    const pythonProcess = spawn('python', ['script_python.py'])
    let pythonResponse = ''

    // stdout: Se encarga de la salida de datos del stdout del subproceso. En este caso, recibe datos del subproceso de Python.
    // .stdout.on('data',…): Ejecuta una función especificada cuando se reciben los datos que envía el subproceso.
    pythonProcess.stdout.on('data', function (data) {
        pythonResponse += data.toString()
    })
    // .stdout.on('end',…): Ejecuta una función especificada cuando se terminan de recibir datos desde el subproceso.
    pythonProcess.stdout.on('end', function () {
        console.log('pythonResponse', pythonResponse)
    })

    // stdin: Se encarga del ingreso de datos al stdin del subproceso. En este caso, envía datos del subproceso de Python.
    // .stdin.write(datos): Envía datos al subproceso
    pythonProcess.stdin.write('Jaime Tena')
    // .stdin.end(): Indica al subproceso que el envío de datos finalizó para que pueda ejecutar sus acciones
    pythonProcess.stdin.end()

    resp.send('python ejecutado')

})


app.listen(port)
console.log(`Server on port ${port}!`);

