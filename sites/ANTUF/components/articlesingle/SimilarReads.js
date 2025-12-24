import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";
const articles = [
  {
    title:
      "How to use 'lodash' Package for Array Manipulation in a JavaScript Project?",
    description:
      "In this article, we'll look at how to use Lodash for array manipulation tasks like sorting, filtering, mapping, etc. The 'lodash' is a very important and useful npm package that provides a set of functions to work with arrays, strings, objects...",
    readTime: "4 min read",
    tags: ["JavaScript", "Lodash", "Array Manipulation"],
    link: "/article-1",
  },
  {
    title: "Lodash or Underscore - pick, pickBy, omit, omitBy",
    description:
      "Javascript is Everywhere. The Javascript is used widely and it's not limited to just only in your web browser but also widely used in the server-side as well. JavaScript is used by 95% of all the websites. Lodash or Underscore makes...",
    readTime: "2 min read",
    tags: ["JavaScript", "Lodash", "Underscore"],
    link: "/article-2",
  },
  {
    title: "Difference between lodash and Underscore",
    description:
      "The lodash and UnderScore both are utility libraries from JavaScript which helps make it easier by providing utils which makes, working with arrays, numbers, objects, and strings much easier. They provide a group of tools used for common...",
    readTime: "3 min read",
    tags: ["JavaScript", "Lodash", "Comparison"],
    link: "/article-3",
  },
  {
    title: "Node.js lodash.sortBy() Function",
    description:
      "Lodash is a module in Node.js that works on the top of underscore.js. Lodash helps in working with arrays, strings, objects, numbers, etc. The Lodash.sortBy() function is used to sort the array in ascending order. Syntax: sortBy(collection...",
    readTime: "5 min read",
    tags: ["Node.js", "Lodash", "Sort"],
    link: "/article-4",
  },
];

import readingTime from "reading-time";
const SimilarReads = ({ currentTitle, displayContent }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSimilarArticles();
  }, [currentTitle]);

  const fetchSimilarArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        title: currentTitle || "",
        category: displayContent?.category || "",
        slug: displayContent?.slug || "",
      });

      const response = await fetch(
        `${process.env.API}/Article/similarread?${params.toString()}`
      );
      const data = await response.json();

      if (data?.articles) {
        // Shuffle the articles and get first 2
        const shuffled = data.articles
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);
        setArticles(shuffled);
      }
    } catch (error) {
      console.log("Error fetching similar articles:", error);
    }
    setLoading(false);
  };

  if (loading || articles.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#212121",
        padding: 3,
        borderRadius: "8px",
        color: "#fff",
        marginTop: 4,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          fontSize: isMobile ? "18px" : "22px",
        }}
      >
        Similar Reads
      </Typography>

      {articles.map((article, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1e1e1e",
            marginBottom: 2,
            padding: 2,
            border: "2px solid white",
            borderRadius: "8px",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.01)",
            },
          }}
          onClick={() => router.push(`/post/${article?.slug}`)}
        >
          <CardContent sx={{ flex: 1, padding: "0px" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                marginBottom: 1,
                color: "#fff",
                fontSize: isMobile ? "18px" : "22px",
              }}
            >
              {article.title}
            </Typography>

           

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#aaa",
                fontSize: "12px",
              }}
            >
              <AccessTimeIcon sx={{ fontSize: "16px" }} />
              <Typography variant="caption">
                {readingTime(article?.description || article?.content || "").text}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SimilarReads;
