import { useEffect } from "react";
import { deleteJob, getJob } from "../api/job";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "./ViewJob.module.css";

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
        <div className={styles.job}>
          <div>
            <h3>Role</h3>
            <p>{job.jobPosition}</p>
          </div>
          <div>
            <h3>Description</h3>
            <p>{job.jobDescription}</p>
          </div>
          <div>
            <h3>Location</h3>
            <p>{job.location}</p>
          </div>
          <div>
            <h3>Salary</h3>
            <p>{job.monthlySalary} $</p>
          </div>
          <div>
            <h3>About Company</h3>
            <p>{job.aboutCompany}</p>
          </div>
          <div>
            <h3>Skills</h3>
            <ul>{job.skills && job.skills.map((skill) => <li>{skill}</li>)}</ul>
          </div>

          {currentUser && (
            <button
              className={styles.btn__job_update}
              onClick={handleUpdateJobClick}
            >
              Update Job
            </button>
          )}
          {currentUser && (
            <button
              className={styles.btn__job_delete}
              onClick={handleDeleteJobClick}
            >
              Delete Job
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewJob;
