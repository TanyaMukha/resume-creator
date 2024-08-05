CREATE TABLE ExperienceProject (
    experience_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES Experience(id),
    FOREIGN KEY (project_id) REFERENCES Project(id),
    PRIMARY KEY (experience_id, project_id)
);