import { DateRangePicker, DateRangePickerValue } from "@tremor/react";
import { useState } from "react";
import { es } from "date-fns/locale";
import React from 'react'

function RangoFecha() {
    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(2022, 1, 1),
        new Date(),
      ]);
  return (
    <DateRangePicker
      className="max-w-md mx-auto"
      value={value}
      onValueChange={setValue}
      locale={es}
      dropdownPlaceholder="Seleccionar"
    />
  )
}

export default RangoFecha