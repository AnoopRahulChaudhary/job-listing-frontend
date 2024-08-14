import { useState } from "react";
import { addJob } from "../api/job";
import { useNavigate } from "react-router-dom";
import styles from "./AddJob.module.css";

function AddJob() {
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

  async function handleOnClickForAddJob(e) {
    console.debug(`job details to add : ${JSON.stringify(jobDetails)}`);
    const { statusCode, data, errorMessage } = await addJob(jobDetails);
    if (statusCode !== 201) {
      setErrorMessage(errorMessage);
      return;
    }

    setSuccessMessage(data.message);
    navigate("/");
  }

  function handleOnClickForCancel() {
    navigate("/");
  }

  return (
    <div>
      <section className={styles.add_job} id="jobDetailsToAdd">
        <h2 className={styles.add_job__title}>Add Job description</h2>
        <form className={styles.add_job__form}>
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
            <div className={styles.job_skills}>
              {jobDetails.skills.map((skill) => (
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
        <button className={styles.btn_add_job} onClick={handleOnClickForAddJob}>
          + Add Job
        </button>
        <button
          className={styles.btn_add_job__cancel}
          onClick={handleOnClickForCancel}
        >
          Cancel
        </button>
      </section>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
}

export default AddJob;
