"use client";
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function TodoList() {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Todo List</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full hover:cursor-pointer">
            <CalendarIcon />
            {date ? format(date, "dd MMM yyyy") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
              console.log(open);
            }}
            className="rounded-md border shadow-sm"
            captionLayout="dropdown"
            onDayClick={() => console.log({ date }.date?.toLocaleDateString())}
          />
        </PopoverContent>
      </Popover>
      {/* LIST */}
      <ScrollArea className="max-h-[400px] rounded-md p-4 mt-4 overflow-y-auto">
        {/* LIST ITEM */}
        <div className="flex flex-col gap-2">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="name" />
              <label htmlFor="name" className="text-sm text-muted-foreground">
                osagie amadasun
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="name" />
              <label htmlFor="name" className="text-sm text-muted-foreground">
                osagie amadasun
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="name" />
              <label htmlFor="name" className="text-sm text-muted-foreground">
                osagie amadasun
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="name" />
              <label htmlFor="name" className="text-sm text-muted-foreground">
                osagie amadasun
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="name" />
              <label htmlFor="name" className="text-sm text-muted-foreground">
                osagie amadasun
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="name" />
              <label htmlFor="name" className="text-sm text-muted-foreground">
                osagie amadasun
              </label>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
