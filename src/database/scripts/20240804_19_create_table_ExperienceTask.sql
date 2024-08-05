CREATE TABLE ExperienceTask (
    experience_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES Experience(id),
    FOREIGN KEY (task_id) REFERENCES Task(id),
    PRIMARY KEY (experience_id, task_id)
);