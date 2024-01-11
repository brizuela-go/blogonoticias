import EntradasSection from "@/components/entradas-section";
import HeroCarousel from "@/components/hero-carousel";
import Post from "@/interfaces/post";
import { client } from "@/lib/client";

export const dynamic = "auto",
  fetchCache = "auto",
  revalidate = 10;

export default async function Home() {
  const response = await client.getEntries({
    content_type: "blog",
    limit: 3,
  });

  const posts: Post[] = response.items ?? [];

  const response2 = await client.getEntries({
    content_type: "blog",
    limit: 3,
    skip: 3,
  });

  const posts2: Post[] = response2.items ?? [];

  const categorias = posts2.map((post) => post.fields.tags);

  const categoriasFlat = categorias.flat();

  const uniqueCategorias = [
    ...(new Set(categoriasFlat) as unknown as string[]),
  ];

  return (
    <section className="lg:px-16 px-2">
      <HeroCarousel posts={posts} />
      <EntradasSection posts={posts2} categorias={uniqueCategorias} />
    </section>
  );
}
