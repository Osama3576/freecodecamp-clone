'use client';
import Image from 'next/image';
import Link from 'next/link';
function BlogCard({ id, mainHeading, imageSrc, date, author }) {
  // Convert the buffer data to base64-encoded string

  return (
    <div className="grid  w-full grid-cols-1 md:grid-cols-[1.5fr,2fr] gap-4 md:gap-8 mx-auto  md:w-[835px] md:max-w-[835px] md:h-[220px] p-4">
      {/* Image */}
      <div className="relative w-full h-52 md:h-auto">
        <Link href={`/blog/${id}`}>
          <Image
            src={imageSrc}
            className="object-cover md:object-contain h-52 w-96 md:h-auto"
            alt="Picture of the author"
            fill={true}
          />
        </Link>
      </div>
      {/* {headings} */}
      <div className="flex flex-col justify-between">
        <Link href={`/blog/${id}`}>
          <h1 className="text-3xl font-semibold">{mainHeading}</h1>
        </Link>
        <div className="flex items-center justify-between">
          <h3>{author}</h3>
          <h3>{`${date}`}</h3>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
