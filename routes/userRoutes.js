const express = require("express");
const router = express.Router();
const User = require("../models/users/User");

// Criar um novo usuário
router.post("/", async (req, res) => {
    try {
        const novoUsuario = new User(req.body);
        await novoUsuario.save();
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Listar todos os usuários
router.get("/", async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Buscar usuário por ID
router.get("/:id", async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Atualizar usuário
router.put("/:id", async (req, res) => {
    try {
        const usuarioAtualizado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuarioAtualizado) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Deletar usuário
router.delete("/:id", async (req, res) => {
    try {
        const usuarioDeletado = await User.findByIdAndDelete(req.params.id);
        if (!usuarioDeletado) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.json({ mensagem: "Usuário deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;
