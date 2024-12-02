import Title from "@/components/Title";
import Image from "next/image";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  const res = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`,
  );

  const event = await res.json();

  return (
    <main>
      <section className="relative flex items-center justify-center overflow-hidden py-14 md:py-20">
        <Image
          src={event.imageUrl}
          className="z-0 object-cover blur-3xl"
          fill
          quality={50}
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          alt="event background image"
        />

        <div className="z-1 relative flex flex-col gap-6 lg:flex-row lg:gap-16">
          <Image
            src={event.imageUrl}
            className="rounded-xl border-2 border-white/50 object-cover"
            alt={event.name}
            width={300}
            height={201}
          />

          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            <Title className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </Title>

            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>

            <button className="bg-blur mt-5 w-[95vw] rounded-md border-2 border-white/10 bg-white/20 py-2 text-lg capitalize transition hover:scale-105 focus:scale-105 active:scale-[1.02] sm:w-full lg:mt-auto">
              Get tickets
            </button>
          </div>
        </div>
      </section>

      <div></div>
    </main>
  );
}
