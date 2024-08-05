CREATE TABLE ResumePosition (
    resume_id INTEGER NOT NULL,
    position_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id),
    FOREIGN KEY (position_id) REFERENCES Position(id),
    PRIMARY KEY (resume_id, position_id)
);