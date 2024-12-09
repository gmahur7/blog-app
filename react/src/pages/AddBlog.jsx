import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from "../services/baseurl";
import toast from "react-hot-toast";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async()=>{
    if(!title || !description){
      setError(true);
      return;
    }
    try {
      const {data} = await api.post('/api/blogs',{title,description},{
        headers:{
          Authorization:`Bearer token`   // TODO: set token here
        }
      })
      if(data.success){
        toast.success("Blog Uploaded Successfully!")
        setTitle('')
        setDescription('')
      }
    } catch (error) {
      console.log("error in blog upload: ",error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-[92vh] flex items-center justify-center bg-gray-100">
    <div className="w-4/5 px-8 py-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col space-y-1 mb-6">
        <label className="text-xl font-semibold text-gray-800">Title:</label>
        <input
          type="text"
          className="w-full sm:w-3/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title..."
        />
        {error&&!title&& <p className="text-red-600 ml-1">Please enter title first!</p>}
      </div>
      <div className="flex flex-col space-y-1 mb-2">
        <label className="text-lg font-semibold text-gray-800">Description: </label>
        <ReactQuill theme="snow" value={description} onChange={setDescription} />
        {error&&!description&& <p className="text-red-600 ml-1">Please enter title first!</p>}
      </div>
      <div className="mt-8">
        <button onClick={handleSubmit} className="bg-sky-400 px-8 py-3 rounded-lg border-2 border-sky-400 hover:bg-sky-500 hover:border-sky-600">Post</button>
      </div>
    </div>
  </div>
  
  );
};

export default AddBlog;
