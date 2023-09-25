import LandingPage from "./pages/LandingPage";
import Blogs from "./pages/Blogs";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-center bg-yellow-200 min-h-screen">
      <div className="flex flex-col w-[90%] justify-items-center">
        <main>
          <Toaster />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/blogs"
              element={<Blogs search={search} setSearch={setSearch} />}
            />
            <Route path="/blogs/:id" element={<EditBlogPage />} />
            <Route path="/create-blog" element={<CreateBlogPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
