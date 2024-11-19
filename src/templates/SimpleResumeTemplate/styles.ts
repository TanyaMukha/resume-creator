// styles.ts
import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "row" as const,
    backgroundColor: "#ffffff",
    padding: 30,
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
  section: {
    marginBottom: 15,
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
  bulletPoint: {
    // marginLeft: 15,
    fontSize: 10,
    marginBottom: 3,
  },
  subitem: {
    marginLeft: 15,
    fontSize: 10,
    marginBottom: 3,
  },
  educationItem: {
    marginBottom: 10,
  },
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
  languageItem: {
    fontSize: 10,
    marginLeft: 15,
    marginBottom: 3,
  },
});
