INSERT INTO address (cep, street, additional_info, neighborhood, city, state_code, state, region)
SELECT '50010000', 'Rua Tabira', 'Próximo ao hospital', 'Boa Vista', 'Recife', 'PE', 'Pernambuco', 'Nordeste'
WHERE NOT EXISTS (
    SELECT 1 FROM address WHERE cep = '50010000'
);

INSERT INTO blood_center (name, email, fk_address, password, phone, role)
SELECT 'Hemope', 'hemope.oficial@gmail.com', 1, '$2b$12$b5.CGtarBVZ196zWpD5Cf.mroQiYXfhBBkx9UfKww0URaMYqx96Iq', '8131824600', 'BLOODCENTER'
WHERE NOT EXISTS (
    SELECT 1 FROM blood_center WHERE name = 'Hemope'
);

INSERT INTO blood_center (name, email, fk_address, password, phone, role)
SELECT 'Hemato', 'hemato.oficial@gmail.com', 1, '$2b$12$PYci.BYRx0022pDrTZVss./OyMtmTYUVaQyvvgvR7/NET2UVigCny', '8151139033', 'BLOODCENTER'
WHERE NOT EXISTS (
    SELECT 1 FROM blood_center WHERE name = 'Hemato'
);

INSERT INTO blood_center (name, email, fk_address, password, phone, role)
SELECT 'Ihene', 'ihene.oficial@gmail.com', 1, '$2b$12$tvL282avWUXwT5gatlPjv.ImYT.Wcxh.sS55b3k1LnVQp.Mf/IWnW', '8121383500', 'BLOODCENTER'
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
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 2 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 2, '2024-06-14 22:03:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 2 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 2, '2024-09-05 13:20:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 2 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 2, '2024-12-11 08:55:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 2 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 3, '2024-07-27 19:40:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 3 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 3, '2024-04-01 10:12:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 3 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 3, '2024-08-22 16:38:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 3 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO scheduling (fk_bloodcenter, date_time)
SELECT 3, '2024-11-03 07:04:00.000000'
WHERE NOT EXISTS (
    SELECT 1 FROM scheduling WHERE fk_bloodcenter = 3 AND date_time = '2024-11-29 17:42:00.000000'
);

INSERT INTO donor (name, cpf, email, age, gender, marital_status, fk_address, phone, blood_type, password, role)
SELECT 'Stevens Wendell Marinho Chaves', '123.456.789-10', 'stevensch10@outlook.com', 24, 'Masculino', 'Solteiro', 1, '81987654321', 'O+', '$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu', 'DONOR'
WHERE NOT EXISTS (
    SELECT 1 FROM donor WHERE cpf = '123.456.789-10'
);

INSERT INTO doctor (name, cpf, crm, email, age, gender, marital_status, fk_address, phone, password, role)
SELECT 'Robson da Silva', '123.456.789-11', 'CRM123456', 'robson@outlook.com', 28, 'Masculino', 'Casado', 1, '81987654322', '$2b$12$EIkZUEIZq0jLsBJ4XXKoderOiw8Q9WaR7dEvcV55RA5sAxMqg2H6G', 'DOCTOR'
WHERE NOT EXISTS (
    SELECT 1 FROM doctor WHERE cpf = '123.456.789-11'
);