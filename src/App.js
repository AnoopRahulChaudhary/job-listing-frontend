import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserRegistration from "./pages/UserRegistration";
import ViewJob from "./pages/ViewJob";
import UpdateJob from "./pages/UpdateJob";
import AddJob from "./pages/AddJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job-listing-frontend" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/viewJob/:id" element={<ViewJob />} />
        <Route path="/updateJob/:id" element={<UpdateJob />} />
        <Route path="/addJob" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
