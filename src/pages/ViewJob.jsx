import { useEffect } from "react";
import { getJob } from "../api/job";
import { useState } from "react";

function ViewJob() {
    const [errorMessage, setErrorMessage] = useState('');
    const [job, setJob] = useState();

    const jobId = window.location.pathname.split('/').pop();

    useEffect(() => {
        fetchJob();
    }, [])

    async function fetchJob() {
        const {statusCode, data, errorMessage} = await getJob(jobId);
        if (statusCode !== 200) {
            setErrorMessage(errorMessage);
            return;
        }

        setJob(data.job);
    }

    return <div>
        {errorMessage && <span>{errorMessage}</span>}
        {job && 
            <div>
                <div style={{border: "1 px solid black", margin:"16px", padding: "16px"}}>{job.jobDescription}</div>
                <div style={{border: "1 px solid black", padding: "16px"}}>
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
                            {job.skills && job.skills.map(skill => <li>{skill}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        }
    </div>;
}

export default ViewJob;
