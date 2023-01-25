export const flexCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const flexSpaceBetween = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
export const flexSpaceEvenly = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};
export const flexSpaceAround = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
};
export const flexAlignFlexStart = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
};
export const flexAlignFlexEnd = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-around",
};
export const flexItemCenterStart = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
};
export const patternContainerStyle = {
  flexGrow: 1,
  bgcolor: "#FFFFFF",
  height: "7.4rem",
  ml: 5,
  borderRadius: 1.5,
  px: 2,
  boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)",
  position: "relative",
  border: ".05rem solid #DBDCDF",
};
export const graphContainerStyle = {
  mt: 5,
  bgcolor: "#FFFFFF",
  border: ".05rem solid #DBDCDF",
  borderRadius: 1.5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const selectPropContainerStyle = {
  width: "100%",
  height: "7.2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
};
export const moreOptionStyle = {
  position: "absolute",
  color: "black",
  top: "-.2rem",
  right: "-0.5rem",
};
export const inputBoxConStyle = {
  width: "100%",
  height: "7.2rem",
  display: "flex",
  alignItems: "center",
  flexGraw: 1,
  justifyContent: "center",
  flexDirection: "column",
};
export const firstInputComStyle = {
  position: "relative",
  "&::after": {
    content: '""',
    height: "1.5rem",
    width: "1.5rem",
    bgcolor: "#DBDCDF",
    top: "102%",
    left: `calc(50% - .7rem)`,
    position: "absolute",
    borderRadius: "50%",
    // bgcolor: "green",
  },
};
export const secondInputComStyle = {
  "&::after": {
    content: '""',
    height: "1.5rem",
    width: "1.5rem",
    bgcolor: "#DBDCDF",
    top: `calc(50% - .75rem)`,
    left: `100%`,
    position: "absolute",
    borderRadius: "50%",
  },
};
export const thirdInputComStyles = {
  "&::after": {
    content: '""',
    height: "1.49rem",
    width: "1.49rem",
    top: `calc(50% - .75rem)`,
    right: `100.5%`,
    position: "absolute",
    borderRadius: "50%",
    bgcolor: "#DBDCDF",
  },
};
export const lineArrowStyles = {
  fontSize: "medium",
  bgcolor: "#FFFFFF",
  p: 0,
  color: "#e5eaf1",
};
export const horizentalLineStyles = {
  flexGrow: 1,
  height: ".1rem",
  background: "#DBDCDF",
  ...flexCenter,
  justifyContent: "flex-end",
  postion: "relative",
};
export const firstInputLineStyles = {
  "&::before": {
    content: '""',
    height: "2.5rem",
    width: ".1rem",
    bgcolor: "#DBDCDF",
    top: "100%",
    left: "50%",
    position: "absolute",
  },
};
export const inputAndSelectPlaceContainer = {
  border: ".005rem solid #DBDCDF",
  borderRadius: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  height: "2.2rem",
};
export const actualInputStyles = {
  height: "1.6rem",
  width: "15rem",
  border: "none",
  outline: "none",
  paddingLeft: ".7rem",
  "&::placeholder": {
    fontSize: ".7rem",
  },
  "&:disabled": {
    background: "white",
    cursor: "not-allowed",
  },
};
export const popModalContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};
export const Controls = {
  width: "100%",
  height: "9rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
};
export const patternContainerStyles = {
  flexGrow: 0,
  bgcolor: "#FFFFFF",
  height: "7.4rem",
  width: "14rem",
  borderRadius: 1.5,
  px: 2,
  boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)",
  border: ".05rem solid #DBDCDF",
};
export const unUsedNodeStyleProp = {
  border: ".05rem solid #DBDCDF",
  bgcolor: "#ffffff",
};
export const nodeBCircleStyleProp = {
  content: '""',
  height: "1.5rem",
  width: "1.5rem",
  bgcolor: "#DBDCDF",
  top: "102%",
  left: `calc(50% - .7rem)`,
  position: "absolute",
  borderRadius: "50%",
};
export const nodeACircleStyleProp = {
  content: '""',
  height: "1.5rem",
  width: "1.5rem",
  bgcolor: "#DBDCDF",
  top: `calc(50% - .75rem)`,
  left: `100%`,
  position: "absolute",
  borderRadius: "50%",
};
export const nodeCCircleStyleProp = {
  content: '""',
  height: "1.49rem",
  width: "1.49rem",
  bgcolor: "#ffffff",
  top: `calc(50% - .75rem)`,
  right: `100.5%`,
  position: "absolute",
  borderRadius: "50%",
  border: ".05rem solid #DBDCDF",
};
