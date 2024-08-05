CREATE TABLE ResumeExperience (
    resume_id INTEGER NOT NULL,
    experience_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id),
    FOREIGN KEY (experience_id) REFERENCES Experience(id),
    PRIMARY KEY (resume_id, experience_id)
);