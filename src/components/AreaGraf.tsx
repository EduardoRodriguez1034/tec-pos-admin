import { Card, Title, AreaChart } from "@tremor/react";
import React from 'react'

const chartdata = [
    {
      date: "Jan",
      Ganancias: 2890,
      Gastos:2338,
    },
    {
      date: "Feb",
      Ganancias: 2756,
      Gastos:2103,
    },
    {
      date: "Mar",
      Ganancias: 3322,
      Gastos:2194,
    },
    {
      date: "Apr",
      Ganancias: 3470,
      Gastos:2108,
    },
    {
      date: "May",
      Ganancias: 3475,
      Gastos:1812,
    },
    {
      date: "Jun",
      Ganancias: 3129,
      Gastos:1726,
    },
  ];
  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

function AreaGraf() {
  return (
    <Card>
    <Title>Ganancias y Gastos</Title>
    <AreaChart
      className="h-72 mt-4"
      data={chartdata}
      index="date"
      categories={["Ganancias", "Gastos"]}
      colors={["indigo", "cyan"]}
      valueFormatter={dataFormatter}
    />
  </Card>
  )
}

export default AreaGraf