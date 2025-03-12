const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tipo: { type: String, enum: ["cliente", "funcionario"], required: true },
    criadoEm: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
module.exports = User