import NavBar from '@/app/components/NavBar';
import QueryContext from '@/context/QueryContext';

function BlogLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default BlogLayout;
