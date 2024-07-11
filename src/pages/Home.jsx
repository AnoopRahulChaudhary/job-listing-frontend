import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      Home Page
      <br />
      <Link to="register">Register</Link>
      <br />
      <Link to="login">Login</Link>
      <br />
      <Link to="viewJob">View Job</Link>
      <br />
      <Link to="updateJob">Update Job</Link>
      <br />
      <Link to="addJob">Add Job</Link>
      <br />
    </div>
  );
}

export default Home;
