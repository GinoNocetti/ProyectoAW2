import mongoose from 'mongoose';

const { Schema, model, models, ObjectId } = mongoose;

const TalleSchema = new Schema({
    talle: { type: String, required: true },
    cant: { type: Number, required: true }
});

const ProductoVentaSchema = new Schema({
    id: { type: ObjectId, required: true, ref: 'Producto' },
    cantidad: { type: Number, required: true },
    talles: [TalleSchema]
});

const VentaSchema = new Schema({
    id_usuario: { type: ObjectId, required: true, ref: 'Usuario' },
    fecha: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    dirección: { type: String, required: true },
    productos: [ProductoVentaSchema]
});

const Venta = models.Venta || model('Venta', VentaSchema);

export default Venta;
