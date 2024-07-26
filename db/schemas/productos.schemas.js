import mongoose from 'mongoose';

const { Schema, models, model, ObjectId} = mongoose;

const ProductSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: ObjectId, required: true, ref:"Categoria"},
    imagen: { type: String, required: true },
    talle: { type: [String], required: true }
});

const Producto = models.Producto || model('Producto',ProductSchema);

export default Producto;