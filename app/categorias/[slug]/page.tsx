import EntradasCards from "@/components/entradas-cards";
import Post from "@/interfaces/post";
import { client } from "@/lib/client";
import { Metadata } from "next/types";

type Props = {
  params: {
    slug: string;
  };
};

export const dynamic = "auto",
  fetchCache = "auto",
  revalidate = 10;

export default async function EntradasCategoria({ params }: Props) {
  const { slug } = params;

  const response = await client.getEntries({
    content_type: "blog",
    "fields.tags": slug,
  });

  const posts: Post[] = response.items;

  return (
    <section className="my-8 px-2 lg:px-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-center mb-10">
        {slug.charAt(0).toUpperCase() + slug.slice(1)}
      </h1>
      <EntradasCards posts={posts} />
    </section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  return {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: "Entradas de la categoría " + slug,
  };
}
