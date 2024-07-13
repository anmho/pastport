import { Card, Image, cn } from "@nextui-org/react";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ChevronIcon } from "~/assets/icons";
import { useProfile } from "~/components/profile/profile-provider";
import { useRouter } from "next/router";
import { useRef } from "react";

function getCurve(x: number, upperbound_x: number, upperbound_y: number) {
  // 32=(x^q)/(m^q) *k -( (x-1)^q)/(m^q)*k
  // https://www.wolframalpha.com/input?i=32%3D%28x%5Eq%29%2F%28x%5Eq%29+*k+-%28+%28x-1%29%5Eq%29%2F%28x%5Eq%29*k+solve+for+q
  const CONCAVITY =
    // + 4 for the border
    Math.log((upperbound_y - 32 + 4) / upperbound_y) /
    Math.log((upperbound_x - 1) / upperbound_x);
  // const CONCAVITY = 1.3;

  // concavity can be calculated as well by making it so the gap is always 0
  return (upperbound_y * x ** CONCAVITY) / upperbound_x ** CONCAVITY;
}

const WIDTH = 500;

const DRAKE =
  "https://us-tuna-sounds-images.voicemod.net/b76b232c-c50d-4704-912f-9991eb0e5513-1669755931690.jpg";

export const TimelineSlider = ({ photos }: { photos: string[] }) => {
  const router = useRouter();
  const { showProfile, setShowProfile, username, setHideProfile } =
    useProfile();

  const toggleProfile = async () => {
    if (!showProfile) setHideProfile(false);
    setShowProfile((p) => !p);
    showProfile
      ? await router.push(`${username}`)
      : await router.push(`${username}?profile`);
  };

  const currentIndex = 13;
  const mouseX = useMotionValue(Infinity);
  const cursor = useMotionValue(WIDTH);

  // let widthSync = useTransform(cursor, [0, 1000], [0, photos.length]);

  // info.point.x is 2x the pixel distance...

  // the closer
  // distance from index and currentIndex
  // the more show

  return (
    <>
      <div className="absolute bottom-0 w-full p-4">
        <Card
          className={cn(
            "relative z-20 flex h-20 w-full items-center justify-center rounded-xl p-4 transition-transform",
            showProfile ? "translate-y-40" : "translate-y-0",
          )}
        >
          <motion.div
            style={{
              width: WIDTH,
            }}
            className={cn(
              "relative h-8 rounded-sm bg-foreground-500",
              // "border-2 border-solid border-foreground",
            )}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
          >
            {photos.map((photo, i) => (
              <PhotoCard
                key={i}
                index={i}
                currentIndex={currentIndex}
                photos={photos}
                photo={photo}
                mouseX={mouseX}
              />
            ))}
          </motion.div>

          {/* <motion.div
            className="left-[calc(50% - 24px)] absolute z-50 h-12 w-12 overflow-clip rounded-md border-2 border-solid border-white bg-foreground-800"
            drag="x"
            dragConstraints={{
              left: -128,
              right: 128,
            }}
            // stiffness={100}
            onDrag={(event, info) => {
              // Update the x position while dragging
              // console.log(info.point.x);
              cursor.set(info.point.x);
            }}
          >
            <img
              src={drake}
              className=" h-full w-full object-cover"
              draggable={false}
            />
          </motion.div> */}
        </Card>

        <button
          className={cn(
            "absolute left-1/2 z-40 -translate-x-1/2 px-2 transition-[bottom]",
            showProfile ? "bottom-4 rotate-180" : "bottom-24",
          )}
          onClick={toggleProfile}
        >
          <ChevronIcon className="z-10 h-16 w-16" />
        </button>
      </div>
    </>
  );
};

type PhotoCardProps = {
  index: number;
  currentIndex: number;
  photos: string[];
  photo: string;
  mouseX: MotionValue;
};

function PhotoCard({
  index,
  currentIndex,
  photos,
  mouseX,
  photo,
}: PhotoCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const length = photos.length;
  const rightOfCursor = (_index: number) =>
    WIDTH -
    getCurve(
      Math.abs(length - _index),
      Math.abs(length - currentIndex),
      ((length - currentIndex) / length) * WIDTH,
    );
  const leftOfCursor = (_index: number) =>
    getCurve(_index, currentIndex, (currentIndex / length) * WIDTH);

  const left =
    index > currentIndex
      ? `calc(${rightOfCursor(index)}px)`
      : `calc(${leftOfCursor(index)}px)`;

  // do a check to see if the calculation is less than 2-6px end and front to not render those.
  if (index > currentIndex) {
    // if (WIDTH - rightOfCursor(index) < 6) return null;
    if (Math.abs(rightOfCursor(index) - rightOfCursor(index + 1)) < 2)
      return null;
  } else {
    // if (leftOfCursor(index) < 4) return null;
    if (Math.abs(leftOfCursor(index) - leftOfCursor(index - 1)) < 2)
      return null;
  }

  // const midway = Math.ceil(photos.length / 2);
  const distance = Math.abs(index - currentIndex);
  const zIndexCalculation = currentIndex - distance + photos.length;

  // TODO: RENDER LOW QUAL IMAGE IF NOT FULLY SHOWN

  // let widthSync =
  // useTransform(mouseX, [-150, 0, 150], [40, 100, 40]);

  // do it on hover, and debounce the navigate to country

  return (
    <div
      ref={ref}
      className={cn(
        "absolute h-8 w-8 overflow-clip bg-foreground-600",
        "rounded-[4px]",
        "z-10 border-2 border-solid",
        currentIndex === index ? "border-red-500" : "border-white",
      )}
      style={{
        zIndex: zIndexCalculation,
        left: left,
      }}
    >
      {/* <div className="absolute z-20 bg-white text-2xs text-black">
        {zIndexCalculation},{index}
      </div> */}
      <Image
        className={"aspect-square h-full w-full rounded-[4px] object-cover"}
        alt="a"
        src={photo}
      />
    </div>
  );
}
