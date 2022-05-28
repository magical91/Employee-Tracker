INSERT INTO department (name, description)
VALUES
  ('Admin', 'Helps keep the smooth running operations of the company'),
  ('Engineering', 'Design, develop, test, and maintenance of applications'),
  ('Marketing', 'Getting people interested in the companies services');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Chief Admin Officer', '274,890', '1'),
  ('Vice President of Administration', '170,000', '1'),
  ('Director of Administration', '88,499', '1'),
  ('Senior Developer', '103,295', '2'),
  ('Junior Developer', '100,809', '2'),
  ('Intern', '62,941', '2'),
  ('Marketing Manager', '68,624', '3'),
  ('SEO Specialist', '56,979', '3'),
  ('Market Research Analyst', '62,033', '3');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES