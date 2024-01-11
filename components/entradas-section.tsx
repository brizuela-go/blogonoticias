import Post from "@/interfaces/post";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";

type Props = {
  posts: Post[];
  categorias: string[];
};

export default function EntradasSection({ posts, categorias }: Props) {
  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <Link href={"/entradas"} className="text-3xl font-bold text-primary">
          Entradas
        </Link>
        <div className="flex items-center gap-x-2">
          {categorias.map((categoria) => (
            <Badge key={categoria}>
              <Link href={`/categorias/${categoria}`}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </Link>
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 mt-8">
        {posts.map((post) => (
          <div key={post.sys.id} className="flex flex-col md:flex-row">
            <div className="flex flex-col md:w-1/2">
              <Image
                src={`https:${post.fields.image.fields.file.url}`}
                width={500}
                height={300}
                className="rounded-lg"
                alt={post.fields.image.fields.title}
              />
            </div>
            <div className="flex flex-col md:w-1/2 gap-y-8">
              <h4 className="text-2xl font-bold text-primary">
                {post.fields.title}
              </h4>
              <p className="text-foreground">{post.fields.description}</p>
              {/* created at */}
              <div className="flex items-center gap-x-2">
                <CalendarIcon size={16} />
                <p className="text-foreground">
                  {new Date(post.sys.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {/* tags */}
              <div className="flex flex-wrap gap-x-2">
                {post.fields.tags.map((tag) => (
                  <Badge variant={"outline"} key={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-2">
                <Button>
                  <Link href={`/entradas/${post.fields.slug}`}>Leer más</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
