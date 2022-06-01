INSERT INTO department (name, description)
VALUES
  ('Admin', 'Helps keep the smooth running operations of the company'),
  ('Management', 'Overseeing hiring and leading their team'),
  ('Engineering', 'Design, develop, test, and maintenance of applications'),
  ('Marketing', 'Getting people interested in the companies services');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Chief Admin Officer', 274890, 1),
  ('Vice President of Admin', 170000, 1),
  ('Director of Administration', 88499, 1),
  ('Manager', 120000, 2),
  ('Senior Developer', 103295, 3),
  ('Junior Developer', 100809, 3),
  ('Intern', 62941, 3),
  ('Marketing Manager', 68624, 4),
  ('SEO Specialist', 56979, 4),
  ('Market Research Analyst', 62033, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Wilkes', 7, null),
  ('Crystal', 'Cerino', 9, 1),
  ('Adam', 'Warlock', 5, null),
  ('Macy', 'Jones', 3, NULL),
  ('Miranda', 'Lambert', 8, 3),
  ('Tracy', 'Morgan', 4, NULL),
  ('Janna', 'Goodman', 2, NULL),
  ('Laynie', 'Smith', 7, 4),
  ('Silvia', 'Rodriguez', 6, 6),
  ('Ramses', 'Foreman', 9, 1),
  ('Noe', 'Edgar', 8, 3),
  ('William', 'Strong', 5, 6),
  ('Janet', 'Jackson', 9, 6),
  ('Kacie', 'Newman', 4, NULL),
  ('Selena', 'Lopez', 5, null),
  ('Quentin', 'Tarantino', 1, NULL),
  ('Omar', 'Cruz', 4, NULL),
  ('Penelope', 'Hernandez', 6, null);