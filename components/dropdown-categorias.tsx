"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

export default function DropdownCategorias({
  categorias,
}: {
  categorias: string[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Categorías</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categorías</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {categorias.map((categoria, index) => (
            <Link key={index} href={`/categorias/${categoria}`}>
              <DropdownMenuItem>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
