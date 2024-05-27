import express from 'express'
import { readFile } from 'fs/promises'
import dotenv from 'dotenv'

/* Routers */
import usuarioRouter from './routes/usuarios.routes.js'
import productoRouter from './routes/productos.routes.js'
import ventasRouter from './routes/ventas.routes.js'

dotenv.config()

const app = express()

const puerto = process.env.Puerto || 3000

app.use(express.json())

app.listen(puerto, () =>{
    console.log(`Servidor levantado en el puerto ${puerto}`)
})

/* Rutas */
app.use('/usuarios', usuarioRouter)
app.use('/productos', productoRouter)
app.use('/ventas', ventasRouter)

/* Mensajes de prueba */
app.get(`/`, (req, res)=>{
    res.send('Hola Mundo!')
})

app.get(`/Test`, (req, res)=>{
    res.send('Mensaje de prueba')
})