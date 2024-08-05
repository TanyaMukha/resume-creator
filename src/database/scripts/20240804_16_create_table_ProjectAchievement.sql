CREATE TABLE ProjectAchievement (
    project_id INTEGER NOT NULL,
    achievement TEXT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id),
    PRIMARY KEY (project_id, achievement)
);