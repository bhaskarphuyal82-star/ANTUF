"use client";

import ArticleEditor from "@/components/ArticleEditor/ArticleEditor";
import { Suspense } from "react";

const ContentCreate = () => {
  return (
    <>
      <Suspense fallback={<div>Loading article editor...</div>}>
        <ArticleEditor />
  
      </Suspense>
    </>
  );
};

export default ContentCreate;
