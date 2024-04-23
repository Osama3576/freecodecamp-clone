'use client';
import getAllBlogs from '@/actions/getAllblogs';
import { useQuery } from '@tanstack/react-query';
import { Circles } from 'react-loader-spinner';
import Image from 'next/image';
import { useState } from 'react';
function BlogContent({ params }) {
  const { isLoading, data } = useQuery({
    queryKey: ['blog'],
    queryFn: getAllBlogs,
  });

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

  const blog = data?.data.filter(blog => blog._id === params.id);

  const imageData = blog[0]?.image.data.data;
  const imageSrc = `data:${
    blog[0]?.image.contentType
  };base64,${Buffer.from(imageData)
    .toString('base64')
    .substring(19)
    .slice(0, -1)}`;
  return (
    <div className="absolute top-[7rem] w-full h-full">
      <div className="max-w-[1060px] mx-auto pb-20 px-4">
        <h1 className="my-10 text-4xl font-medium">
          {blog[0].mainHeading}
        </h1>

        <div className="mb-10">
          <Image
            src={imageSrc}
            width={1000}
            height={500}
            className="object-cover md:object-contain md:h-auto"
            alt="Picture of the author"
          />
        </div>

        {blog[0].sections.map(section => {
          return (
            <div className="" key={section._id}>
              <h2 className="my-6 text-3xl font-medium">
                {section.subHeading}
              </h2>
              <p className="text-2xl max-w-[50rem]">
                {section.paragraph}
              </p>
              {section.codeSnippet?.length > 0 && (
                <pre>{section.codeSnippet}</pre>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogContent;
