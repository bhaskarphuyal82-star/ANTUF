"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ContentDisplay = dynamic(() => import("@/components/contentdisplay/ContentDisplay"), {
  ssr: false
});

// Helper function to extract specific lecture from curriculum data
const extractLectureFromCurriculum = (curriculumData, lectureSlug) => {
  if (!curriculumData?.sections) return null;
  
  for (const section of curriculumData.sections) {
    const lecture = section.lectures?.find(lecture => lecture.slug === lectureSlug);
    if (lecture) {
      return lecture;
    }
  }
  return null;
};

const LecturePageClient = ({ params: promiseParams }) => {
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
        console.log("NEXT_PUBLIC_API:", process.env.NEXT_PUBLIC_API);
        
        // Try to encode the lecture slug to handle special characters
        const encodedLectureSlug = encodeURIComponent(params.lectureSlug);
        console.log("Encoded lecture slug:", encodedLectureSlug);
        console.log("API URL:", `${process.env.NEXT_PUBLIC_API}/accordion/${encodedLectureSlug}`);
        
        // Fetch the curriculum data using the accordion API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/accordion/${encodedLectureSlug}`,
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
              `${process.env.NEXT_PUBLIC_API}/accordion/${params.lectureSlug}`,
              { method: "GET" }
            );
            
            if (fallbackResponse.ok) {
              const data = await fallbackResponse.json();
              console.log("Curriculum data received (fallback):", data);
              
              // Extract the specific lecture from the curriculum data
              const extractedLecture = extractLectureFromCurriculum(data, params.lectureSlug);
              if (extractedLecture) {
                setContent(extractedLecture);
                return;
              }
            }
          }
          
          throw new Error(`Failed to fetch lecture content: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Curriculum data received:", data);
        
        // Extract the specific lecture from the curriculum data
        const extractedLecture = extractLectureFromCurriculum(data, params.lectureSlug);
        if (extractedLecture) {
          setContent(extractedLecture);
        } else {
          throw new Error("Lecture not found in curriculum sections");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [params]);

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!content || !params) return null;

    return {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "name": content.title || `Lecture: ${params.lectureSlug}`,
      "description": content.description || content.content?.substring(0, 160) || "",
      "url": `https://tutorialsmaterial.com/${params.slug}/${params.lectureSlug}`,
      "learningResourceType": "Tutorial",
      "educationalLevel": "Beginner to Advanced",
      "inLanguage": "en",
      "author": {
        "@type": "Organization",
        "name": "TutorialsMaterial"
      },
      "provider": {
        "@type": "Organization", 
        "name": "TutorialsMaterial",
        "url": "https://tutorialsmaterial.com"
      },
      "isPartOf": {
        "@type": "Course",
        "name": params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      }
    };
  };

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
      {content && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData()),
          }}
        />
      )}
      <ContentDisplay content={content} loading={loading} />
    </>
  );
};

export default LecturePageClient;
