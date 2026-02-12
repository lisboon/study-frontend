"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="bg-white absolute top-0 left-0 w-full h-full z-0">
        <Image
          className="w-full h-full object-cover object-center-[10%]"
          src="/images/hero.jpeg"
          alt="Hero Image"
          width={1920}
          height={1080}
        />
      </div>
    </section>
  );
}
