import { FC } from "react";
import PlusOneIcon from "@mui/icons-material/PlusOne";

interface AddItemIconProps {
    onClick?: () => void
}

export const AddItemIcon: FC<AddItemIconProps> = ({ onClick }) => {
    return (
        <PlusOneIcon
        sx={{
          fontSize: 40,
          color: "rgba(0, 0, 0, 0.6)",
          cursor: "pointer",
          "&: hover": { color: "#0f5cc2" },
        }}
        onClick={onClick}
      />
    );
  };