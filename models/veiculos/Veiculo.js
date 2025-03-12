const mongoose = require("mongoose");

const VeiculoSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    ano: { type: Number, required: true },
    motor: { type: String, required: true },
    placa: { type: String, required: true, unique: true },
    criadoEm: { type: Date, default: Date.now }
});

const Veiculo = mongoose.model("Veiculo", VeiculoSchema);
module.exports = Veiculo;