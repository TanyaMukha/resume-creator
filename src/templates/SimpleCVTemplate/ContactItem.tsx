import { Link, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ContactType } from "../../database/models/enums";

export const ContactItem = ({
  type,
  value,
}: {
  type: ContactType;
  value: string;
}) => {
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
