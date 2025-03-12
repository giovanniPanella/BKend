require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const userRoutes = require("./routes/userRoutes");
const veiculoRoutes = require("./routes/veiculoRoutes");
const entryRoutes = require("./routes/entryRoutes");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/veiculos", veiculoRoutes);
app.use("/entradas", entryRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API de Oficina Mecânica Rodando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));