"use client";

import { EventoEvent } from "@prisma/client";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

type EventCardProps = {
  event: EventoEvent;
};

const MotionLink = motion.create(Link);

export default function EventCard({ event }: EventCardProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <MotionLink
      ref={ref}
      href={`/event/${event.slug}`}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      initial={{ opacity: 0, scale: 0.8 }}
      className="h-[380px] max-w-[500px] flex-1 basis-80"
    >
      <div className="state-effects relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-white/[3%]">
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={500}
          height={280}
          className="h-[60%] object-cover"
        />

        <div className="flex flex-1 flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/75">By {event.organizerName}</p>
          <p className="mt-5 text-sm text-white/50">{event.location}</p>
        </div>

        <div className="absolute left-[12px] top-[12px] flex h-[45px] w-[45px] flex-col items-center justify-center rounded-md bg-black/30">
          <p className="-mb-[5px] text-xl font-bold">
            {new Date(event.date).toLocaleDateString("en-US", {
              day: "2-digit",
            })}
          </p>
          <p className="text-xs uppercase text-accent">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
            })}
          </p>
        </div>
      </div>
    </MotionLink>
  );
}
