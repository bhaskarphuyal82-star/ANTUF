"use client";

import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import CurriculumEditor from "@/components/CurriculumEditor/CurriculumEditor";

const ContentCreate = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <CurriculumEditor />
    </Suspense>
  );
};

export default ContentCreate;
