import React from 'react'
import { Card, Title, BarChart, Subtitle } from "@tremor/react";

const chartdata = [
    {
      name: "Cafe",
      "Ventas": 2488,
    },
    {
      name: "Smoothie",
      "Ventas": 1445,
    },
    {
      name: "Sandwich",
      "Ventas": 743,
    },
    {
        name: "Galletas",
        "Ventas": 2488,
      },
      {
        name: "Crepas",
        "Ventas": 1445,
      },
      {
        name: "Nieve",
        "Ventas": 743,
      },
  ];
  
  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };


export default function Tabla() {
  return (
    <Card>
    <Title>Numero de ventas de "FECHA"- "FECHA"
    </Title>
    <BarChart
      className="mt-6"
      data={chartdata}
      index="name"
      categories={["Ventas"]}
      colors={["cyan"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  </Card>
  )
}
