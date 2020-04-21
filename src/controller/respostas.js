const _resposta200 = (res, data, message = "Ação executada com sucesso!") => {
  res.status(200);
  res.send({ message: message, data: data });
};

module.exports = {
  resposta200: _resposta200,

  respostaAlteracao200: (res, data) => {
    _resposta200(res, data, "Recurso alterado com sucesso!");
  },

  respostaExclusao200: (res, data) => {
    _resposta200(res, data, "Recurso excluido com sucesso!");
  },

  resposta201: (res, data) => {
    res.status(201);
    res.send({ message: "Recurso criado com sucesso!", recurso: data });
  },

  resposta400: (res, error) => {
    res.status(400);
    res.send({ erro: error.detail });
  },

  resposta412: (res, error) => {
    res.status(412);
    res.send({ erro: error.detail });
  },

  resposta422: (res, errors) => {
    res.status(422);
    res.json({ errors: errors.array() });
  }
};
