'use client';

import BlogCard from './BlogCard';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import getAllBlogs from '@/actions/getAllblogs';
import { Circles } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
function Blogs({ searchQuery }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage; //0

  if (isLoading)
    return (
      <div className="absolute top-[7rem] w-full h-full flex items-center justify-center">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );

  const blogsData = data.data;

  const searchResults = blogsData?.filter(blog =>
    `${blog.mainHeading} `
      .toLowerCase()
      .includes(searchQuery?.toLowerCase())
  );
  const filteredBlogs =
    searchQuery?.length > 0
      ? searchResults
      : blogsData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

  const currentPosts = filteredBlogs.slice(
    indexOfFirstPost,
    indexOfLastPost
  ); // 0 - 8 = 8

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="absolute top-[7rem] w-full h-full">
      <div className="flex flex-col items-center justify-center gap-8 py-[3rem] ">
        {searchQuery?.length > 0 && (
          <h2>{`Total Posts found ${currentPosts.length}`}</h2>
        )}
        {currentPosts?.map(blog => {
          const imageData = blog.image.data.data;

          const imageSrc = `data:${
            blog.image.contentType
          };base64,${Buffer.from(imageData)
            .toString('base64')
            .substring(19)
            .slice(0, -1)}`;

          const date = formatDistanceToNow(new Date(blog.createdAt), {
            addSuffix: true,
            includeSeconds: true,
          });
          return (
            <BlogCard
              key={blog._id}
              id={blog._id}
              mainHeading={blog.mainHeading}
              imageSrc={imageSrc}
              date={date}
              author={blog?.author}
            />
          );
        })}

        {blogsData.length > 0 && (
          <div className="">
            <ReactPaginate
              onPageChange={paginate}
              pageCount={Math.ceil(
                filteredBlogs.length / postsPerPage
              )}
              previousLabel={'Prev'}
              nextLabel={'Next'}
              containerClassName={'flex gap-4 border p-2 '}
              pageLinkClassName={'page-number'}
              previousLinkClassName={'page-number'}
              nextLinkClassName={'page-number'}
              activeLinkClassName={'active'}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
