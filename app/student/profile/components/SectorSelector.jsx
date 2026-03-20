"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

export default function CommandBasic({ availableSectors, handleSectorSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        {" "}
        <button
          onClick={() => setOpen(true)}
          className="shadow-xs h-10 bg-[#f5f6fc] rounded px-2 py-1 max-w-fit , text "
        >
          + Add Sector
        </button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="computer science " />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Choose a sector">
              {availableSectors.map((item, index) => (
                <CommandItem
                  onSelect={() => {
                    handleSectorSelect(item._id);
                    setOpen(false);
                  }}
                  key={index}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
