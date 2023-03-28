import database from "../infra/bd.js";

class vendedoresDAO {
  static async mostrarTodos() {
    const dadosbd = await database.query("SELECT * FROM vendedores");
    return {
      dados: { msg: dadosbd },
      status: 200,
    };
  }
  // ESSE TA FUNCIONANDO \/
  static async mostrarUm(atributo, valor) {
    const dadosbd = await database.query(`SELECT * FROM vendedores WHERE ${atributo} = ?`, valor);
    return {
      dados: { msg: dadosbd },
      status: 200,
    };
  }
  static async inserir(obj) {
    try {
      await database.query("INSERT INTO vendedores (id, nome, email, cpf, meta) VALUES (?,?,?,?,?)", Object.values(obj));
    } catch (error) {
      return {
        dados: { msg: "MySql error", error: error.code },
        status: 500,
      };
    }
    return {
      dados: { msg: "Vendedor inserido com sucesso na tabela Vendedores" },
      status: 201,
    };
  }

  static async atualizar(id, obj) {
    try {
      await database.query("UPDATE vendedores SET id = ?, nome = ?, email = ?, cpf = ?, meta = ? WHERE id = ?", [
      obj.id,
      obj.nome, 
      obj.email,
      obj.cpf,
      obj.meta,
      id,
      ]);
    } catch (error) {
      return {
        dados: { msg: "MySql error", error: error.code },
        status: 500,
      };
    }
    return {
      dados: { msg: "Vendedor atualizado com sucesso na tabela Vendedores" },
      status: 200,
    };
  }
  static async deletar(id) {
    try {
      await database.query("DELETE FROM vendedores WHERE id = ?", [id]);
    } catch (error) {
      return {
        dados: { msg: "MySql error", error: error.code },
        status: 500,
      };
    }
    return {
      dados: { msg: "Vendedor excluido com sucesso da tabela Vendedores" },
      status: 200,
    };
  }

}

export default vendedoresDAO;
