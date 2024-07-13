import { useState } from "react";

function AddJob() {
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    logoUrl: "",
    jobPosition: "",
    monthlySalary: "",
    jobType: "",
    isRemote: "",
  });

  return (
    <div>
      <section id="jobDetailsToAdd">
        <h2>Add Job description</h2>
        <div className="job-details">
          <form>
            <div>
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={jobDetails.companyName}
              />
            </div>

            <div>
              <label htmlFor="logoUrl">Logo Url</label>
              <input type="text" name="logoUrl" value={jobDetails.logoUrl} />
            </div>

            <div>
              <label htmlFor="jobPosition">Job Position</label>
              <input
                type="text"
                name="jobPosition"
                value={jobDetails.jobPosition}
              />
            </div>

            <div>
              <label htmlFor="monthlySalary">Monthly Salary</label>
              <input
                type="number"
                name="monthlySalary"
                value={jobDetails.monthlySalary}
              />
            </div>

            <div>
              <label htmlFor="jobType">Job Type</label>
              <input type="text" name="jobType" value={jobDetails.jobType} />
            </div>

            <div>
              <label htmlFor="isRemote">Remote/Office</label>
              <input type="text" name="isRemote" value={jobDetails.isRemote} />
            </div>

            <div>
              <label htmlFor="location">Location</label>
              <input type="text" name="location" value={jobDetails.location} />
            </div>

            <div>
              <label htmlFor="jobDescription">Job Description</label>
              <input
                type="text"
                name="jobDescription"
                value={jobDetails.jobDescription}
              />
            </div>

            <div>
              <label htmlFor="aboutCompany">About Company</label>
              <input
                type="text"
                name="aboutCompany"
                value={jobDetails.aboutCompany}
              />
            </div>

            <div>
              <label htmlFor="skills">Skills Required</label>
              <input
                type="text"
                name="aboutCompany"
                value={jobDetails.skills}
              />
            </div>

            <div>
              <label htmlFor="information">Information</label>
              <input
                type="text"
                name="information"
                value={jobDetails.information}
              />
            </div>
          </form>
        </div>
        <button>Cancel</button>
        <button>+ Add Job</button>
      </section>
    </div>
  );
}

export default AddJob;
