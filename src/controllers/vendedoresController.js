import vendedoresModel from "../models/vendedoresModel.js";
import VendedoresDAO from "../DAO/vendedoresDAO.js";

const vendedoresController = (app) => {
  app.get("/vendedores", async (req, res) => {
    const resposta = await VendedoresDAO.mostrarTodos();
    res.status(resposta.status).send(resposta.dados);
  });
  app.get("/vendedores/id/:id", async (req, res) => {
    const resposta = await VendedoresDAO.mostrarUm(req.params.id);
    res.status(resposta.status).send(resposta.dados);
  });
  app.post("/vendedores", async (req, res) => {
    const modelado = vendedoresModel.modelar(req.body)
    const resposta = await VendedoresDAO.inserir(modelado)
    res.status(resposta.status).send(resposta.dados);
  });
  app.delete("/vendedores/id/:id", async(req, res) => {
    const resposta = VendedoresDAO.deletar(req.params.id)
    res.status(resposta.status).send(resposta.dados)
  });
  app.put("/vendedores/id/:id", async(req, res) => {
    const resposta = await VendedoresDAO.atualizar(req.params.id)
    res.status(resposta.status).send(resposta.dados)
  });
};

export default vendedoresController;
