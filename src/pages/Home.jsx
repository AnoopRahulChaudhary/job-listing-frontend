import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../api/job";
import PartialJobDetails from "../components/PartialJobDetails";
import Header from "../components/Header";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState({
    title: "",
    skills: [],
  });

  async function fetchJobs() {
    const { statusCode, data, errorMessage } = await getJobs(query);
    if (statusCode !== 200) {
      console.error(`Error fetching jobs - ${errorMessage}`);
    } else {
      setJobs(data.jobs);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Header />

      <main>
        <section id="allJobs"></section>

        {jobs && jobs.map((job) => (
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
