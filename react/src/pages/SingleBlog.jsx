import  { useEffect, useState } from "react";
import api from "../services/baseurl";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const SingleBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchText, page,searchState } = location.state || { searchText: "", page: 0,searchState:"server" };
  const params = useParams();
  const { id } = params;
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  async function getBlog() {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/blogs/blog/${id}`, {
        headers: {
          Authorization: `Bearer token`, //TODO: Set token here
        },
      });
      if (data.success) {
        setBlog(data.data);
      }
    } catch (error) {
      console.log("error in getting blog: ", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBlog();
  }, [id]);

  return (
    <div className="">
      {loading ? (
        <div></div>
      ) : (
        <div className="">
          <div className="px-3 py-2 text-xl font-bold flex items-center">
            <span className="mr-3 sm:mr-6 cursor-pointer">
              <IoArrowBack onClick={()=> navigate('/',{ state: { searchText, page,searchState } })}/>
            </span>
            <span>{blog?.title}</span>
          </div>
          <div className="px-10 py-2">
            <div  dangerouslySetInnerHTML={{ __html: blog?.description }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
