import { Router } from "express";
import { createCategory, findAll } from "../db/models/categoria.models.js";
const router = Router()


router.get('/all',async(req,res)=>{
    try{
        const result = await findAll()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})

router.post('/create',async(req,res)=>{
    const {name} = req.body
    try{
        const result = await createCategory(name)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})

export default router