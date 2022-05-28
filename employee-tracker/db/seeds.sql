INSERT INTO department (name, description)
VALUES
  ('Admin', 'Helps keep the smooth running operations of the company'),
  ('Management', 'Overseeing hiring and leading their team'),
  ('Engineering', 'Design, develop, test, and maintenance of applications'),
  ('Marketing', 'Getting people interested in the companies services');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Chief Admin Officer', '274890', '1'),
  ('Vice President of Admin', '170000', '1'),
  ('Director of Administration', '88499', '1'),
  ('Manager', '120000', '2'),
  ('Senior Developer', '103295', '3'),
  ('Junior Developer', '100809', '3'),
  ('Intern', '62941', '3'),
  ('Marketing Manager', '68624', '4'),
  ('SEO Specialist', '56979', '4'),
  ('Market Research Analyst', '62033', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Wilkes', '7', '6'),
  ('Crystal', 'Cerino', '9', '17'),
  ('Adam', 'Warlock', '5', '17'),
  -- ('Macy', 'Jones', '3'),
  ('Miranda', 'Lambert', '8', '14'),
  -- ('Tracy', 'Morgan', '4'),
  -- ('Janna', 'Goodman', '2'),
  ('Laynie', 'Smith', '7', '17'),
  ('Silvia', 'Rodriguez', '6', '6'),
  ('Ramses', 'Foreman', '9', '17'),
  ('Noe', 'Edgar', '8', '14'),
  ('William', 'Strong', '5', '6'),
  ('Janet', 'Jackson', '9', '6'),
  -- ('Kacie', 'Newman', '4'),
  ('Selena', 'Lopez', '5', '14'),
  -- ('Quentin', 'Tarantino', '1'),
  -- ('Omar', 'Cruz', '4'),
  ('Penelope', 'Hernandez', '6', '14');