export const databaseMigrations = [
  {
    name: "20240804_02_create_table_Skill",
    sql: (await import('./scripts/20240804_02_create_table_Skill.sql?raw')).default,
  },
  {
    name: "20240804_03_create_table_Position",
    sql: (await import('./scripts/20240804_03_create_table_Position.sql?raw')).default,
  },
  {
    name: "20240804_04_create_table_Diplom",
    sql: (await import('./scripts/20240804_04_create_table_Diplom.sql?raw')).default,
  },
  {
    name: "20240804_05_create_table_Education",
    sql: (await import('./scripts/20240804_05_create_table_Education.sql?raw')).default,
  },
  {
    name: "20240804_06_create_table_Task",
    sql: (await import('./scripts/20240804_06_create_table_Task.sql?raw')).default,
  },
  {
    name: "20240804_07_create_table_Project",
    sql: (await import('./scripts/20240804_07_create_table_Project.sql?raw')).default,
  },
  {
    name: "20240804_08_create_table_Experience",
    sql: (await import('./scripts/20240804_08_create_table_Experience.sql?raw')).default,
  },
  {
    name: "20240804_09_create_table_Certificate",
    sql: (await import('./scripts/20240804_09_create_table_Certificate.sql?raw')).default,
  },
  {
    name: "20240804_10_create_table_Language",
    sql: (await import('./scripts/20240804_10_create_table_Language.sql?raw')).default,
  },
  {
    name: "20240804_11_create_table_Contact",
    sql: (await import('./scripts/20240804_11_create_table_Contact.sql?raw')).default,
  },
  {
    name: "20240804_12_create_table_Resume",
    sql: (await import('./scripts/20240804_12_create_table_Resume.sql?raw')).default,
  },
  {
    name: "20240804_13_create_table_PositionSkill",
    sql: (await import('./scripts/20240804_13_create_table_PositionSkill.sql?raw')).default,
  },
  {
    name: "20240804_14_create_table_ProjectRole",
    sql: (await import('./scripts/20240804_14_create_table_ProjectRole.sql?raw')).default,
  },
  {
    name: "20240804_15_create_table_ProjectTask",
    sql: (await import('./scripts/20240804_15_create_table_ProjectTask.sql?raw')).default,
  },
  {
    name: "20240804_16_create_table_ProjectAchievement",
    sql: (await import('./scripts/20240804_16_create_table_ProjectAchievement.sql?raw')).default,
  },
  {
    name: "20240804_17_create_table_ProjectSkill",
    sql: (await import('./scripts/20240804_17_create_table_ProjectSkill.sql?raw')).default,
  },
  {
    name: "20240804_18_create_table_ExperienceProject",
    sql: (await import('./scripts/20240804_18_create_table_ExperienceProject.sql?raw')).default,
  },
  {
    name: "20240804_19_create_table_ExperienceTask",
    sql: (await import('./scripts/20240804_19_create_table_ExperienceTask.sql?raw')).default,
  },
  {
    name: "20240804_20_create_table_ResumePosition",
    sql: (await import('./scripts/20240804_20_create_table_ResumePosition.sql?raw')).default,
  },
  {
    name: "20240804_21_create_table_ResumeEducation",
    sql: (await import('./scripts/20240804_21_create_table_ResumeEducation.sql?raw')).default,
  },
  {
    name: "20240804_22_create_table_ResumeExperience",
    sql: (await import('./scripts/20240804_22_create_table_ResumeExperience.sql?raw')).default,
  },
  {
    name: "20240804_23_create_table_ResumeCertificate",
    sql: (await import('./scripts/20240804_23_create_table_ResumeCertificate.sql?raw')).default,
  },
  {
    name: "20240804_24_create_table_ResumeLanguage",
    sql: (await import('./scripts/20240804_24_create_table_ResumeLanguage.sql?raw')).default,
  },
  {
    name: "20240804_25_create_table_ResumeContact",
    sql: (await import('./scripts/20240804_25_create_table_ResumeContact.sql?raw')).default,
  },
];
