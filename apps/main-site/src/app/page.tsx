import dynamic from "next/dynamic";
import Loading from "./loading";

const LandingVideo = dynamic(
  () =>
    import("./_components/landing/landing-video").then(
      (mod) => mod.LandingVideo,
    ),
  { loading: () => <Loading /> },
);

const EventsSection = dynamic(
  () =>
    import("./_components/events/events-section").then(
      (mod) => mod.EventsSection,
    ),
  {
    loading: () => <Loading />,
  },
);

const SponsersSection = dynamic(
  () =>
    import("./_components/sponsers/sponsers-section").then(
      (mod) => mod.SponsersSection,
    ),
  {
    loading: () => <Loading />,
  },
);

const MapSection = dynamic(
  () =>
    import("./_components/location-map/map-section").then(
      (mod) => mod.MapSection,
    ),
  {
    loading: () => <Loading />,
  },
);

const BrochureSection = dynamic(
  () =>
    import("./_components/brochure/brochure-section").then(
      (mod) => mod.BrochureSection,
    ),
  {
    loading: () => <Loading />,
  },
);

export default async function Home() {
  return (
    <main className="">
      <LandingVideo />
      <EventsSection />     
      <SponsersSection />
      <MapSection />
      <BrochureSection />
    </main>
  );
}
