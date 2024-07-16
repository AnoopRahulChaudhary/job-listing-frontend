import { useNavigate } from "react-router-dom";

function PartialJobDetails({companyName, title, skills, jobId}) {
    const navigate = useNavigate();

    function handleOnCLick() {
        navigate(`/viewJob/${jobId}`);
    }

    return (
        <div style={{margin: "16px", border: "1px solid black", padding: "16px"}}>
            <h2>{companyName}</h2>
            <h3>{title}</h3>
            Skill : 
            <ul>
                {skills.map(skill => <li>{skill}</li>)}
            </ul>
            <button onClick={handleOnCLick}>View Details</button>
        </div>
    )
}

export default PartialJobDetails;