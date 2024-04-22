interface CustomStylesRight {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
}

const customStylesRight: CustomStylesRight = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0)",
    backdropFilter: "blur(.1px)",
    zIndex: "9999",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    width: "160px",
    height: "150px",
    borderRadius: "2%",
    backgroundColor: "white",
    color: "black",
    boxShadow: "-8px 4px 12px rgba(0, 0, 0, 0.4)",
    padding: 0,
  },
};

export default customStylesRight;
