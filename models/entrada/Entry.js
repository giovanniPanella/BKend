const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    veiculo: { type: mongoose.Schema.Types.ObjectId, ref: "Veiculo", required: true },
    placa: { type: String, required: true },
    dataEntrada: { type: Date, default: Date.now },
    relatoCliente: { type: String, required: true },
    status: { type: String, enum: ["Aguardando Orçamento", "Em Orçamento", "Aprovado", "Reprovado"], default: "Aguardando Orçamento" }
});

const Entry = mongoose.model("Entry", EntrySchema);
module.exports = Entry;