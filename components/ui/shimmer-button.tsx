"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
            "--shimmer-duration": shimmerDuration,
            "--border-radius": borderRadius,
            "--background": background,
          } as React.CSSProperties
        }
        className={cn(
          // base styles
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white [border-radius:var(--border-radius)] [background:var(--background)]",
          // shimmer effect
          "before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] before:[background:conic-gradient(from_var(--shimmer-angle,0deg),transparent_0_340deg,var(--shimmer-color)_360deg)] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:xor] before:[animation:shimmer_var(--shimmer-duration)_linear_infinite]",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}

        {/* Shimmer effect */}
        <div
          className="absolute -top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rotate-12 transform bg-white/30 blur-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            animation: "shimmer 2s infinite",
          }}
        />

        <style jsx>{`
          @keyframes shimmer {
            0% {
              --shimmer-angle: 0deg;
            }
            100% {
              --shimmer-angle: 360deg;
            }
          }
        `}</style>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
