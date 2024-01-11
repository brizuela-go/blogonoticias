"use client";

import { Button } from "./ui/button";
import Post from "@/interfaces/post";
import { SearchIcon } from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "./ui/command";

type Props = {
  posts: Post[];
};

export default function Buscador({ posts }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      <SearchIcon className="w-4 h-4" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size={"sm"}
            className="w-[150px] justify-start"
          >
            Buscar
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados 😔</CommandEmpty>
              <CommandGroup>
                {posts.map((post, index) => (
                  <CommandItem key={index} value={post.fields.title}>
                    <Link href={`/entradas/${post.fields.slug}`}>
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <p className="text-sm text-primary">
                            {post.fields.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {post.fields.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
