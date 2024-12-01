import EventsList from "@/components/EventsList";
import Title from "@/components/Title";
import { EventoEvent } from "@/lib/types";

type EventsPageProps = {
  params: Promise<{
    city: string;
  }>;
};

export default async function EventsPage({ params }: EventsPageProps) {
  const { city } = await params;

  const res = await fetch(
    "https://bytegrad.com/course-assets/projects/evento/api/events?city=austin",
  );

  const events: EventoEvent[] = await res.json();

  return (
    <main className="flex min-h-[110dvh] flex-col items-center px-[20px] py-24">
      <Title>
        {city === "all" && "All Events"}
        {city !== "all" &&
          `Events is ${city.charAt(0).toUpperCase() + city.slice(1)}`}
      </Title>

      <EventsList events={events} />
    </main>
  );
}
