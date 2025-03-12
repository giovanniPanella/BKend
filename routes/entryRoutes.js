const express = require("express");
const router = express.Router();
const Entry = require("../models/entrada/Entry");
const Veiculo = require("../models/veiculos/Veiculo");
const User = require("../models/users/User");

// Criar uma nova entrada de veículo
router.post("/", async (req, res) => {
    try {
        const { cliente, veiculo, placa, relatoCliente } = req.body;

        // Verificar se o cliente existe
        const user = await User.findById(cliente);
        if (!user || user.tipo !== "cliente") {
            return res.status(400).json({ erro: "Cliente inválido" });
        }

        // Verificar se o veículo existe
        const car = await Veiculo.findById(veiculo);
        if (!car) {
            return res.status(400).json({ erro: "Veículo não encontrado" });
        }

        // Criar a entrada
        const novaEntrada = new Entry({ cliente, veiculo, placa, relatoCliente });
        await novaEntrada.save();

        res.status(201).json(novaEntrada);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Listar todas as entradas de veículos
router.get("/", async (req, res) => {
    try {
        const entradas = await Entry.find()
            .populate("cliente", "nome email telefone")
            .populate("veiculo", "marca modelo ano motor placa");
        res.json(entradas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Buscar uma entrada específica por ID
router.get("/:id", async (req, res) => {
    try {
        const entrada = await Entry.findById(req.params.id)
            .populate("cliente", "nome email telefone")
            .populate("veiculo", "marca modelo ano motor placa");

        if (!entrada) {
            return res.status(404).json({ erro: "Entrada não encontrada" });
        }

        res.json(entrada);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Atualizar o status da entrada do veículo
router.put("/:id", async (req, res) => {
    try {
        const entradaAtualizada = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!entradaAtualizada) {
            return res.status(404).json({ erro: "Entrada não encontrada" });
        }

        res.json(entradaAtualizada);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Deletar uma entrada de veículo
router.delete("/:id", async (req, res) => {
    try {
        const entradaDeletada = await Entry.findByIdAndDelete(req.params.id);

        if (!entradaDeletada) {
            return res.status(404).json({ erro: "Entrada não encontrada" });
        }

        res.json({ mensagem: "Entrada deletada com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;