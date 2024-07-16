import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJobs } from "../api/job";
import PartialJobDetails from "../components/PartialJobDetails";

function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState({
    title: "",
    skills: [],
  });

  const loginUser = localStorage.getItem("username");

  function handleLogout() {
    window.sessionStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  }

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
      <header>
        <div>JobFinder</div>
        <nav>
          {!loginUser && (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )}
          {!loginUser && (
            <div>
              <Link to="/register">Register</Link>
            </div>
          )}
          {loginUser && <button onClick={handleLogout}>Logout</button>}
          {loginUser && <div>Hello {loginUser}</div>}
        </nav>
      </header>

      <main>
        <section id="filterSection">
          {loginUser && <Link to="/addJob">AddJob</Link>}
        </section>

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
