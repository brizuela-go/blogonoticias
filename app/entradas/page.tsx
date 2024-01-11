import EntradasCards from "@/components/entradas-cards";
import Post from "@/interfaces/post";
import { client } from "@/lib/client";
import { Metadata } from "next/types";

export const dynamic = "auto",
  fetchCache = "auto",
  revalidate = 10;

export const metadata: Metadata = {
  title: "Entradas del Blog de Juan",
  description: "Estas son las entradas del blog de Juan",
};

export default async function Entradas() {
  const response = await client.getEntries({
    content_type: "blog",
  });

  const posts: Post[] = response.items;

  return (
    <section className="my-8 px-2 lg:px-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-center mb-10">
        Entradas del blog
      </h1>
      <EntradasCards posts={posts} />
    </section>
  );
}
