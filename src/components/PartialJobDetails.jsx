function PartialJobDetails({companyName, title, skills}) {
    return (
        <div style={{margin: "16px"}}>
            <h2>{companyName}</h2>
            <h3>{title}</h3>
            Skill : 
            <ul>
                {skills.map(skill => <li>{skill}</li>)}
            </ul>
        </div>
    )
}

export default PartialJobDetails;