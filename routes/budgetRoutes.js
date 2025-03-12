const express = require("express");
const router = express.Router();
const Budget = require("../models/orcamento/Budget");
const Entry = require("../models/entrada/Entry");
const Item = require("../models/item/Item");
const User = require("../models/users/User");

// Criar um orçamento
router.post("/", async (req, res) => {
    try {
        const { entrada, itens, funcionarios } = req.body;

        // Verificar se a entrada existe
        const entradaExiste = await Entry.findById(entrada);
        if (!entradaExiste) {
            return res.status(400).json({ erro: "Entrada de veículo não encontrada" });
        }

        // Verificar se os itens existem
        for (const item of itens) {
            const itemExiste = await Item.findById(item.item);
            if (!itemExiste) {
                return res.status(400).json({ erro: `Item ${item.item} não encontrado` });
            }
        }

        // Criar o orçamento
        const novoOrcamento = new Budget({ entrada, itens, funcionarios });
        await novoOrcamento.save();

        res.status(201).json(novoOrcamento);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Listar todos os orçamentos
router.get("/", async (req, res) => {
    try {
        const orcamentos = await Budget.find()
            .populate("entrada", "placa dataEntrada relatoCliente")
            .populate("itens.item", "nome precoVenda")
            .populate("funcionarios", "nome email");

        res.json(orcamentos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Buscar um orçamento específico por ID
router.get("/:id", async (req, res) => {
    try {
        const orcamento = await Budget.findById(req.params.id)
            .populate("entrada", "placa dataEntrada relatoCliente")
            .populate("itens.item", "nome precoVenda")
            .populate("funcionarios", "nome email");

        if (!orcamento) {
            return res.status(404).json({ erro: "Orçamento não encontrado" });
        }

        res.json(orcamento);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Atualizar status do orçamento
router.put("/:id", async (req, res) => {
    try {
        const { status } = req.body;

        const orcamentoAtualizado = await Budget.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!orcamentoAtualizado) {
            return res.status(404).json({ erro: "Orçamento não encontrado" });
        }

        res.json(orcamentoAtualizado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Deletar um orçamento
router.delete("/:id", async (req, res) => {
    try {
        const orcamentoDeletado = await Budget.findByIdAndDelete(req.params.id);

        if (!orcamentoDeletado) {
            return res.status(404).json({ erro: "Orçamento não encontrado" });
        }

        res.json({ mensagem: "Orçamento deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;
