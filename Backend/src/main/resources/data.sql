-- Inserir dados na tabela blood_center apenas se não existirem
INSERT INTO blood_center (name, email, address, reference_point, photo, password, phone, role)
SELECT 'Hemope', 'hemope.oficial@gmail.com', 'Rua Joaquim Nabuco, 171', 'Por trás do hospital da Restauração', NULL, 'Hemope2024', '8131824600', 'BLOODCENTER'
WHERE NOT EXISTS (
    SELECT 1 FROM blood_center WHERE name = 'Hemope'
);

INSERT INTO blood_center (name, email, address, reference_point, photo, password, phone, role)
SELECT 'Hemato', 'hemato.oficial@gmail.com', 'Rua Dom Bosco, 723', 'Em "frente" a Praça Chora Menino', NULL, 'Hemato2024', '8151139033', 'BLOODCENTER'
WHERE NOT EXISTS (
    SELECT 1 FROM blood_center WHERE name = 'Hemato'
);

INSERT INTO blood_center (name, email, address, reference_point, photo, password, phone, role)
SELECT 'Ihene', 'ihene.oficial@gmail.com', 'Rua Tabira, 54', 'Por trás da Global Outsourcing', NULL, 'Ihene2024', '8121383500', 'BLOODCENTER'
WHERE NOT EXISTS (
    SELECT 1 FROM blood_center WHERE name = 'Ihene'
);

-- Inserir dados na tabela blood_stock apenas se não existirem
INSERT INTO blood_stock (fk_bloodcenter, o_positive, o_negative, a_positive, a_negative, b_positive, b_negative, ab_positive, ab_negative)
SELECT 1, 10, 20, 30, 40, 50, 60, 70, 80
WHERE NOT EXISTS (
    SELECT 1 FROM blood_stock WHERE fk_bloodcenter = 1
);

INSERT INTO blood_stock (fk_bloodcenter, o_positive, o_negative, a_positive, a_negative, b_positive, b_negative, ab_positive, ab_negative)
SELECT 2, 72, 15, 38, 91, 5, 60, 84, 29
WHERE NOT EXISTS (
    SELECT 1 FROM blood_stock WHERE fk_bloodcenter = 2
);

INSERT INTO blood_stock (fk_bloodcenter, o_positive, o_negative, a_positive, a_negative, b_positive, b_negative, ab_positive, ab_negative)
SELECT 3, 47, 83, 22, 69, 10, 55, 76, 34
WHERE NOT EXISTS (
    SELECT 1 FROM blood_stock WHERE fk_bloodcenter = 3
);

-- Inserir dados na tabela scheduling apenas se não existirem
INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 1, '2024-10-07 14:30:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-10-07 14:30:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 1, '2024-10-07 14:00:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-10-07 14:00:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 1, '2024-10-16 08:00:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-10-16 08:00:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 1, '2024-05-18 09:15:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-05-18 09:15:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 1, '2024-11-29 17:42:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 2, '2024-10-20 06:28:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 2, '2024-06-14 22:03:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 2, '2024-09-05 13:20:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 2, '2024-12-11 08:55:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 3, '2024-07-27 19:40:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 3, '2024-04-01 10:12:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 3, '2024-08-22 16:38:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 3, '2024-11-03 07:04:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 1 AND date_time = '2024-11-29 17:42:00.000000'
);