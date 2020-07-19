DROP TABLE IF EXISTS TB_HEROIS;

CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

--create --
INSERT INTO TB_HEROIS (NOME, PODER)
VALUES ('Calango', 'Velocidade'),
('Thor', 'Trovao'),
('Iron Man', 'Inteligencia')

--listar --
SELECT * FROM TB_HEROIS
SELECT * FROM TB_HEROIS WHERE NOME='Thor'

--update
UPDATE TB_HEROIS SET NOME='Jaba', PODER='Carne Seca' WHERE ID=1

--delete
DELETE FROM TB_HEROIS WHERE ID=3