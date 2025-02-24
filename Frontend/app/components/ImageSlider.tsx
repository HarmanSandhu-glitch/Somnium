"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/image-slider";

export function ImagesSliderDemo() {
  const images = [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <div className="w-[95%] overflow-hidden">
      <ImagesSlider className="h-[80rem] overflow-hidden" images={images}>
        <motion.div
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col rounded-[70px] overflow-hidden justify-center items-center"
        ></motion.div>
      </ImagesSlider>
    </div>
  );
}
