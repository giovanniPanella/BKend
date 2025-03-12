const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    marca: { type: String },
    preco: { type: Number, required: true },
    precoVenda: { type: Number, required: true },
    unidade: { type: String, enum: ["horas", "peça", "litro"], required: true },
    estoque: { type: Number, required: true, min: 0 }
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
