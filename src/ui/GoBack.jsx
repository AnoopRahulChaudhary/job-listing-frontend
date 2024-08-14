import { useNavigate } from "react-router-dom";

function GoBack() {
  const navigate = useNavigate();

  const styles = {
    goToHome: {
      position: "fixed",
      top: "2rem",
      left: "2rem",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.goToHome} onClick={() => navigate(-1)}>
      <span> &larr; </span>
    </div>
  );
}

export default GoBack;
