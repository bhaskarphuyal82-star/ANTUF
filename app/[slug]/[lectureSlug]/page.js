
"use Client";
import LecturePageClient from "./LecturePageClient";

// Generate metadata for this page
export async function generateMetadata({ params }) {
  try {
    const { slug, lectureSlug } = await params;
    
    // Fetch curriculum data for metadata
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/accordion/${lectureSlug}`,
      {
        method: "GET",
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      return {
        title: "Lecture Not Found",
        description: "The requested lecture could not be found."
      };
    }

    const data = await response.json();
    
    // Extract lecture from curriculum data
    let lecture = null;
    if (data?.sections) {
      for (const section of data.sections) {
        const foundLecture = section.lectures?.find(l => l.slug === lectureSlug);
        if (foundLecture) {
          lecture = foundLecture;
          break;
        }
      }
    }
    
    if (!lecture) {
      return {
        title: "Lecture Not Found",
        description: "The requested lecture could not be found."
      };
    }
    
    // Extract lecture information
    const lectureTitle = lecture.title || lecture.name || `Lecture: ${lectureSlug}`;
    const courseTitle = data.title || data.name || slug;
    const fullTitle = `${lectureTitle} - ${courseTitle}`;
    
    const lectureDescription = lecture.description || lecture.content?.substring(0, 160) || 
      `Learn ${lectureTitle} in this comprehensive tutorial as part of the ${courseTitle} course.`;
    
    const cleanDescription = lectureDescription.replace(/<[^>]*>/g, '').substring(0, 160);
    
    return {
      title: fullTitle,
      description: cleanDescription,
      openGraph: {
        title: fullTitle,
        description: cleanDescription,
        type: "article",
        url: `https://tutorialsmaterial.com/${slug}/${lectureSlug}`,
        images: [
          {
            url: lecture.image || data.image || "/images/lecture-default.jpg",
            width: 1200,
            height: 630,
            alt: lectureTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description: cleanDescription,
        images: [lecture.image || data.image || "/images/lecture-default.jpg"],
      },
      alternates: {
        canonical: `https://tutorialsmaterial.com/${slug}/${lectureSlug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Lecture",
      description: "Learn programming with comprehensive tutorials and exercises."
    };
  }
}

const ContentViewPage = ({ params }) => {
  return <LecturePageClient params={params} />;
};

export default ContentViewPage;
