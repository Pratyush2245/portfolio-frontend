"use client";

import React from "react";
import BlogDetailPage from "../../../components/Blog/BlogDetailsPage";

type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  return (
    <div>
      <BlogDetailPage id={params.id} />
    </div>
  );
};

export default page;
