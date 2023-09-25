import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import axios from "axios";

const CreateBlogPagePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    try {
      const item = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(item);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post("/api/blogs/create", { title, content }, config);
      toast.success("Added blog successfully!");
      navigate("/blogs");
    } catch (error) {
      toast.error("Error occured!");
      console.log(error.message);
    }
  };

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold text-blue-500 bg-yellow-200 my-3">
        Create a blog
      </h1>
      <form action="" className="flex flex-col gap-2" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="text-lg font-semibold text-blue-500 bg-yellow-200"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2 w-[50%] h-10"
          />
          <label
            htmlFor="title"
            className="text-lg font-semibold text-blue-500 bg-yellow-200"
          >
            Content
          </label>
          <textarea
            id="content"
            type="text"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-2 w-[50%] h-20"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            onSubmit={submitHandler}
            className="border-solid border-2 bg-yellow-300 font-semibold border-blue-500 text-blue-700 rounded-md py-1 px-2 my-2 w-[9%]"
          >
            Create
          </button>
          <button
            type="button"
            onClick={resetHandler}
            className="border-solid border-2 bg-yellow-300 font-semibold border-blue-500 text-blue-700 rounded-md py-1 px-2 my-2 w-[9%]"
          >
            Reset
          </button>
        </div>
      </form>
      <h2 className="text-2xl font-semibold text-blue-500 bg-yellow-200 my-3">
        Preview
      </h2>
      {title && <h3 className="text-2xl my-1 mx-2">{title}</h3>}
      {content && (
        <ReactMarkdown className="text-lg my-1 mx-2">{content}</ReactMarkdown>
      )}
    </div>
  );
};

export default CreateBlogPagePage;
