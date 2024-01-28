import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { MapView } from "~/components/mapview";
import { ProfileBarWrapper } from "~/components/profile/profile-bar-wrapper";
import ProfileDrawer from "~/components/profile/profile-drawer";
import { ProfileProvider } from "~/components/profile/profile-provider";
import { TimelineSlider } from "~/components/profile/timeline-slider";
import { type Trip } from "~/models/trip";
import { redirect } from "~/utils/redirect";

type Props = { username: string; showProfile: boolean };

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

const photos = [
  ...initialTrips.map((trip) => trip.imageUrl),
  ...initialTrips.map((trip) => trip.imageUrl),
  {
    title: "Netherlands",
    latitude: 52.132633,
    longitude: 5.291266,
    countryCode: "NLD",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1680028256635-17e7f3ebbb23?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Jul 1, 2023",
  },
];

export const getServerSideProps = (async ({ params, query, res }) => {
  const username = String(params?.username ?? "");
  const showProfile = query?.profile !== undefined;

  if (!username.startsWith("@")) redirect(res, "/404");

  // TODO: check if user exusts

  return { props: { username, showProfile } };
}) satisfies GetServerSideProps<Props>;

const ProfilePage = ({
  username,
  showProfile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  return (
    <ProfileProvider initialState={{ showProfile, username }}>
      <MapView trips={trips} />
      <ProfileBarWrapper />
      <TimelineSlider photos={photos} />
      <ProfileDrawer />
    </ProfileProvider>
  );
};

export default ProfilePage;
