import { useNavigate } from "react-router-dom";
import styles from "./PartialJobDetails.module.css";

function PartialJobDetails({ companyName, title, skills, jobId }) {
  const navigate = useNavigate();

  function handleOnCLick() {
    navigate(`/viewJob/${jobId}`);
  }

  return (
    <div className={styles.partial_job_details}>
      <h2>{companyName}</h2>
      <h3>{title}</h3>
      Skill :
      <ul>
        {skills.map((skill) => (
          <li>{skill}</li>
        ))}
      </ul>
      <button onClick={handleOnCLick}>View Details</button>
    </div>
  );
}

export default PartialJobDetails;
