CREATE TABLE ProjectAchievement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    achievement TEXT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id)
);

CREATE TABLE ProjectRole (
    project_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    PRIMARY KEY (project_id, role_id)
);

CREATE TABLE ProjectSkill (
    project_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id),
    FOREIGN KEY (skill_id) REFERENCES Skill(id),
    PRIMARY KEY (project_id, skill_id)
);

CREATE TABLE ProjectTask (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    unvisible BOOLEAN,
    project_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id)
);