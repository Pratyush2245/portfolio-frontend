import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Image from "next/image";

type Props = {
  blogs: any;
};

const BlogSection = ({ blogs }: Props) => {
  console.log(blogs);

  return (
    <>
      {blogs && (
        <BentoGrid className="max-w-6xl mx-auto -mt-6">
          {blogs.map((blog: any, index: number) => (
            <BentoGridItem
              key={index}
              title={blog.title}
              description={blog.description}
              header={blog.categories}
              isBlog={true}
              author={blog?.user}
              createdAt={blog.createdAt}
              href={`/blog/${blog?._id}`}
              icon={
                <Image
                  src={blog?.blogThumbnail?.url}
                  alt=""
                  objectFit="cover"
                  width={400}
                  height={200}
                  className="rounded-md"
                />
              }
              className={`cursor-pointer z-10 ${
                index === 3 || index === 6
              } ? "md:col-span-2" : ""`}
            />
          ))}
        </BentoGrid>
      )}
    </>
  );
};

export default BlogSection;
