import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  SxProps,
  Theme,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";

import styles from "./Accordion.module.scss";
import { classNames } from "../../helpers/classNames";
import { ExpandMore } from "@mui/icons-material";

export interface AccordionPlusProps {
  title?: string;
  classes?: { summary?: string; details?: string };
  // eslint-disable-next-line react/no-unused-prop-types
  dafaultExpanded?: boolean;
  children: JSX.Element;
  onClickDeleteIcon?: () => void;
  onClickCloneIcon?: () => void;
  className?: string;
  classNameRoot?: string;
  sx?: SxProps<Theme>;
  withConfirm?: boolean;
}
const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#540352",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#540352",
    color: "#FFFFFF",
    fontFamily: "DM Sans",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center",
    padding: "8px 8px",
  },
}));
export const AccordionPlus: FC<AccordionPlusProps> = ({
  title = "Title",
  classes,
  onClickDeleteIcon,
  onClickCloneIcon,
  children,
  dafaultExpanded = true,
  className,
  classNameRoot,
  sx,
}) => {
  const [del, setDel] = useState<boolean>(false);
  const [openCopyTool, setOpenCopyTool] = useState(false);
  const [openDeleteTool, setOpenDeleteTool] = useState(false);

  useEffect(() => {
    del && onClickDeleteIcon && setTimeout(onClickDeleteIcon, 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del]);

  useEffect(() => {
    setDel(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, title]);

  return (
    <>
      <Accordion
        className={classNames(
          styles.accordion,
          del ? styles.delete : "",
          classNameRoot
        )}
        defaultExpanded={dafaultExpanded}
        sx={sx}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          classes={{
            content: styles.summary,
            expandIconWrapper: styles.summary_icon,
            root: styles.summary_root,
          }}
          className={classNames(classes?.summary, className)}
        >
          <Typography fontWeight="bold" className={styles.capitalizeWords}>
            {title}
          </Typography>
          <div>
            {onClickCloneIcon && (
              <StyledTooltip
                title="Dupliquer l'œuvre"
                placement="top"
                open={openCopyTool}
                onMouseEnter={() => setOpenCopyTool(true)}
                onMouseLeave={() => setOpenCopyTool(false)}
              >
                <ContentCopyIcon
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClickCloneIcon();
                  }}
                  className={classNames(
                    styles.deleteButton,
                    styles.cloneButton
                  )}
                />
              </StyledTooltip>
            )}
            {onClickDeleteIcon && (
              <StyledTooltip
                title="Supprimer l'œuvre"
                placement="top"
                open={openDeleteTool}
                onMouseEnter={() => setOpenDeleteTool(true)}
                onMouseLeave={() => setOpenDeleteTool(false)}
              >
                <DeleteOutlinedIcon
                  viewBox="4 0 16 24"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDel(true);
                  }}
                  className={styles.deleteButton}
                />
              </StyledTooltip>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails
          className={classNames(styles.details, classes?.details)}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
