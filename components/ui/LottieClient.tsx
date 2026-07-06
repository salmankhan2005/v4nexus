"use client";

import React from "react";
import Lottie from "lottie-react";

interface LottieClientProps {
  animationData: unknown;
  className?: string;
}

export default function LottieClient({ animationData, className }: LottieClientProps) {
  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
}
