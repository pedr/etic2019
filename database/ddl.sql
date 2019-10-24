CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY,
  email STRING,
  senha STRING,
  token STRING
);

CREATE TABLE eventos (
  id INTEGER PRIMARY KEY,
  nome STRING,
  alocacao_maxima INTEGER,
  horario DATETIME,
  duracao INTEGER
);

CREATE TABLE eventos_usuarios (
  evento_id INTEGER,
  usuario_id INTEGER,
  presenca_confirmada BOOLEAN,
  FOREIGN KEY (evento_id) REFERENCES eventos(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  PRIMARY KEY (evento_id, usuario_id)
);

INSERT INTO usuarios (email, senha) VALUES
  ('pedro@mail.com', '123456'),
  ('joao@mail.com', 'sadfasdf'),
  ('maria@mail.com', 'zxcvzxcv');

INSERT INTO eventos (nome, alocacao_maxima, horario, duracao) VALUES
  ('Primeira api em Node.js', 40, '2019-10-24 13:30', 4),
  ('ReactJS: Uma introdução', 40, '2019-10-24 13:30', 4),
  ('Como inovar infinitamente', 500, '2019-10-24 09:45', 2),
  ('Serveless realtime web application com VueJS e Firebase', 40, '2019-10-22 13:30', 4);

INSERT INTO eventos_usuarios (evento_id, usuario_id, presenca_confirmada) VALUES
  (1, 1, 0),
  (1, 3, 0),
  (3, 1, 0),
  (2, 2, 0),
  (4, 1, 0),
  (4, 2, 0),
  (4, 3, 0);
