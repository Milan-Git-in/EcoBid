"use client";
import { useState, useEffect } from "react";
import Hero from "@/Components/Hero";
import Loader from "@/Components/Loader";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div>
      <Hero />
    </div>
  );
}
