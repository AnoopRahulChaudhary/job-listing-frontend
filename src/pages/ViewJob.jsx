import { useEffect } from "react";
import { deleteJob, getJob } from "../api/job";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ViewJob() {
  const [errorMessage, setErrorMessage] = useState("");
  const [job, setJob] = useState();
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  const jobId = window.location.pathname.split("/").pop();

  function handleUpdateJobClick() {
    navigate(`/updateJob/${jobId}`);
  }

  async function handleDeleteJobClick() {
    const { statusCode, data, errorMessage } = await deleteJob(jobId);
    if (statusCode !== 200) {
      setErrorMessage(errorMessage);
      return;
    }

    navigate("/");
  }

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser({ username });
    }
  }, []);

  useEffect(() => {
    fetchJob();
  }, []);

  async function fetchJob() {
    const { statusCode, data, errorMessage } = await getJob(jobId);
    if (statusCode !== 200) {
      setErrorMessage(errorMessage);
      return;
    }

    setJob(data.job);
  }

  return (
    <div>
      <Header />
      {errorMessage && <span>{errorMessage}</span>}
      {job && (
        <div>
          <div
            style={{
              border: "1px solid black",
              margin: "16px",
              padding: "16px",
            }}
          >
            {job.jobDescription}
          </div>
          <div style={{ border: "1px solid black", padding: "16px" }}>
            <h2>{job.jobPosition}</h2>
            <p>{job.location}</p>
            <div>Stipend : {job.monthlySalary}</div>
            <div>
              <h6>About Company</h6>
              <p>{job.aboutCompany}</p>
            </div>
            <div>
              <h6>Skills</h6>
              <ul>
                {job.skills && job.skills.map((skill) => <li>{skill}</li>)}
              </ul>
            </div>

            {currentUser && (
              <button onClick={handleUpdateJobClick}>Update Job</button>
            )}
            {currentUser && (
              <button onClick={handleDeleteJobClick}>Delete Job</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewJob;
