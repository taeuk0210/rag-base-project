import { Box, type BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export type BaseBoxProps = BoxProps & {
  direction?: "row" | "column";
  scroll?: boolean;
  gap?: number;
  padding?: number;
  margin?: number;
  width?: number;
  height?: number;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
};

const BaseBox = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      "direction",
      "scroll",
      "gap",
      "padding",
      "margin",
      "align",
      "justify",
    ].includes(prop as string),
})<BaseBoxProps>(
  ({
    theme,
    direction = "column",
    scroll = false,
    height = "100%",
    width = "50%",
    gap = 0,
    padding = 0,
    margin = 0,
    align = "stretch",
    justify = "flex-start",
  }) => ({
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,

    height: height,
    width: width,
    gap: theme.spacing(gap),
    padding: theme.spacing(padding),
    margin: theme.spacing(margin),

    overflowY: scroll ? "auto" : "visible",
    scrollbarGutter: scroll ? "stable" : undefined,
  })
);

export default BaseBox;
