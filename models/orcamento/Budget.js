const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    entrada: { type: mongoose.Schema.Types.ObjectId, ref: "Entry", required: true },
    itens: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true }, 
            quantidade: { type: Number, required: true, min: 1 },
            preco: { type: Number, required: true }
        }
    ],
    funcionarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Funcionários responsáveis
    status: { type: String, enum: ["Aguardando Aprovação", "Aprovado", "Reprovado"], default: "Aguardando Aprovação" }
});

const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;
