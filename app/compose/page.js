import BlogForm from '../components/BlogForm';

function ComposeBlog() {
  return (
    <div className="w-full h-full  bg-slate-200">
      <div className="p-4 text-center text-white bg-black ">
        <h2>Create & Uplaoad Your blog</h2>
      </div>

      <div className="flex items-center justify-center h-full">
        <BlogForm />
      </div>
    </div>
  );
}

export default ComposeBlog;
