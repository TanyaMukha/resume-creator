CREATE TABLE ProjectRole (
    project_id INTEGER NOT NULL,
    role TEXT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id),
    PRIMARY KEY (project_id, role)
);