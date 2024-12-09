import { useState, useEffect } from "react";
import api from "../services/baseurl";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSearchCircle } from "react-icons/io5";

const Blogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(location?.state?.page || 1);
  const [pages, setPages] = useState(0);
  const [searchText, setSearchText] = useState(
    location?.state?.searchText || ""
  );
  const [searchState, setSearchState] = useState(
    location?.state?.searchState || "server"
  );

  // console.log(location.state);

  useEffect(() => {
    getBlogs();
  }, [page]);

  const [allBlogs, setAllBlogs] = useState([]);

  async function getBlogs() {
    if (searchState === "server") {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/api/blogs?page=${page}&limit=9&text=${searchText}`,
          {
            headers: {
              Authorization: `Bearer token`,
            },
          }
        );

        if (data.success) {
          setBlogs(data.data);
          setAllBlogs(data.data);
          setPages(data.totalPages);
        }
      } catch (error) {
        console.log("Error in getting blogs: ", error);
        toast.error(error.response?.data?.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    } else {
      if (!searchText) {
        setBlogs(allBlogs);
        return;
      }

      const filteredBlogs = allBlogs.filter((blog) => {
        const searchWords = searchText.toLowerCase().split(" ");

        return searchWords.some(
          (word) =>
            (blog.title && blog.title.toLowerCase().includes(word)) ||
            (blog.description && blog.description.toLowerCase().includes(word))
        );
      });

      setBlogs(filteredBlogs);
    }
  }

  useEffect(() => {
   
    if (searchState === "server") {
      getBlogs();
    } else {
      console.log(searchText,page,searchState)
      async function fetchAllBlogs() {
        try {
          const { data } = await api.get(
            `/api/blogs?page=${page}&limit=9&text=${searchText}`,
            {
              headers: {
                Authorization: `Bearer token`,
              },
            }
          );

          if (data.success) {
            setBlogs(data.data);
            setAllBlogs(data.data);
            setPages(data.totalPages);
          }
        } catch (error) {
          console.log("Error fetching all blogs: ", error);
          toast.error("Failed to load blogs");
        }
          finally{
            setLoading(false)
          }
      }
      fetchAllBlogs();
    }
  }, [searchState]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full px-8 py-8 ">
        {loading ? (
          <div className="h-[92vh] flex justify-center items-center">
            <div
              className="relative w-1 h-1 rounded-full bg-[#25b09b] animate-spinDots"
              style={{
                "--d": "22px",
                boxShadow: `
              calc(1 * var(--d)) 0 0 #25b09b, 
              calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 #25b09b, 
              0 calc(1 * var(--d)) 0 #25b09b, 
              calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 #25b09b, 
              calc(-1 * var(--d)) 0 0 #25b09b, 
              calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 #25b09b, 
              0 calc(-1 * var(--d)) 0 #25b09b
            `,
              }}
            ></div>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex gap-4">
              <input
                type="text"
                placeholder="Search here..."
                className="border border-gray-300 rounded-md w-2/6 h-10 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search"
              />

              <select
                value={searchState}
                onChange={(e) => {
                  setSearchState(e.target.value);
                  setSearchText("");
                }}
                className="border border-gray-300 rounded-md w-2/6 sm:w-1/6 h-10 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="server">Globally</option>
                <option value="client">Screenly</option>
              </select>

              <button
                className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="Search"
                onClick={getBlogs}
              >
                <IoSearchCircle className="text-2xl" />
              </button>
            </div>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.length !== 0 &&
                blogs.map((blog, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() =>
                      navigate(`/blog/${blog._id}`, {
                        state: { searchText, page, searchState },
                      })
                    }
                  >
                    <h3 className="text-xl font-bold text-gray-800 truncate">
                      {blog?.title}
                    </h3>
                    <p
                      className="text-gray-600 mt-2 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: blog?.description }}
                    ></p>

                    <button
                      onClick={() =>
                        navigate(`/blog/${blog._id}`, {
                          state: { searchText, page, searchState },
                        })
                      }
                      className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Read More →
                    </button>
                  </div>
                ))}
              {blogs.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  No blogs found matching your search criteria.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12">
              <button
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-l-md hover:bg-gray-300"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">{`${page} of ${pages}`}</span>
              <button
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-r-md hover:bg-gray-300"
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
