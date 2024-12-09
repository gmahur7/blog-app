import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddBlog from "./pages/AddBlog";
import Blogs from "./pages/Blogs";
import { Toaster } from "react-hot-toast";
import SingleBlog from "./pages/SingleBlog";
import Header from "./components/Header";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <div className="">
        <div>
          <Header
          />
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
