import { Link, Stack, Typography } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import gitHubIcon from "../../../../assets/github.svg";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "../../../../assets/linkedin.svg";
import { ContactDto } from "../../../../database/models/Dto";
import { ContactType } from "../../../../database/models/enums";

interface ContactElementProps {
  item: ContactDto;
}

export default function ContactElement(props: ContactElementProps) {
  const { item } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ marginBottom: "4px" }}
    >
      {icons.find((i) => i.key === item.type)?.node}
      {item?.type && getLink(item)}
    </Stack>
  );
}

const icons = [
  {
    key: ContactType.Phone,
    node: <PhoneAndroidIcon />,
  },
  {
    key: ContactType.Email,
    node: <MailOutlineIcon height={22} />,
  },
  {
    key: ContactType.GitHub,
    node: <img src={gitHubIcon} width={24} height={24} />,
  },
  {
    key: ContactType.Location,
    node: <PlaceIcon />,
  },
  {
    key: ContactType.LinkedIn,
    node: <img src={LinkedInIcon} width={24} height={24} />,
  },
];

const getLink = (item: ContactDto) => {
  switch (item.type) {
    case ContactType.Email:
      return (
        <Link href={`mailto:${item.value}`} underline="hover">
          {item.title}
        </Link>
      );
    case ContactType.Phone:
      return (
        <Link href={`tel:${item.value}`} underline="hover">
          {item.title}
        </Link>
      );
    case ContactType.Location:
      return <Typography>{item.title}</Typography>;
    default:
      return (
        <Link href={item.value} underline="hover">
          {item.title}
        </Link>
      );
  }
};
