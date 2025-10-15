'use client'

import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { DateRange } from 'react-day-picker'
import { RiArrowGoBackFill } from 'react-icons/ri'

type props = {
  rangeDate: DateRange | undefined
  setRangeDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

const Calendar22 = ({ rangeDate, setRangeDate }: props) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-3 ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="font-normal">
            {rangeDate?.from && rangeDate.to ? (
              `${rangeDate.from.toLocaleDateString()}～${rangeDate.to.toLocaleDateString()}`
            ) : (
              <div className="text-gray-600">期間</div>
            )}

            {rangeDate?.from && rangeDate?.to ? (
              <button
                onClick={() => {
                  setRangeDate(undefined)
                }}
              >
                <RiArrowGoBackFill />
              </button>
            ) : (
              <ChevronDownIcon />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={rangeDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (date?.from && date.to) {
                setRangeDate({ from: date.from, to: date.to })
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Calendar22
