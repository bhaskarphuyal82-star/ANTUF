import CoursePageClient from "./CoursePageClient";

// Generate metadata for this page
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    
    // Fetch course data for metadata
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/content/${slug}`,
      {
        method: "GET",
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      return {
        title: "Course Not Found",
        description: "The requested course could not be found."
      };
    }

    const data = await response.json();
    
    // Extract course information
    const courseTitle = data.title || data.name || `Course: ${slug}`;
    const courseDescription = data.description || data.content?.substring(0, 160) || 
      `Learn ${courseTitle} with comprehensive tutorials and hands-on exercises.`;
    
    const cleanDescription = courseDescription.replace(/<[^>]*>/g, '').substring(0, 160);
    
    return {
      title: courseTitle,
      description: cleanDescription,
      openGraph: {
        title: courseTitle,
        description: cleanDescription,
        type: "article",
        url: `https://tutorialsmaterial.com/${slug}`,
        images: [
          {
            url: data.image || "/images/course-default.jpg",
            width: 1200,
            height: 630,
            alt: courseTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: courseTitle,
        description: cleanDescription,
        images: [data.image || "/images/course-default.jpg"],
      },
      alternates: {
        canonical: `https://tutorialsmaterial.com/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Course",
      description: "Learn programming with comprehensive tutorials and exercises."
    };
  }
}

const ContentPage = ({ params }) => {
  return <CoursePageClient params={params} />;
};

export default ContentPage;
