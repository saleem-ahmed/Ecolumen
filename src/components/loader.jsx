import "../styles/globals/variables.scss";

const loader = ({ loaderValue }) => {
  return (
    <div
      style={{
        display: loaderValue === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgb(40 66 89 / 46%)",
        backdropFilter: "blur(16px)",
        zIndex: 1000,
      }}
    >
      <span className="loader"></span>
    </div>
  );
};
export default loader 