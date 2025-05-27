"use client"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TimePickerProps {
  time?: string
  onTimeChange?: (time: string) => void
  placeholder?: string
  className?: string
}

export function TimePicker({ time, onTimeChange, placeholder = "Select time", className }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  const [selectedHour, selectedMinute] = time ? time.split(":") : ["", ""]

  const handleTimeSelect = (hour: string, minute: string) => {
    const newTime = `${hour}:${minute}`
    onTimeChange?.(newTime)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal", !time && "text-muted-foreground", className)}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? time : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex">
          <ScrollArea className="h-60">
            <div className="p-2">
              <div className="text-sm font-medium mb-2">Hours</div>
              {hours.map((hour) => (
                <Button
                  key={hour}
                  variant={selectedHour === hour ? "default" : "ghost"}
                  className="w-full justify-start mb-1"
                  onClick={() => handleTimeSelect(hour, selectedMinute || "00")}
                >
                  {hour}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <ScrollArea className="h-60">
            <div className="p-2">
              <div className="text-sm font-medium mb-2">Minutes</div>
              {minutes
                .filter((_, i) => i % 15 === 0)
                .map((minute) => (
                  <Button
                    key={minute}
                    variant={selectedMinute === minute ? "default" : "ghost"}
                    className="w-full justify-start mb-1"
                    onClick={() => handleTimeSelect(selectedHour || "00", minute)}
                  >
                    {minute}
                  </Button>
                ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
