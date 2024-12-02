import EventsList from "@/components/EventsList";
import Title from "@/components/Title";
import { Suspense } from "react";
import Loading from "./loading";

type EventsPageProps = {
  params: Promise<{
    city: string;
  }>;
};

export default async function EventsPage({ params }: EventsPageProps) {
  const { city } = await params;

  return (
    <main className="flex min-h-[110dvh] flex-col items-center px-[20px] py-24">
      <Title className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" &&
          `Events is ${city.charAt(0).toUpperCase() + city.slice(1)}`}
      </Title>

      <Suspense fallback={<Loading />}>
        <EventsList city={city} />
      </Suspense>
    </main>
  );
}
