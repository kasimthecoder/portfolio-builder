"use client";

import Footer from "@/components/Footer";
import CTASection from "@/components/HomePage/CTA";
import Features from "@/components/HomePage/Features";
import HomeHeroSection from "@/components/HomePage/Hero";
import ScreenshotSection from "@/components/HomePage/Screenshot";
import Navbar from "@/components/Navbar";
import { ModeToggle } from "@/components/theme-toggle";

const Home = () => {
  return (
    <div className="w-screen py-0 px-0 overflow-hidden">
      <Navbar />
      <HomeHeroSection />
      <Features />
      <ScreenshotSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
