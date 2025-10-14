// import Image from "next/image";
"use client";
import styles from "./page.module.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Tabs from "@/components/tab/Tab";
import Course from "@/components/course/Course";

const compilers = [
	{ name: "Python Compiler", slug: "python" },
	{ name: "R Compiler", slug: "r" },
	{ name: "SQL Editor", slug: "sql" },
	{ name: "HTML/CSS Editor", slug: "html-css" },
	{ name: "JavaScript Compiler", slug: "javascript" },
	{ name: "TypeScript Compiler", slug: "typescript" },
	{ name: "Java Compiler", slug: "java" },
	{ name: "C Compiler", slug: "c" },
	{ name: "C++ Compiler", slug: "cpp" },
	{ name: "C# Compiler", slug: "csharp" },
	{ name: "Go Compiler", slug: "go" },
	{ name: "PHP Compiler", slug: "php" },
	{ name: "Swift Compiler", slug: "swift" },
	{ name: "Rust Compiler", slug: "rust" },
	{ name: "Ruby Compiler", slug: "ruby" },
	{ name: "ReactJS Editor", slug: "reactjs" },
];

const compilerIcons = {
	python: "/images/icons/python.png",
	r: "/images/icons/r.png",
	sql: "/images/icons/sql.png",
	"html-css": "/images/icons/htmlcss.png",
	javascript: "/images/icons/javascript.png",
	typescript: "/images/icons/typescript.png",
	java: "/images/icons/java.png",
	c: "/images/icons/c.png",
	cpp: "/images/icons/cpp.png",
	csharp: "/images/icons/csharp.png",
	go: "/images/icons/go.png",
	php: "/images/icons/php.png",
	swift: "/images/icons/swift.png",
	rust: "/images/icons/rust.png",
	ruby: "/images/icons/ruby.png",
  reactjs: "/images/icons/logo_light.svg",
};

export default function Home() {
	return (
		<div>
			<Navbar />
			<Tabs />
			<Course />
			<style>{`
        @media (max-width: 768px) {
          .compiler-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
			<div
				style={{
					background: "black",
					padding: "4rem 0 2rem 0",
					textAlign: "center",
					position: "relative",
				}}
			>
				<div
					style={{
						fontWeight: 700,
						fontSize: 36,
						color: "white",
						marginBottom: 12,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 12,
					}}
				>
					<span
						style={{
							background: "#3fa7ff",
							color: "#fff",
							borderRadius: 8,
							padding: "6px 12px",
							fontSize: 28,
						}}
					>
						🖥️
					</span>
					Practice with our Online Compilers
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 32,
					}}
				>
					<div
						className="compiler-grid"
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(4, minmax(220px, 1fr))",
							gap: "2rem",
							margin: "2rem 0",
							maxWidth: 1200,
							width: "100%",
						}}
					>
						{compilers.map((compiler) => (
							<a
								key={compiler.slug}
								href={`/compilers/${compiler.slug}`}
								style={{ textDecoration: "none" }}
							>
								<div
									style={{
										background: "#fff",
										borderRadius: 12,
										boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
										padding: "1.5rem 1rem",
										fontSize: "1.25rem",
										fontWeight: 600,
										color: "#23235b",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										cursor: "pointer",
										border: "1px solid #e3e6f0",
										transition: "box-shadow 0.15s, transform 0.15s",
										position: "relative",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.boxShadow =
											"0 4px 24px #3fa7ff33";
										e.currentTarget.style.transform = "scale(1.03)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.boxShadow =
											"0 2px 12px rgba(0,0,0,0.06)";
										e.currentTarget.style.transform = "none";
									}}
								>
									<span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
										<span style={{
											width: 44,
											height: 44,
											background: '#f5f7fa',
											borderRadius: 10,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											marginRight: 8,
											border: '1.5px solid #e3e6f0',
										}}>
											<img
												src={compilerIcons[compiler.slug]}
												alt={compiler.name}
												style={{ width: 32, height: 32, borderRadius: 6, background: 'none' }}
											/>
										</span>
										{compiler.name}
									</span>
									<span
										style={{
											fontSize: "2rem",
											marginLeft: "1rem",
											color: "#3fa7ff",
										}}
									>
										→
									</span>
								</div>
							</a>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
