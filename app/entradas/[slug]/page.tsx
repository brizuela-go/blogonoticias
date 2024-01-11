import Post from "@/interfaces/post";
import { client } from "@/lib/client";
import { CalendarIcon } from "lucide-react";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import RichText from "@/components/rich-text";

type Props = {
  params: {
    slug: string;
  };
};

export const dynamic = "auto",
  fetchCache = "auto",
  revalidate = 10;

export default async function Entrada({ params }: Props) {
  const slug = params.slug;

  const response = await client.getEntries({
    content_type: "blog",
    "fields.slug": slug,
  });

  const post: Post = response.items[0];

  if (!post) {
    return notFound();
  }

  const date = new Date(post.sys.createdAt);

  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
  }).format(date);

  const { title, description, image, body } = post.fields;

  return (
    <section className="flex flex-col justify-center items-center  lg:px-10 lg:m-10 px-2 m-2 gap-y-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-center ">
        {title}
      </h1>
      <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground text-center  ">
        {description}
      </h2>

      <Image
        src={`https:${image.fields.file.url}`}
        alt={image.fields.title}
        className="rounded-lg "
        width={640}
        height={360}
      />

      <div className="flex justify-center items-center gap-4">
        <CalendarIcon size={24} />
        <p className="text-foreground">{formattedDate}</p>
      </div>
      <article className="prose prose-headings:text-primary prose-p:text-foreground">
        <RichText content={body} />
      </article>
    </section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const response = await client.getEntries({
    content_type: "blog",
    "fields.slug": slug,
  });

  const post: Post = response.items[0];

  const { title, description, image } = post.fields;

  return {
    title: title,
    description: description,
    openGraph: {
      images: [
        {
          url: `https:${image.fields.file.url}`,
          width: 640,
          height: 360,
          alt: image.fields.title,
        },
      ],
    },
  };
}
