import { Document, Link, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ResumeDto, SkillDto, ProjectDto } from "../../database/models/Dto";
import { ContactType } from "../../database/models/enums";
import { useSkillGroups } from "../../hooks/useSkillGroups";

interface PDFTemplateProps {
  data: ResumeDto;
}

const ContactItem = ({ type, value }: { type: ContactType; value: string }) => {
  const getContactElement = () => {
    switch (type) {
      case ContactType.Email:
        return (
          <Link src={`mailto:${value}`}>
            <Text style={styles.contactLink}>{value}</Text>
          </Link>
        );
      case ContactType.Phone:
        return (
          <Link src={`tel:${value}`}>
            <Text style={styles.contactLink}>{value}</Text>
          </Link>
        );
      case ContactType.LinkedIn:
        return (
          <Link src={value}>
            <Text style={styles.contactLink}>LinkedIn</Text>
          </Link>
        );
      case ContactType.GitHub:
        return (
          <Link src={value}>
            <Text style={styles.contactLink}>GitHub</Text>
          </Link>
        );
      case ContactType.Portfolio:
        return (
          <Link src={value}>
            <Text style={styles.contactLink}>Portfolio</Text>
          </Link>
        );
      case ContactType.Location:
        return <Text style={styles.contactText}>{value}</Text>;
      default:
        return <Text style={styles.contactText}>{value}</Text>;
    }
  };

  return <View style={styles.contactItem}>{getContactElement()}</View>;
};

