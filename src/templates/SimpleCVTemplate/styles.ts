import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  // Layout
  page: {
    flexDirection: "column" as const,
    backgroundColor: "#ffffff",
    padding: 30,
  },
  twoColumns: {
    flexDirection: "row" as const,
    backgroundColor: "#ffffff",
    gap: 20,
  },
  leftColumn: {
    flexGrow: 2,
    flexBasis: 0,
  },
  rightColumn: {
    flexGrow: 1,
    flexBasis: 0,
  },

  // Common
  section: {
    marginBottom: 15,
    minHeight: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 3,
    marginBottom: 10,
    textTransform: "uppercase" as const,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
  },
  subitem: {
    marginLeft: 15,
    fontSize: 10,
    marginBottom: 3,
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
  },

  // Header
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  position: {
    fontSize: 18,
    color: "#8B0000",
    marginTop: 5,
  },

  // Contacts
  contactRow: {
    flexDirection: "row" as const,
    marginTop: 10,
    flexWrap: "wrap" as const,
    gap: 15,
  },
  contactItem: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    fontSize: 10,
    gap: 5,
  },
  contactText: {
    fontSize: 10,
    color: "#444444",
  },
  contactLink: {
    fontSize: 10,
    color: "#0077B5",
    textDecoration: "none",
  },

  // Experience
  experienceBlock: {
    marginBottom: 15,
    minHeight: 40,
  },
  experienceHeader: {
    marginBottom: 5,
  },
  experienceDescription: {
    fontSize: 10,
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  company: {
    fontSize: 12,
    color: "#8B0000",
  },
  dateLocation: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    fontSize: 10,
    color: "#666666",
    marginTop: 2,
    marginBottom: 5,
  },

  // Projects
  projectBlock: {
    marginLeft: 10,
    minHeight: 40,
    marginBottom: "12px",
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#8B0000",
  },
  projectDescription: {
    fontSize: 10,
    marginBottom: 3,
  },
  projectTitleBold: {
    fontWeight: "bold",
  },
  technologies: {
    fontSize: 9,
    fontStyle: "italic",
    marginTop: 5,
  },

  // Other Projects
  otherProjectsBlock: {
    marginBottom: 8,
    minHeight: 40,
  },
  otherProjectsTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#8B0000",
  },
  otherProjectItemWrapper: {
    flexDirection: "row",
    marginLeft: 10,
    marginBottom: 2,
  },
  otherProjectItem: {
    fontSize: 10,
    flex: 1,
  },
  otherProjectsList: {
    fontSize: 10,
    marginLeft: 10,
  },

  // Deliverables
  deliverableTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 3,
  },
  deliverableItem: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },

  // Education
  educationItem: {
    marginBottom: 10,
  },

  // Skills
  skillsSection: {
    marginTop: 5,
  },
  skillCategory: {
    fontSize: 12,
    color: "#8B0000",
    marginBottom: 3,
  },
  skillList: {
    marginBottom: 8,
  },
  skillItem: {
    fontSize: 10,
    marginLeft: 15,
  },

  // Languages
  languageItem: {
    fontSize: 10,
    marginBottom: 3,
  },

  // Highlights
  highlightItem: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 3,
  },

  // References
  referencesSection: {
    marginTop: 5,
  },
  referenceItem: {
    marginBottom: 10,
  },
  referenceName: {
    fontSize: 11,
    fontWeight: "bold",
  },
  referencePosition: {
    fontSize: 10,
    marginTop: 2,
    color: "#666666",
  },
  referenceContact: {
    fontSize: 10,
    marginTop: 1,
    color: "#444444",
  },

  // Certificates
  certificateBlock: {
    marginBottom: 8,
  },
  certificateHeader: {
    marginBottom: 2,
  },
  certificateTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1a0dab",
    textDecoration: "none",
  },
  certificateDetails: {
    marginLeft: 10,
  },
  certificateIssuer: {
    fontSize: 10,
    color: "#666666",
  },
  certificateDate: {
    fontSize: 10,
    color: "#666666",
  },
  credentialId: {
    fontSize: 9,
    color: "#666666",
    fontStyle: "italic",
  },
});