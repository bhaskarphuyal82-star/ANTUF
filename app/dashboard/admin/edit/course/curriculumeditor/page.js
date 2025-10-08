"use client";

import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import CurriculumCourseEditor from "@/components/CurriculumCourseEditor/CurriculumCourseEditor";
import Sidebar from "@/components/sidebar/SideBar";

const CourseCreate = () => {
  return (
    <>
      <Sidebar />
      <Suspense fallback={<CircularProgress />}>
        <CurriculumCourseEditor />
      </Suspense>
    </>
  );
};

export default CourseCreate;
