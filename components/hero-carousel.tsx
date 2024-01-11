"use client";

import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Badge } from "./ui/badge";

import Link from "next/link";
import { CalendarIcon } from "lucide-react";

import Post from "@/interfaces/post";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  posts: Post[];
};

export default function HeroCarousel({ posts }: Props) {
  return (
    <section>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="rounded-lg">
          {posts.map((post) => (
            <CarouselItem
              className="hover:shadow-xl hover:-translate-y-1 transition ease-in-out duration-300"
              key={post.fields.title}
            >
              <Link href={`/entradas/${post.fields.slug}`}>
                <Card className="relative w-full h-[36rem] rounded-lg dark:border-slate-800">
                  <div
                    className={`absolute w-full h-full bg-cover bg-center filter brightness-50 rounded-lg`}
                    style={{
                      backgroundImage: `url(${post.fields.image.fields.file.url})`,
                    }}
                  ></div>
                  <CardContent className="relative z-10 flex flex-col justify-center items-start min-h-screen gap-y-4">
                    <div className="flex gap-2">
                      {post.fields.tags.map((tag) => (
                        <Badge key={tag} className="">
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-4xl font-bold text-start tracking-tight text-slate-50">
                      {post.fields.title}
                    </h2>
                    <p className="text-start text-slate-200">
                      {post.fields.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-slate-300" />
                      <p className="text-slate-300">
                        {new Date(post.sys.createdAt).toLocaleDateString(
                          "es-ES",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
