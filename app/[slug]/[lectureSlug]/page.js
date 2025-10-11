"use client";

import { useState, useEffect } from "react";
import ContentDisplay from "@/components/contentdisplay/ContentDisplay";

const ContentViewPage = ({ params: promiseParams }) => {
  const [params, setParams] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await promiseParams;
      setParams(resolvedParams);
    };

    fetchParams();
  }, [promiseParams]);

  useEffect(() => {
    if (!params?.slug || !params?.lectureSlug) return;

    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Debug logging
        console.log("Course slug:", params.slug);
        console.log("Lecture slug:", params.lectureSlug);
        console.log("Lecture slug length:", params.lectureSlug.length);
        console.log("Lecture slug characters:", params.lectureSlug.split('').map(c => `'${c}' (${c.charCodeAt(0)})`));
        console.log("NEXT_PUBLIC_API:", process.env.NEXT_PUBLIC_API);
        
        // Check if the lecture slug ends with colon
        const hasColon = params.lectureSlug.endsWith(':');
        console.log("Lecture slug ends with colon:", hasColon);
        
        // If it doesn't have a colon, try adding one
        const lectureSlugToTry = hasColon ? params.lectureSlug : `${params.lectureSlug}:`;
        console.log("Lecture slug to try:", lectureSlugToTry);
        
        // Try to encode the lecture slug to handle special characters like ":"
        const encodedLectureSlug = encodeURIComponent(lectureSlugToTry);
        console.log("Encoded lecture slug:", encodedLectureSlug);
        console.log("API URL:", `${process.env.NEXT_PUBLIC_API}/content/${encodedLectureSlug}`);
        
        // Fetch the specific lecture using the corrected lectures parameter
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/content/${encodedLectureSlug}`,
          {
            method: "GET",
          }
        );

        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error Response:", errorText);
          
          // If the encoded version fails, try the unencoded version as fallback
          if (response.status === 404 && encodedLectureSlug !== params.lectureSlug) {
            console.log("Trying unencoded slug as fallback...");
            const fallbackResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API}/content/${params.lectureSlug}`,
              { method: "GET" }
            );
            
            if (fallbackResponse.ok) {
              const data = await fallbackResponse.json();
              console.log("Lecture data received (fallback):", data);
              setContent(data);
              return;
            }
          }
          
          throw new Error(`Failed to fetch lecture content: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Lecture data received:", data);
        setContent(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [params]);

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Error Loading Lecture</h1>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <>
      <ContentDisplay content={content} loading={loading} />
    </>
  );
};

export default ContentViewPage;
