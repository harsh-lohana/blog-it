import { Link } from "react-router-dom";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";

const Blogs = ({ search, setSearch }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBlogs = async () => {
    setLoading(true);
    const item = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(item);
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/blogs", config);
    if (data) {
      data.reverse();
      setBlogs(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="bg-yellow-200 min-h-screen">
      <Navbar search={search} setSearch={setSearch} />
      <h1 className="text-4xl font-semibold text-blue-500 bg-yellow-200 my-3">
        Your blogs
      </h1>
      <Link
        to="/create-blog"
        className="border-solid border-2 bg-yellow-300 font-semibold border-blue-500 text-blue-700 rounded-md py-1 px-2 my-2 w-[8%]"
      >
        Add new blog
      </Link>
      <div className="flex flex-col gap-1 mt-4">
        {loading ? (
          <Loader />
        ) : (
          blogs
            .filter(
              (filteredBlog) =>
                filteredBlog.title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                filteredBlog.content
                  .toLowerCase()
                  .includes(search.toLowerCase())
            )
            .map((blog) => {
              return (
                <Card
                  key={blog._id}
                  title={blog.title}
                  content={blog.content}
                  id={blog._id}
                  date={blog.createdAt}
                  user={blog.user}
                />
              );
            })
        )}
      </div>
    </div>
  );
};

export default Blogs;
