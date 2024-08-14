import { useEffect, useState } from "react";
import { getJobs } from "../api/job";
import PartialJobDetails from "../components/PartialJobDetails";
import Header from "../components/Header";
import Loader from "../ui/Loader";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState({
    title: "",
    skills: [],
  });
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [jobFetchError, setJobFetchError] = useState("");

  async function fetchJobs() {
    try {
      const { statusCode, data, errorMessage } = await getJobs(query);
      if (statusCode !== 200) {
        setJobFetchError("Error in fetching job.");
      } else {
        setJobs(data.jobs);
      }
      setJobFetchError("");
    } catch (error) {
      setJobFetchError("Error in fetching job.");
    } finally {
      setIsJobsLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Header />
      <main>
        {!jobFetchError && isJobsLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            <Loader />
          </div>
        )}
        {jobFetchError && <div>{jobFetchError}</div>}
        {!jobFetchError &&
          !isJobsLoading &&
          jobs &&
          jobs.map((job) => (
            <PartialJobDetails
              companyName={job.companyName}
              title={job.jobPosition}
              skills={job.skills}
              jobId={job._id}
            />
          ))}
      </main>
    </div>
  );
}

export default Home;
