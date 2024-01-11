import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { client } from "@/lib/client";
import Post from "@/interfaces/post";
import DropdownCategorias from "./dropdown-categorias";
import Buscador from "./buscador";

export const dynamic = "auto",
  fetchCache = "auto",
  revalidate = 10;

export default async function Navbar() {
  const categorias = await client.getEntries({
    content_type: "blog",
  });

  const categoriasArray = categorias.items.map((post: Post) => {
    return post.fields.tags;
  });

  const categoriasFlat = categoriasArray.flat();

  const categoriasUnicas = [
    ...(new Set(categoriasFlat) as typeof categoriasFlat),
  ];

  const response = await client.getEntries({
    content_type: "blog",
  });

  const posts = response.items;

  return (
    <>
      <nav className="flex justify-between items-center max-lg:hidden  p-16">
        <ul className="flex space-x-4 justify-start items-center">
          <li>
            <Link href="/">
              <Image
                src="/next.svg"
                alt="Logo"
                width={100}
                height={100}
                className="mr-8 dark:filter dark:invert"
              />
            </Link>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/entradas">Entradas</Link>
            </Button>
          </li>
          <li>
            <DropdownCategorias categorias={categoriasUnicas} />
          </li>
        </ul>
        <div className="flex gap-4">
          <Buscador posts={posts} />
          <ThemeSwitcher />
        </div>
      </nav>
      <nav className="hidden max-lg:flex justify-center flex-col items-center p-16 gap-6">
        <ul>
          <li>
            <Link href="/">
              <Image
                src="/next.svg"
                alt="Logo"
                width={100}
                height={100}
                className="mr-8 dark:filter dark:invert"
              />
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4 justify-end items-center">
          <li>
            <Button variant="ghost">
              {" "}
              <Link href="/entradas">Entradas</Link>
            </Button>
          </li>
          <li>
            <DropdownCategorias categorias={categoriasUnicas} />
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
        <Buscador posts={posts} />
      </nav>
    </>
  );
}
