import Post from "@/interfaces/post";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

type Props = {
  posts: Post[];
};

export default function EntradasCards({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <Card
          key={index}
          className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
        >
          <div className="relative h-48 w-full">
            <Link href={`/entradas/${post.fields.slug}`}>
              <Image
                src={`https:${post.fields.image.fields.file.url}`}
                alt={post.fields.image.fields.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </Link>
          </div>
          <CardHeader>
            <CardTitle>{post.fields.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{post.fields.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="default">
              <Link href={`/entradas/${post.fields.slug}`}>Leer más</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
