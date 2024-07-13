import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const loginUser = localStorage.getItem("username");

  function handleLogout() {
    window.sessionStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  }

  return (
    <div>
      <header>
        <div>JobFinder</div>
        <nav>
          {!loginUser && <div><Link to="/login">Login</Link></div>}
          {!loginUser && <div><Link to="/register">Register</Link></div>}
          {loginUser && <button onClick={handleLogout}>Logout</button>}
          {loginUser && <div>Hello {loginUser}</div>}
        </nav>
      </header>

      <main>
        <section id="filterSection">
          {loginUser && <Link to="/addJob">AddJob</Link>}
        </section>

        <section id="allJobs"></section>
      </main>
    </div>
  );
}

export default Home;
