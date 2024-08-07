export const databaseMigrations = [
  {
    name: "20240807_01_create_tables",
    sql: (await import("./20240807_01_create_tables.sql?raw")).default,
    description: "Resume, Role, Skill",
  },
  {
    name: "20240807_02_create_tables",
    sql: (await import("./20240807_02_create_tables.sql?raw")).default,
    description: "Certificate, Contact, Education, Experience, Language, Position",
  },
  {
    name: "20240807_03_create_tables",
    sql: (await import("./20240807_03_create_tables.sql?raw")).default,
    description: "Diplom, ExperienceAchievement, ExperienceTask, PositionSkill, Project",
  },
  {
    name: "20240807_04_create_tables",
    sql: (await import("./20240807_04_create_tables.sql?raw")).default,
    description: "ProjectAchievement, ProjectRole, ProjectSkill, ProjectTask",
  },
];
