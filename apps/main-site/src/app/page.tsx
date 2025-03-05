import dynamic from "next/dynamic";
import { Loader } from "./_components/loader/loader";

const Landing = dynamic(
  () => import("./_components/landing/landing").then((mod) => mod.Landing),
  {
    loading: () => <Loader />,
  },
);

const EventsSection = dynamic(
  () =>
    import("./_components/events/events-section").then(
      (mod) => mod.EventsSection,
    ),
  {
    loading: () => <Loader />,
  },
);

const SponsersSection = dynamic(
  () =>
    import("./_components/sponsers/sponsers-section").then(
      (mod) => mod.SponsersSection,
    ),
  {
    loading: () => <Loader />,
  },
);

const MapSection = dynamic(
  () =>
    import("./_components/location-map/map-section").then(
      (mod) => mod.MapSection,
    ),
  {
    loading: () => <Loader />,
  },
);

const BrochureSection = dynamic(
  () =>
    import("./_components/brochure/brochure-section").then(
      (mod) => mod.BrochureSection,
    ),
  {
    loading: () => <Loader />,
  },
);

export default async function Home() {
  return (
    <main className="">
      <Landing />
      <EventsSection />
      <SponsersSection />
      <MapSection />
      <BrochureSection />
    </main>
  );
}
