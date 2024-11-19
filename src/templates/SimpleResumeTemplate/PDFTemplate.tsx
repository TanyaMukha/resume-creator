import { Document, Link, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ResumeDto, SkillDto } from "../../database/models/Dto";
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
  currentPosition.hard_skills.forEach((skill) => {
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {`${defaultData.firstName} ${defaultData.lastName}`}
            </Text>
            <Text style={styles.position}>{currentPosition.title}</Text>
          </View>

          {/* Career Objective */}
          {currentPosition.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.bulletPoint}>{currentPosition.summary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {defaultData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {defaultData.experience.map(
                (exp, index) =>
                  exp && (
                    <View key={index} style={{ marginBottom: 15 }}>
                      <Text style={styles.jobTitle}>{exp.position}</Text>
                      {exp.company && (
                        <Text style={styles.company}>{exp.company}</Text>
                      )}
                      <View style={styles.dateLocation}>
                        <Text>{`${exp.start} - ${
                          exp.finish || "Present"
                        }`}</Text>
                        {exp.location && <Text>{exp.location}</Text>}
                      </View>
                      {exp.deliverables?.map(
                        (deliverable, deliverableIndex) =>
                          deliverable && (
                            <Text key={deliverableIndex} style={styles.subitem}>
                              • {deliverable.deliverable}
                            </Text>
                          )
                      )}
                    </View>
                  )
              )}
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

          {/* Education */}
          {defaultData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {defaultData.education.map(
                (edu, index) =>
                  edu && (
                    <View key={index} style={styles.educationItem}>
                      <Text style={styles.company}>{edu.university}</Text>
                      {edu.diploms.map(
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
                    <View key={groupTitle} style={styles.skillList}>
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
        </View>
      </Page>
    </Document>
  );
};
