"use client";

import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const BlocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);

  const coverPage = useCallback(
    (url: string) => {
      if (!logoRef.current || !logoOverlayRef.current) return;

      const path = logoRef.current.querySelector("path");
      if (!path) return;

      const tl = gsap.timeline({
        onComplete: () => router.push(url),
      });

      tl.to(BlocksRef.current, {
        scaleX: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out",
        transformOrigin: "left",
      })
        .set(logoOverlayRef.current, { opacity: 1 }, "-=0.2")
        .set(
          path,
          {
            strokeDashoffset: path.getTotalLength(),
            fill: "transparent",
          },
          "-=0.25"
        )
        .to(
          path,
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          path,
          {
            fill: "#e3e4d8",
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(logoOverlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
    },
    [router]
  );

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      BlocksRef.current = [];

      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current.appendChild(block);
        BlocksRef.current.push(block);
      }
    };

    createBlocks();

    gsap.set(BlocksRef.current, { scaleX: 0, transformOrigin: "left" });

    if (logoRef.current) {
      const path = logoRef.current.querySelector("path");
      if (path) {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
        });
      }
    }

    revealPage();

    const handleRouteChange = (url: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    };

    const handleClick = (e: Event) => {
      e.preventDefault();

      const target = e.currentTarget;
      if (!(target instanceof HTMLAnchorElement)) return;

      const href = target.href;
      const url = new URL(href).pathname;

      if (url !== pathName) {
        handleRouteChange(url);
      }
    };

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [router, pathName, coverPage]);

  const revealPage = () => {
    gsap.set(BlocksRef.current, { scaleX: 1, transformOrigin: "right" });

    gsap.to(BlocksRef.current, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="transition-overlay fixed inset-0 flex pointer-events-none z-10"
      ></div>
      <div
        ref={logoOverlayRef}
        className="logo-overlay fixed inset-0 z-10 flex items-center justify-center bg-[#222] pointer-events-none opacity-0"
      >
        <div className="logo-container w-[200px] h-[200px] flex items-center justify-center p-5">
          <Logo ref={logoRef} />
        </div>
      </div>

      {children}
    </>
  );
};

export default PageTransition;
