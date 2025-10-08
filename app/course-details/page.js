"use client";

import { useState, useEffect, Suspense } from "react";
import Course from "@/components/coursedisplay/Course";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";

const CourseDetailsContent = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => {
    if (!search) return;

    const fetchContent = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.API}/getsinglecourse/${search}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        setError(error.message || "An error occurred!");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Course course={content} loading={loading} />
    </>
  );
};

const ContentViewPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <CourseDetailsContent />
    </Suspense>
  );
};

export default ContentViewPage;
