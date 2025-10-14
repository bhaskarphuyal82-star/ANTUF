"use client";

import MonacoEditor from "@monaco-editor/react";
import React, { Suspense, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TranslateIcon from "@mui/icons-material/Translate";
import MenuIcon from "@mui/icons-material/Menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Tabs from "@/components/tab/Tab";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";

const defaultCode = {
  python: 'print("Hello, Python!")',
  r: '# R code example\ncat("Hello, R!\n")',
  sql: 'SELECT "Hello, SQL!";',
  "html-css": '<h1>Hello, HTML/CSS!</h1>',
  javascript: "console.log('Hello, JavaScript!')",
  typescript: "console.log('Hello, TypeScript!')",
  java: 'public class Main { public static void main(String[] args) { System.out.println("Hello, Java!"); } }',
  c: '#include <stdio.h>\nint main() { printf("Hello, C!\\n"); return 0; }',
  cpp: '#include <iostream>\nint main() { std::cout << "Hello, C++!" << std::endl; return 0; }',
  csharp: 'using System; class Program { static void Main() { Console.WriteLine("Hello, C#!"); } }',
  go: 'package main\nimport "fmt"\nfunc main() { fmt.Println("Hello, Go!") }',
  php: '<?php echo "Hello, PHP!"; ?>',
  swift: 'print("Hello, Swift!")',
  rust: 'fn main() { println!("Hello, Rust!"); }',
  ruby: 'puts "Hello, Ruby!"'
};

const languageIcons = {
  python: '/images/icons/python.png',
  javascript: '/images/icons/javascript.png',
  cpp: '/images/icons/cpp.png',
  java: '/images/icons/java.png',
  c: '/images/icons/c.png',
  csharp: '/images/icons/csharp.png',
  go: '/images/icons/go.png',
  php: '/images/icons/php.png',
  swift: '/images/icons/swift.png',
  rust: '/images/icons/rust.png',
  ruby: '/images/icons/ruby.png',
  r: '/images/icons/r.png',
  sql: '/images/icons/sql.png',
  typescript: '/images/icons/typescript.png',
  'html-css': '/images/icons/htmlcss.png',
  reactjs: '/images/icons/logo_light.svg',
};

const languageMap = {
  python: "python",
  r: "r",
  sql: "sql",
  "html-css": "html",
  javascript: "javascript",
  typescript: "typescript",
  java: "java",
  c: "c",
  cpp: "cpp",
  csharp: "csharp",
  go: "go",
  php: "php",
  swift: "swift",
  rust: "rust",
  ruby: "ruby",
  reactjs: "reactjs",
};

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const JUDGE0_API_KEY = process.env.NEXT_PUBLIC_JUDGE0_API_KEY;

export default function CompilerPage({ params }) {
  const { compiler } = React.use(params);
  const [code, setCode] = useState(defaultCode[compiler] || "console.log('Hello!')");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const toggleDrawer = () => {};

  const languageIdMap = {
    python: 71,
    cpp: 54,
    c: 50,
    java: 62,
    javascript: 63,
    typescript: 74,
    csharp: 51,
    go: 60,
    php: 68,
    swift: 83,
    rust: 73,
    ruby: 72,
    r: 80,
    sql: 82,
  };

  const runCode = async () => {
    setError("");
    setLoading(true);
    setOutput("");
    if (compiler === "javascript" || compiler === "reactjs") {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(code);
        setOutput(result === undefined ? "(Check console output)" : String(result));
      } catch (err) {
        setOutput("Error: " + err.message);
      }
      setLoading(false);
    } else if (languageIdMap[compiler]) {
      try {
        const response = await fetch(JUDGE0_API_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": JUDGE0_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: languageIdMap[compiler],
          }),
        });
        const result = await response.json();
        let outputText = "";
        if (result.stdout) outputText += result.stdout;
        if (result.stderr) outputText += "\nError: " + result.stderr;
        if (result.compile_output) outputText += "\nCompile Output: " + result.compile_output;
        if (!outputText) outputText = "No output.";
        setOutput(outputText);
      } catch (err) {
        setError("Failed to execute code. Please try again.");
        setOutput("");
      }
      setLoading(false);
    } else {
      setOutput("Code execution for this language is not supported.");
      setLoading(false);
    }
  };

  return (
    <>
    {/* Google Analytics */}
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      `}
    </Script>
    {/* Google Search Console Verification */}
    <meta name="google-site-verification" content="YOUR_SEARCH_CONSOLE_VERIFICATION_CODE" />
    <Head>
      <title>Online Multi-Language Code Compiler</title>
      <meta name="description" content="Practice and run code in Python, JavaScript, C++, Java, ReactJS, and more. Modern online code editor and compiler platform." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Your Name or Organization" />
      <meta name="keywords" content="online compiler, code editor, python, javascript, c++, java, reactjs, judge0, monaco editor" />
      {/* Add favicon and other meta tags as needed */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <div style={{ background: '#181A20', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2, borderBottom: '1px solid #23272F', background: '#23272F' }}>
          <Box display="flex" alignItems="center">
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/images/logo2.png" alt="Logo" style={{ height: 38, width: 20, marginRight: 16, borderRadius: 8, cursor: 'pointer' }} />
            </Link>
            <span style={{ fontWeight: 600, fontSize: 20 }}>
              Online {compiler ? compiler.charAt(0).toUpperCase() + compiler.slice(1) : "Programming"} Editor
            </span>
          </Box>
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
            
              
              <Select
                value={compiler}
                onChange={e => window.location.href = `/compilers/${e.target.value}`}
                variant="outlined"
                sx={{ background: '#23272F', color: '#fff', borderRadius: 2, fontSize: 15, minWidth: 140, boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 'none' }, ml: 1 }}
                MenuProps={{ PaperProps: { sx: { background: '#23272F', color: '#fff' } } }}
              >
                {Object.keys(languageMap).map(lang => (
                  <MenuItem key={lang} value={lang} 
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.2 }}>
                    <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                      <img src={languageIcons[lang]} alt={lang} style={{ width: 24, height: 24, borderRadius: 6, background: '#23272F', marginLeft: 8 }} />
                      <ListItemText primary={lang.charAt(0).toUpperCase() + lang.slice(1)} />
                 
                      
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {status === "authenticated" ? (
              session?.user?.image && (
                <img
                  src={session?.user?.image || "/images/pic1.png"}
                  alt="User Avatar"
                  style={{ width: "50px", height: "50px", borderRadius: "50%", cursor: "pointer", marginLeft: 12 }}
                  onClick={() =>
                    router.push(
                      session?.user?.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    )
                  }
                />
              )
            ) : (
              <button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 18px', fontWeight: 600, fontSize: 15, marginLeft: 12 }} onClick={() => setLoginOpen(true)}>Sign In</button>
            )}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      		<Tabs />
      <div style={{ display: 'flex', gap: 24, padding: '2rem', justifyContent: 'center' }}>
        <div style={{ background: '#23272F', borderRadius: 12, flex: '0 0 48%', maxWidth: '48%', boxShadow: '0 2px 16px #0002', padding: '1.5rem 1rem', minHeight: 500 }}>
          
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: '#FFD600' }}>Code Editor</div>
          <MonacoEditor
            height="400px"
            language={languageMap[compiler] || "javascript"}
            value={code}
            onChange={value => setCode(value)}
            theme="vs-dark"
            options={{ fontSize: 16, minimap: { enabled: false } }}
            style={{ borderRadius: 8 }}
          />
          <button onClick={runCode} style={{ fontSize: 16, padding: "8px 24px", borderRadius: 4, background: "#1976d2", color: "#fff", border: "none", marginTop: 16 }} disabled={loading}>
            {loading ? "Running..." : "Run Code"}
          </button>
        </div>
        <div style={{ background: '#23272F', borderRadius: 12, flex: '0 0 48%', maxWidth: '48%', boxShadow: '0 2px 16px #0002', padding: '1.5rem 1rem', minHeight: 500, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: '#FFD600' }}>Output</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: output ? 'flex-start' : 'center', background: '#181A20', borderRadius: 8, minHeight: 40, padding: 12 }}>
            {error && <div style={{ color: "#FF5252" }}>{error}</div>}
            {output ? <pre style={{ margin: 0, color: "#fff", fontSize: 15 }}>{output}</pre> : <div style={{ color: '#888', textAlign: 'center', width: '100%' }}><span style={{ fontSize: 32 }}>⏱️</span><br />Run your code to see the output here...</div>}
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
