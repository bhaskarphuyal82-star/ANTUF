"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CreateArticlePage from "@/components/admin/Articles/CreateArticlePage";
import { Box, CircularProgress } from "@mui/material";

const ContentCreate = () => {
  const searchParams = useSearchParams();
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const articleId = searchParams.get("search");

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!articleId) {
        console.log("No articleId found in URL");
        return;
      }
      
      console.log("Fetching article with ID:", articleId);
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/Article/edit/${articleId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched article data:", data);
          setArticleData(data);
        } else {
          console.error("Failed to fetch article data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [articleId]);

  // Show loading while fetching data for edit mode
  if (articleId && (loading || !articleData)) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(145deg, #0a0f1e 0%, #0f172a 50%, #1e293b 100%)",
        }}
      >
        <CircularProgress 
          size={60}
          sx={{ 
            color: "#8b5cf6",
            filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))"
          }} 
        />
      </Box>
    );
  }

  return (
    <CreateArticlePage 
      articleId={articleId} 
      initialData={articleData}
    />
  );
};

export default ContentCreate;
