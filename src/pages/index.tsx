import { useTheme } from "next-themes";
import Image from "next/image";
import LogoLight from "~/assets/logos/passport-long-light.svg";
import LogoDark from "~/assets/logos/passport-long-dark.svg";
import { CameraIcon, GlobeIcon, PeopleIcon } from "~/assets/icons";
import { StickyScroll } from "~/components/home/stick-scroll";
import Footer from "~/components/home/footer";
import Callout from "~/components/home/callout";
import { Header, ScrollCard } from "~/components/home/container-scroll";
import Link from "next/link";
import { Avatar, Button, Card } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

const DATA = [
  {
    title: "Track Your Travels with Ease",
    desc: "With Passport, easily track your travel locations, share your experiences, and view statistics on your travel history.",
    icon: GlobeIcon,
  },
  {
    title: "Share Your Adventures with Friends",
    desc: "We make it easy to share your travel adventures with friends and family, allowing them to follow along and be inspired by your journeys.",
    icon: PeopleIcon,
  },
  {
    title: "Relive Your Greatest Moments",
    desc: "Your memories, your way. Upload photos and preserve the moments you want to cherish forever. It's more than a log; it's a digital vault for your travel tales.",
    icon: CameraIcon,
  },
];

export default function Home() {
  const { resolvedTheme } = useTheme();

  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex w-full items-center justify-center p-2">
        <Image
          src={resolvedTheme === "light" ? LogoLight : LogoDark}
          alt="logo"
          width={172.47457632}
          height={32}
        />
        <Link href="/login" className="absolute right-4">
          <Button
            color="default"
            variant="faded"
            size="sm"
            className="bg-[#6DBE45]"
          >
            Login
          </Button>
        </Link>
      </div>

      <div
        className="relative w-full flex-1 overflow-scroll bg-gradient-to-b from-transparent to-foreground-100"
        ref={containerRef}
      >
        {/* hero */}
        <div className="flex w-full flex-col">
          <div className="relative flex h-[80rem] items-center justify-center p-20">
            <div
              className="relative w-full py-40"
              style={{
                perspective: "1000px",
              }}
            >
              <Header
                translate={translate}
                titleComponent={
                  <>
                    <h1 className="text-4xl font-semibold text-black dark:text-white">
                      Unleash the power of <br />
                      <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                        Scroll Animations
                      </span>
                    </h1>
                  </>
                }
              />
              <ScrollCard rotate={rotate} translate={translate} scale={scale} />
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-4">
          <Link href="/@zoeylang" className="">
            <Card className="flex flex-col items-center gap-4 p-8 text-2xl font-semibold sm:px-16">
              <div className="flex items-center gap-4">
                <Avatar
                  isBordered
                  radius={"full"}
                  size="md"
                  src="https://headsupfortails.com/cdn/shop/articles/Cat_s_Mind_x630.jpg?v=1624444348"
                />
                <h1>Check out a example profile</h1>
              </div>
              <Button
                color="default"
                variant="faded"
                size="sm"
                className="bg-[#6DBE45] px-12"
              >
                visit @zoeylang
              </Button>
            </Card>
          </Link>
        </div>

        {/* block components */}
        <div className="flex w-full flex-col justify-evenly p-10 sm:flex-row sm:p-16">
          {DATA.map(({ title, desc, icon: Icon }, idx) => (
            <div
              key={idx}
              className="flex flex-1 flex-col items-center gap-2 p-4 text-center sm:gap-6 md:p-8"
            >
              <Icon className="h-8 w-8" />
              <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
              <p className="text-sm md:text-base">{desc}</p>
            </div>
          ))}
        </div>

        {/* <div className="w-full"> */}
        <StickyScroll />
        {/* </div> */}

        <Callout />
        <Footer />
      </div>
    </div>
  );
}
