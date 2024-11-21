import { Document, Link, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { PositionDto, ResumeDto } from "../../database/models/Dto";
import { ContactType } from "../../database/models/enums";
import { useSkillGroups } from "../../hooks/useSkillGroups";
import {
  capitalizeFirstLetter,
  getSkillsByGroup,
  getYearRange,
} from "./helper";
import { ContactItem } from "./ContactItem";

interface PDFTemplateProps {
  resume: ResumeDto;
  position: PositionDto;
}

export const PDFTemplate = ({
  resume,
  position,
}: PDFTemplateProps): JSX.Element => {
  const skillGroups = useSkillGroups();

  const data = {
    firstName: resume?.firstName || "",
    lastName: resume?.lastName || "",
    contacts: resume?.contacts || [],
    position: position || {
      title: "",
      summary: "",
    },
    hard_skills: getSkillsByGroup(skillGroups, position?.hard_skills || []),
    experience: resume?.experience || [],
    education: resume?.education || [],
    languages: resume?.languages || [],
    soft_skills: getSkillsByGroup(skillGroups, resume?.soft_skills || []),
    growth_highlights: resume?.growth_highlights || [],
    references: resume?.references || [],
    certificates: resume?.certificates || [],
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {`${data.firstName} ${data.lastName}`}
          </Text>
          <Text style={styles.position}>{data.position.title}</Text>
        </View>
        <View style={styles.twoColumns}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Career Objective */}
            {data.position.objective && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Career Objective</Text>
                <Text style={styles.bulletPoint}>
                  {data.position.objective}
                </Text>
              </View>
            )}

            {/* Work Experience */}
            {data.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
                {data.experience
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
            {data.certificates?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  CERTIFICATIONS & COURSES
                </Text>
                {data.certificates
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
            {data.growth_highlights?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  PROFESSIONAL GROWTH HIGHLIGHTS
                </Text>
                {data.growth_highlights
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
                {data.contacts
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
            {data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map(
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

              {Object.keys(data.hard_skills).length > 0 && (
                <View style={styles.skillsSection}>
                  {Object.entries(data.hard_skills)
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

              {Object.keys(data.soft_skills).length > 0 && (
                <View style={styles.skillsSection}>
                  {Object.entries(data.soft_skills)
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

              {data.languages.length > 0 && (
                <View style={styles.skillsSection}>
                  {data.languages.map(
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
            {data.references?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>References</Text>
                <View style={styles.referencesSection}>
                  {data.references.map((reference, index) => (
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
