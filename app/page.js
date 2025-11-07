// import Image from "next/image";
"use client";
import styles from "./page.module.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar"
import TapNav from "@/components/navbar/topnav/topnav"

import ArticlesGrid from "@/components/Article/Article"
import Home from "@/components/home/Home"
import VideoContent from "@/components/home/video";

export default function HomePage() {
	return (
		<div>
			{/* <TapNav/> */}
			<Navbar />
		
			 <Home/>

			
				<ArticlesGrid />
				<VideoContent />
	
			
			<Footer />
		</div>
	);
}
