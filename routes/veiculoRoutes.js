const express = require("express");
const router = express.Router();
const Veiculo = require("../models/veiculos/Veiculo");
const User = require("../models/users/User");

// Criar um novo veículo vinculado a um cliente
router.post("/", async (req, res) => {
    try {
        const { cliente, marca, modelo, ano, motor, placa } = req.body;

        // Verifica se o cliente existe e se é um cliente válido
        const user = await User.findById(cliente);
        if (!user || user.tipo !== "cliente") {
            return res.status(400).json({ erro: "Cliente inválido" });
        }

        const novoVeiculo = new Veiculo({ cliente, marca, modelo, ano, motor, placa });
        await novoVeiculo.save();
        res.status(201).json(novoVeiculo);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Listar todos os veículos
router.get("/", async (req, res) => {
    try {
        const veiculos = await Veiculo.find().populate("cliente", "nome email telefone");
        res.json(veiculos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Buscar veículo por ID
router.get("/:id", async (req, res) => {
    try {
        const veiculo = await Veiculo.findById(req.params.id).populate("cliente", "nome email telefone");
        if (!veiculo) {
            return res.status(404).json({ erro: "Veículo não encontrado" });
        }
        res.json(veiculo);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Atualizar veículo
router.put("/:id", async (req, res) => {
    try {
        const veiculoAtualizado = await Veiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!veiculoAtualizado) {
            return res.status(404).json({ erro: "Veículo não encontrado" });
        }
        res.json(veiculoAtualizado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Deletar veículo
router.delete("/:id", async (req, res) => {
    try {
        const veiculoDeletado = await Veiculo.findByIdAndDelete(req.params.id);
        if (!veiculoDeletado) {
            return res.status(404).json({ erro: "Veículo não encontrado" });
        }
        res.json({ mensagem: "Veículo deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;