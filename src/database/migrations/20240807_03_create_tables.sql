CREATE TABLE Diplom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    education_id INTEGER NOT NULL,
    start TEXT NOT NULL,
    finish TEXT NOT NULL,
    degree TEXT NOT NULL,
    specialization TEXT NOT NULL,
    unvisible BOOLEAN,
    FOREIGN KEY (education_id) REFERENCES Education(id)
);

CREATE TABLE ExperienceAchievement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    experience_id INTEGER NOT NULL,
    achievement TEXT NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES Experience(id)
);

CREATE TABLE ExperienceTask (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    unvisible BOOLEAN,
    experience_id INTEGER NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES Experience(id)
);

CREATE TABLE PositionSkill (
    position_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    FOREIGN KEY (position_id) REFERENCES Position(id),
    FOREIGN KEY (skill_id) REFERENCES Skill(id),
    PRIMARY KEY (position_id, skill_id)
);

CREATE TABLE Project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    description TEXT NOT NULL,
    start TEXT NOT NULL,
    finish TEXT,
    unvisible BOOLEAN,
    experience_id INTEGER NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES Experience(id)
);