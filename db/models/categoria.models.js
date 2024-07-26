import { connectToDatabase } from "../connection.js"
import Productos from "../schemas/productos.schemas.js"
import Categoria from "../schemas/categoria.schemas.js"

export const createCategory = async(name)=>{
    try{
        await connectToDatabase()
        const res = await Categoria.create({name})
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const findAll = async()=>{
    try{
        await connectToDatabase()
        const res = await Categoria.find()
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}