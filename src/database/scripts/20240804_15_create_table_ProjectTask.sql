CREATE TABLE ProjectTask (
    project_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id),
    FOREIGN KEY (task_id) REFERENCES Task(id),
    PRIMARY KEY (project_id, task_id)
);