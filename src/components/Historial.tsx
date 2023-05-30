import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";

import React from 'react'

const data = [
    {
      ID: "43145",
      Descripcion: "2 SandWich, 2 cafes americanos...",
      Fecha:"29-5-2023",
      Total: "$180",
    },
    {
      ID: "43146",
      Descripcion: "5 Smoothies de fresa",
      Fecha:"29-5-2023",
      Total: "$320",
    },
    {
      ID: "43147",
      Descripcion: "3 SandWich",
      Fecha: "29-5-2023",
      Total: "$90",
    },
    {
      ID: "43148",
      Descripcion: "2 Sodas",
      Fecha: "29-5-2023",
      Total: "$40",
    },
    {
      ID: "43149",
      Descripcion: "Torta de Asada",
      Fecha: "29-5-2023",
      Total: "$180",
    },
    {
      ID: "43150",
      Descripcion: "Te Verde",
      Fecha:"29-5-2023",
      Total: "$40",
    },
    {
      ID: "43151",
      Descripcion: "2 Cafes",
      Fecha: "29-5-2023",
      Total: "$80",
    },
  ];

function Historial() {
  return (
    <Card>
    <Title>Historial de ventas</Title>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>ID Venta</TableHeaderCell>
          <TableHeaderCell>Descripcion</TableHeaderCell>
          <TableHeaderCell>Fecha</TableHeaderCell>
          <TableHeaderCell>Total</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.ID}>
            <TableCell>{item.ID}</TableCell>
            <TableCell>
              <Text>{item.Descripcion}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.Fecha}</Text>
            </TableCell>
            <TableCell>{item.Total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
  )
}

export default Historial