const getYearRange = (projects: ProjectDto[]) => {
  if (!projects.length) return "";

  const years = projects
    .map((p) => {
      const startYear = parseInt(p.start.split(".")[1]);
      const finishYear = p.finish
        ? parseInt(p.finish.split(".")[1])
        : new Date().getFullYear();
      return [startYear, finishYear];
    })
    .flat();

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  return minYear === maxYear ? minYear : `${minYear}-${maxYear}`;
};

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// PDF Template component
export const PDFTemplate = ({ data }: PDFTemplateProps): JSX.Element => {
  const defaultData = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    positions: data?.positions || [],
    contacts: data?.contacts || [],
    experience: data?.experience || [],
    education: data?.education || [],
    languages: data?.languages || [],
    soft_skills: data?.soft_skills || [],
    growth_highlights: data?.growth_highlights || [],
    references: data?.references || [],
    certificates: data?.certificates || [],
  };

  const currentPosition = defaultData.positions[0] || {
    title: "Front-End Developer",
    skills: [],
    summary: "",
  };

  const skillGroups = useSkillGroups();

  // Группируем скиллы
  const groupedSkills: { [key: string]: SkillDto[] } = {
    Other: [],
  };

  // Создаем начальные группы
  skillGroups.forEach((group) => {
    groupedSkills[group.title] = [];
  });

  // Распределяем скиллы по группам
  currentPosition.hard_skills?.forEach((skill) => {
    const group = skillGroups.find((g) => g.id === skill.group_id);
    if (group) {
      groupedSkills[group.title].push(skill);
    } else {
      groupedSkills.Other.push(skill);
    }
  });

  // Удаляем пустые группы (кроме Other)
  Object.keys(groupedSkills).forEach((key) => {
    if (groupedSkills[key].length === 0 && key !== "Other") {
      delete groupedSkills[key];
    }
  });

  // Если в Other нет скиллов, удаляем и её
  if (groupedSkills.Other.length === 0) {
    delete groupedSkills.Other;
  }

  // Группировка софт скиллов
  const groupedSoftSkills: { [key: string]: SkillDto[] } = {
    Other: [],
  };

  // Создаем начальные группы из существующих групп
  skillGroups.forEach((group) => {
    groupedSoftSkills[group.title] = [];
  });

  // Распределяем скиллы по группам
  defaultData.soft_skills.forEach((skill) => {
    const group = skillGroups.find((g) => g.id === skill.group_id);
    if (group) {
      groupedSoftSkills[group.title].push(skill);
    } else {
      groupedSoftSkills.Other.push(skill);
    }
  });

  // Удаляем пустые группы (кроме Other)
  Object.keys(groupedSoftSkills).forEach((key) => {
    if (groupedSoftSkills[key].length === 0 && key !== "Other") {
      delete groupedSoftSkills[key];
    }
  });

  // Если в Other нет скиллов, удаляем и её
  if (groupedSoftSkills.Other.length === 0) {
    delete groupedSoftSkills.Other;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {`${defaultData.firstName} ${defaultData.lastName}`}
          </Text>
          <Text style={styles.position}>{currentPosition.title}</Text>
        </View>
        <View style={styles.twoColumns}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Career Objective */}
            {currentPosition.objective && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Career Objective</Text>
                <Text style={styles.bulletPoint}>
                  {currentPosition.objective}
                </Text>
              </View>
            )}

            {/* Work Experience */}
            {defaultData.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
                {defaultData.experience
                  .sort(
                    (a, b) =>
                      new Date(b.start).getTime() - new Date(a.start).getTime()
                  )
                  .map((exp, index) => (
                    <View
                      key={index}
                      style={styles.experienceBlock}
                      wrap={!(!exp.projects || exp.projects.length === 0)}
                    >
                      {/* Header */}
                      <View style={styles.experienceHeader}>
                        <Text style={{ ...styles.jobTitle, ...styles.company }}>
                          {exp.position} {exp.company && `| ${exp.company}`}
                        </Text>
                        <Text style={styles.dateLocation}>
                          {`${exp.start} - ${exp.finish || "Present"}`}
                          {exp.location && ` | ${exp.location}`}
                        </Text>
                      </View>

                      {/* Description if exists */}
                      {exp.description && (
                        <Text style={styles.experienceDescription}>
                          {exp.description}
                        </Text>
                      )}

                      {/* Key Projects */}
                      {exp.projects
                        ?.filter((project) => project.key_project)
                        .map((project, projectIndex) => (
                          <View key={projectIndex} style={styles.projectBlock}>
                            {/* Project Header */}
                            <Text style={styles.projectTitle}>
                              {project.title} ({project.start} -{" "}
                              {project.finish || "Present"})
                            </Text>

                            {/* Project Description */}
                            {project.description && (
                              <Text style={styles.projectDescription}>
                                {project.description}
                              </Text>
                            )}

                            {/* Project Deliverables with Title */}
                            {project.deliverables_title && (
                              <Text style={styles.deliverableTitle}>
                                {project.deliverables_title}:
                              </Text>
                            )}

                            {/* Project Deliverables */}
                            {project.deliverables?.map(
                              (deliverable, delIndex) => (
                                <Text
                                  key={delIndex}
                                  style={styles.deliverableItem}
                                >
                                  • {deliverable.deliverable}
                                </Text>
                              )
                            )}

                            {/* Project Technologies */}
                            {project.hard_skills?.length > 0 && (
                              <Text style={styles.technologies}>
                                Technologies:{" "}
                                {project.hard_skills
                                  .map((skill) => skill.title)
                                  .join(", ")}
                              </Text>
                            )}
                          </View>
                        ))}

                      {/* Other Projects */}
                      {exp.projects?.some(
                        (project) => !project.key_project
                      ) && (
                        <View style={styles.otherProjectsBlock}>
                          {/* Сдвигаем заголовок и содержимое */}
                          <View style={styles.projectBlock}>
                            <Text style={styles.otherProjectsTitle}>
                              Other Key Projects (
                              {getYearRange(
                                exp.projects.filter((p) => !p.key_project)
                              )}
                              ):
                            </Text>
                            {exp.projects
                              .filter((project) => !project.key_project)
                              .sort(
                                (a, b) =>
                                  new Date(b.start).getTime() -
                                  new Date(a.start).getTime()
                              )
                              .map((project, index) => (
                                <View
                                  key={index}
                                  style={styles.otherProjectItemWrapper}
                                >
                                  <Text style={styles.otherProjectItem}>
                                    •{" "}
                                    <Text style={styles.projectTitleBold}>
                                      {project.title}
                                    </Text>{" "}
                                    ({project.start} -{" "}
                                    {project.finish || "Present"}):{" "}
                                    {project.description}
                                  </Text>
                                </View>
                              ))}
                          </View>
                        </View>
                      )}

                      {!exp.projects?.length && (
                        <Text style={styles.deliverableTitle}>
                          Key Projects & Achievements:
                        </Text>
                      )}

                      {/* Experience Level Deliverables */}
                      {exp.deliverables_title && (
                        <Text style={styles.deliverableTitle}>
                          {exp.deliverables_title}:
                        </Text>
                      )}

                      {exp.deliverables?.map((deliverable, delIndex) => (
                        <Text key={delIndex} style={styles.deliverableItem}>
                          • {deliverable.deliverable}
                        </Text>
                      ))}

                      {/* Experience Level Technologies */}
                      {exp.hard_skills?.length > 0 && (
                        <Text style={styles.technologies}>
                          Technologies:{" "}
                          {exp.hard_skills
                            .map((skill) => skill.title)
                            .join(", ")}
                        </Text>
                      )}
                    </View>
                  ))}
              </View>
            )}

            {/* Certificates & Courses Section */}
            {defaultData.certificates?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  CERTIFICATIONS & COURSES
                </Text>
                {defaultData.certificates
                  .sort((a, b) => b.start - a.start) // Сортировка по году, новые первыми
                  .map((cert, index) => (
                    <View key={index} style={styles.certificateBlock}>
                      <View style={styles.certificateHeader}>
                        {cert.link ? (
                          <Link src={cert.link}>
                            <Text style={styles.certificateTitle}>
                              {cert.title}
                            </Text>
                          </Link>
                        ) : (
                          <Text style={styles.certificateTitle}>
                            {cert.title}
                          </Text>
                        )}
                      </View>

                      <View style={styles.certificateDetails}>
                        {cert.issuer && (
                          <Text style={styles.certificateIssuer}>
                            {cert.issuer}
                          </Text>
                        )}

                        <Text style={styles.certificateDate}>
                          {cert.start}
                          {cert.finish ? ` - ${cert.finish}` : ""}
                          {cert.type &&
                            ` | ${capitalizeFirstLetter(cert.type)}`}
                        </Text>

                        {cert.credentialId && (
                          <Text style={styles.credentialId}>
                            Credential ID: {cert.credentialId}
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
            )}

            {/* Professional Growth Highlights */}
            {defaultData.growth_highlights?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  PROFESSIONAL GROWTH HIGHLIGHTS
                </Text>
                {defaultData.growth_highlights
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((highlight, index) => (
                    <Text key={index} style={styles.highlightItem}>
                      • {highlight.highlight_text}
                    </Text>
                  ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Contacts */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <View>
                {defaultData.contacts
                  .sort(
                    (a, b) => (a?.display_order || 0) - (b?.display_order || 0)
                  )
                  .map(
                    (contact, index) =>
                      contact && (
                        <View key={index} style={styles.bulletPoint}>
                          <ContactItem
                            type={contact.type as ContactType}
                            value={contact.value}
                          />
                        </View>
                      )
                  )}
              </View>
            </View>

            {/* Education section */}
            {defaultData.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {defaultData.education.map(
                  (edu, index) =>
                    edu && (
                      <View key={index} style={styles.educationItem}>
                        <Text style={styles.company}>{edu.university}</Text>
                        {edu.diploms
                          .sort((a, b) => {
                            // Преобразуем строки дат в объекты Date для сравнения
                            const dateA = new Date(
                              a.start.split(".").reverse().join("-")
                            );
                            const dateB = new Date(
                              b.start.split(".").reverse().join("-")
                            );
                            return dateB.getTime() - dateA.getTime(); // Сортировка по убыванию (новые первыми)
                          })
                          .map(
                            (diploma, diplomaIndex) =>
                              diploma && (
                                <View key={diplomaIndex}>
                                  <Text style={styles.dateLocation}>
                                    {`${diploma.start} - ${diploma.finish}`}
                                  </Text>
                                  <Text style={styles.bulletPoint}>
                                    {diploma.degree} in {diploma.specialization}
                                  </Text>
                                </View>
                              )
                          )}
                      </View>
                    )
                )}
              </View>
            )}

            {/* Hard Skills section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hard Skills</Text>

              {Object.keys(groupedSkills).length > 0 && (
                <View style={styles.skillsSection}>
                  {Object.entries(groupedSkills)
                    .filter(([_, skills]) => skills.length > 0)
                    .sort(([groupA], [groupB]) => {
                      // Other всегда последняя
                      if (groupA === "Other") return 1;
                      if (groupB === "Other") return -1;
                      // Находим группы в списке групп
                      const groupObjA = skillGroups.find(
                        (g) => g.title === groupA
                      );
                      const groupObjB = skillGroups.find(
                        (g) => g.title === groupB
                      );
                      // Сортируем по id
                      return (groupObjA?.id || 0) - (groupObjB?.id || 0);
                    })
                    .map(([groupTitle, skills]) => (
                      <View
                        key={groupTitle}
                        style={styles.skillList}
                        wrap={false}
                      >
                        <Text style={styles.skillCategory}>{groupTitle}</Text>
                        {skills
                          .sort(
                            (a, b) =>
                              (a.display_order || 0) - (b.display_order || 0)
                          )
                          .map((skill, skillIndex) => (
                            <Text key={skillIndex} style={styles.skillItem}>
                              {skill.title}
                            </Text>
                          ))}
                      </View>
                    ))}
                </View>
              )}
            </View>

            {/* Soft Skills section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Soft Skills</Text>

              {Object.keys(groupedSoftSkills).length > 0 && (
                <View style={styles.skillsSection}>
                  {Object.entries(groupedSoftSkills)
                    .filter(([_, skills]) => skills.length > 0)
                    .sort(([groupA], [groupB]) => {
                      // Other всегда последняя
                      if (groupA === "Other") return 1;
                      if (groupB === "Other") return -1;
                      // Находим группы в списке групп
                      const groupObjA = skillGroups.find(
                        (g) => g.title === groupA
                      );
                      const groupObjB = skillGroups.find(
                        (g) => g.title === groupB
                      );
                      // Сортируем по id
                      return (groupObjA?.id || 0) - (groupObjB?.id || 0);
                    })
                    .map(([groupTitle, skills]) => (
                      <View
                        key={groupTitle}
                        style={styles.skillList}
                        wrap={false}
                      >
                        <Text style={styles.skillCategory}>{groupTitle}</Text>
                        {skills
                          .sort(
                            (a, b) =>
                              (a.display_order || 0) - (b.display_order || 0)
                          )
                          .map((skill, skillIndex) => (
                            <Text key={skillIndex} style={styles.skillItem}>
                              • {skill.title}
                            </Text>
                          ))}
                      </View>
                    ))}
                </View>
              )}
            </View>

            {/* Languages section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>

              {defaultData.languages.length > 0 && (
                <View style={styles.skillsSection}>
                  {defaultData.languages.map(
                    (lang, index) =>
                      lang && (
                        <Text key={index} style={styles.languageItem}>
                          {lang.title} - {lang.level}
                        </Text>
                      )
                  )}
                </View>
              )}
            </View>

            {/* References section */}
            {defaultData.references?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>References</Text>
                <View style={styles.referencesSection}>
                  {defaultData.references.map((reference, index) => (
                    <View key={index} style={styles.referenceItem}>
                      {/* Name with prefix */}
                      <Text style={styles.referenceName}>
                        {reference.name_prefix
                          ? `${reference.name_prefix}. `
                          : ""}
                        {reference.name}
                      </Text>

                      {/* Position & Company */}
                      {(reference.position || reference.company) && (
                        <Text style={styles.referencePosition}>
                          {reference.position}
                          {reference.position && reference.company && " | "}
                          {reference.company}
                        </Text>
                      )}

                      {/* Contact details */}
                      {reference.email && (
                        <Link src={`mailto:${reference.email}`}>
                          <Text style={styles.referenceContact}>
                            Email: {reference.email}
                          </Text>
                        </Link>
                      )}
                      {reference.phone && (
                        <Link src={`tel:${reference.phone}`}>
                          <Text style={styles.referenceContact}>
                            Phone: {reference.phone}
                          </Text>
                        </Link>
                      )}
                      {reference.skype && (
                        <Text style={styles.referenceContact}>
                          Skype: {reference.skype}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
