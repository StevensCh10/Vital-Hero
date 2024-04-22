INSERT INTO blood_center (name, email, address, reference_point, photo, password, phone, role)
VALUES 
    ('Hemope', 'hemope.oficial@gmail.com', 'Rua Joaquim Nabuco, 171', 'Ao lado de alguma coisa', NULL, "Hemope2024", '8131824600', 'BLOODCENTER'),
    ('Hemato', 'hemato.oficial@gmail.com', 'Rua Dom Bosco, 723', 'Ao lado de alguma coisaaa', NULL, "Hemato2024", '8151139033', 'BLOODCENTER');

INSERT INTO blood_stock (fk_bloodcenter, o_positive, o_negative, a_positive, a_negative, b_positive, b_negative, ab_positive, ab_negative)
VALUES 
    (1, 10, 20, 30, 40, 50, 60, 70, 80);

INSERT INTO scheduling (fk_bloodcenter, date_time)
VALUES 
    (1, '2023-10-07 14:30:00.000000'),
    (1, '2023-10-07 14:00:00.000000'),
    (1, '2023-10-16 08:00:00.000000');