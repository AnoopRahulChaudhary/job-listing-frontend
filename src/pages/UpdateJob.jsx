import { useState, useEffect } from "react";
import { getJob, updateJob } from "../api/job";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateJob.module.css";

function UpdateJob() {
  const [skill, setSkill] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    logoUrl: "",
    jobPosition: "",
    monthlySalary: "",
    jobType: "",
    isRemote: "",
    location: "",
    jobDescription: "",
    aboutCompany: "",
    skills: [],
    information: "",
  });
  const [oldSkills, setOldSkills] = useState([]);

  const jobId = window.location.pathname.split("/").pop();

  const navigate = useNavigate();

  function handleOnChange(e) {
    setJobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value,
    });
  }

  function handleOnChangeForSkill(e) {
    setSkill(e.target.value);
  }

  function handleOnKeyDown(e) {
    if (!skill) {
      return;
    }

    if (e.key == "Enter") {
      {
        const skillAlreadyAdded = jobDetails.skills.some(
          (addedSkill) =>
            addedSkill.toLowerCase() === skill.trim().toLowerCase()
        );
        if (skillAlreadyAdded) {
          return;
        }

        const updatedSkills = [...jobDetails.skills, skill.trim()];
        setJobDetails({
          ...jobDetails,
          skills: updatedSkills,
        });

        setSkill("");
      }
    }
  }

  async function handleOnClickForUpdateJob(e) {
    console.debug(`job details to add : ${JSON.stringify(jobDetails)}`);
    const { statusCode, data, errorMessage } = await updateJob(
      jobDetails,
      jobId
    );
    if (statusCode !== 200) {
      setErrorMessage(errorMessage);
      return;
    }

    setSuccessMessage(data.message);
    navigate(`/viewJob/${jobId}`);
  }

  function handleOnClickForCancel() {
    navigate(`/viewJob/${jobId}`);
  }

  async function fetchJob() {
    const { statusCode, data, errorMessage } = await getJob(jobId);
    if (statusCode !== 200) {
      setErrorMessage(errorMessage);
      return;
    }

    setOldSkills(data.job.skills);
    data.job.skills = [];
    setJobDetails(data.job);
  }

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <div>
      <section className={styles.update_job} id="jobDetailsToAdd">
        <h2 className={styles.update_job__title}>Update Job</h2>
        <form className={styles.update_job__form}>
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="companyName"
            value={jobDetails.companyName}
          />

          <label htmlFor="logoUrl">Logo Url</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="logoUrl"
            value={jobDetails.logoUrl}
          />

          <label htmlFor="jobPosition">Job Position</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="jobPosition"
            value={jobDetails.jobPosition}
          />

          <label htmlFor="monthlySalary">Monthly Salary</label>
          <input
            type="number"
            onChange={handleOnChange}
            name="monthlySalary"
            value={jobDetails.monthlySalary}
          />

          <label htmlFor="jobType">Job Type</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="jobType"
            value={jobDetails.jobType}
          />

          <label htmlFor="isRemote">Remote/Office</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="isRemote"
            value={jobDetails.isRemote}
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="location"
            value={jobDetails.location}
          />

          <label htmlFor="jobDescription">Job Description</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="jobDescription"
            value={jobDetails.jobDescription}
          />

          <label htmlFor="aboutCompany">About Company</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="aboutCompany"
            value={jobDetails.aboutCompany}
          />

          <label htmlFor="skills">Skills Required</label>
          <input
            type="text"
            onChange={handleOnChangeForSkill}
            onKeyDown={handleOnKeyDown}
            name="aboutCompany"
            value={skill}
          />
          {jobDetails.skills.length !== 0 && (
            <div className={styles.update_job__new_skills}>
              New Skills :
              {jobDetails.skills.map((skill) => (
                <span>{skill} &nbsp;,</span>
              ))}
            </div>
          )}

          {oldSkills.length !== 0 && (
            <div className={styles.update_job__old_skills}>
              Old Skills -{" "}
              {oldSkills.map((skill) => (
                <span>{skill} &nbsp;,</span>
              ))}
            </div>
          )}

          <label htmlFor="information">Information</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="information"
            value={jobDetails.information}
          />
        </form>
        <button
          className={styles.btn_update_job}
          onClick={handleOnClickForCancel}
        >
          Cancel
        </button>
        <button
          className={styles.btn_update_job__cancel}
          onClick={handleOnClickForUpdateJob}
        >
          Update Job
        </button>
      </section>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
}

export default UpdateJob;
