import EventsList from "@/components/EventsList";
import Title from "@/components/Title";
import { Suspense } from "react";
import Loading from "./loading";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    city: string;
  }>;
};

// Add dynamic variables to the title
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;

  return {
    title: city === "all" ? "All Events" : `Events in ${capitalize(city)}`,
  };
}

export default async function EventsPage({ params }: Props) {
  const { city } = await params;

  return (
    <main className="flex min-h-[110dvh] flex-col items-center px-[20px] py-24">
      <Title className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && `Events is ${capitalize(city)}`}
      </Title>

      <Suspense fallback={<Loading />}>
        <EventsList city={city} />
      </Suspense>
    </main>
  );
}
