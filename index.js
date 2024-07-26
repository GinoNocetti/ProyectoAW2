import express from 'express'
import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
import cors from 'cors';

/* Routers */
import usuarioRouter from './routes/usuarios.routes.js'
import productoRouter from './routes/productos.routes.js'
import ventasRouter from './routes/ventas.routes.js'
import categoriasRouter from './routes/categoria.routes.js'

dotenv.config()

const app = express()

const puerto = process.env.Puerto || 5000 
//Tanto en el archivo .env como la alternativa está puesto el puerto 5000 para evitar posibles errores
app.use(cors());

app.use(express.json())

app.listen(puerto, () =>{
    console.log(`Servidor levantado en el puerto ${puerto}`)
})

/* Levantar el Front */
app.use(express.static('./public/'))

/* Rutas */
app.use('/usuarios', usuarioRouter)
app.use('/productos', productoRouter)
app.use('/ventas', ventasRouter)
app.use('/categorias', categoriasRouter)

/* Mensajes de prueba */
app.get(`/`, (req, res)=>{
    res.send('Hola Mundo!')
})

app.get(`/Test`, (req, res)=>{
    res.send('Mensaje de prueba')
})