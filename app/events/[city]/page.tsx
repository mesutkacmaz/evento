import EventsList from "@/components/EventsList";
import Title from "@/components/Title";
import { Suspense } from "react";
import Loading from "./loading";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";
import { z } from "zod";

type Props = {
  params: Promise<{
    city: string;
  }>;
};

type EventsPageProps = Props & {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Add dynamic variables to the title
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;

  return {
    title: city === "all" ? "All Events" : `Events in ${capitalize(city)}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const { city } = await params;

  const page = (await searchParams).page;

  const parsedPage = pageNumberSchema.safeParse(page);

  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex min-h-[110dvh] flex-col items-center px-[20px] py-24">
      <Title className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && `Events is ${capitalize(city)}`}
      </Title>

      <Suspense key={parsedPage.data} fallback={<Loading />}>
        <EventsList city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}
