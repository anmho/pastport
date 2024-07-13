import { motion } from "framer-motion";
// @ts-ignore no type def exists.
import move from "lodash-move";
import Image from "next/image";
import { useState } from "react";

const initialTrips = [
  {
    title: "Netherlands",
    latitude: 52.132633,
    longitude: 5.291266,
    countryCode: "NLD",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1680028256635-17e7f3ebbb23?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Jul 1, 2023",
  },
  {
    title: "Irvine",
    latitude: 33.645329,
    longitude: -117.840446,
    countryCode: "USA",
    imageUrl:
      "https://collegevine.imgix.net/9988b81c-a33b-452a-bfe7-a6a6de92f888.jpg",
    date: "Aug 7, 2024",
  },
  {
    title: "New York City",
    latitude: 40.712776,
    longitude: -74.005974,
    countryCode: "USA",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673643157179-c2dd8ea503d7?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8fDA%3D",
    date: "Sep 5, 2022",
  },

  {
    title: "Bali",
    latitude: -8.340539,
    longitude: 115.091949,
    countryCode: "IDN",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1668883188861-39974ed9ad99?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    date: "Sep 9, 2023",
  },

  {
    title: "Hong Kong",
    latitude: 22.3193,
    longitude: 114.1694,
    countryCode: "CHN",
    imageUrl:
      "https://images.unsplash.com/photo-1576788369575-4ab045b9287e?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9uZyUyMGtvbmd8ZW58MHx8MHx8fDA%3D",
    date: "Jul 4, 2023",
  },
  {
    title: "Netherlands",
    latitude: 52.132633,
    longitude: 5.291266,
    countryCode: "NLD",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1680028256635-17e7f3ebbb23?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Jul 1, 2023",
  },
  {
    title: "Yosemite",
    latitude: 37.8651,
    longitude: 119.5383,
    countryCode: "USA",
    imageUrl:
      "https://images.unsplash.com/photo-1562310503-a918c4c61e38?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9zZW1pdGUlMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
    date: "Jul 4, 2023",
  },
  {
    title: "Paris, France",
    latitude: 48.8566,
    longitude: 2.3522,
    countryCode: "FRA",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1677343985901-33e9cd84fd9b?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXMlMjBmcmFuY2V8ZW58MHx8MHx8fDA%3D",
    date: "Jul 4, 2023",
  },
  {
    title: "San Francisco",
    latitude: 37.7749,
    longitude: -122.4194,
    countryCode: "USA",
    imageUrl:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwZ2F0ZXxlbnwwfHwwfHx8MA%3D%3D",
    date: "Jul 4, 2023",
  },
];

const TRIPS = initialTrips.map((trip) => trip.imageUrl);

const CARD_OFFSET = 0;
const SCALE_FACTOR = 0.05;

// random integer between min and max

export const CardStack = () => {
  const [cards, setCards] = useState(TRIPS);

  const moveToEnd = (from: number) => {
    setCards(move(cards, from, cards.length - 1));
  };

  return (
    <div className="relative flex items-center justify-center">
      <ul className="relative h-[286px] w-[256px]">
        {cards.map((url, index) => {
          const canDrag = index === 0;
          if (index > 7 && index !== cards.length - 1) return;

          return (
            <motion.li
              key={url}
              className="absolute h-[256px] w-[256px] origin-[top_center] select-none overflow-clip rounded-md shadow-small [list-style:none]"
              style={{
                top: `${0.005 * (cards.length - index) ** 4}px`,
                cursor: "grab",
              }}
              animate={{
                left: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: cards.length - index,
              }}
              drag={canDrag ? "x" : false}
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={1}
              onDragEnd={() => moveToEnd(index)}
              onClick={() => moveToEnd(index)}
            >
              <Image
                draggable={false}
                src={cards[index]!}
                alt=""
                fill
                priority
              />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
