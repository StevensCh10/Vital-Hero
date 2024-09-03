interface CustomStyles {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
}

const customStyles: CustomStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.1)",
    backdropFilter: "blur(1px)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "440px",
    minHeight: "120px",
    borderRadius: "2%",
    backgroundColor: "white",
    color: "black",
    padding: 0,
    margin: "auto",
  },
};

export default customStyles;
