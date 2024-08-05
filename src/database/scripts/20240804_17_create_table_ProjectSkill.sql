CREATE TABLE ProjectSkill (
    project_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id),
    FOREIGN KEY (skill_id) REFERENCES Skill(id),
    PRIMARY KEY (project_id, skill_id)
);