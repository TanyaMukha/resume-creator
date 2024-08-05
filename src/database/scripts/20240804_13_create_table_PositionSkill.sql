CREATE TABLE PositionSkill (
    position_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    FOREIGN KEY (position_id) REFERENCES Position(id),
    FOREIGN KEY (skill_id) REFERENCES Skill(id),
    PRIMARY KEY (position_id, skill_id)
);