import {Card,Title, DonutChart } from "@tremor/react";
import React from 'react'

const meses= [
    {
        name:'Enero',
        Ventas: 50000
    },
    {
        name:'Febrero',
        Ventas: 20000,
    },
    {
        name:'Marzo',
        Ventas: 10000,
    },
    {
        name:'Abril',
        Ventas: 20000,
    },{
        name:'Mayo',
        Ventas: 10000,
    },
    {
        name:'Junio',
        Ventas: 50000,
    },
    {
        name:'Julio',
        Ventas: 15000,
    },
    {
        name:'Agosto',
        Ventas: 25000,
    },
    {
        name:'Septiembre',
        Ventas: 30000,
    },
    {
        name:'Octubre',
        Ventas: 27053,
    },
    {
        name:'Noviembre',
        Ventas: 65000,
    },
    {
        name:'Diciembre',
        Ventas: 76000,
    },
]

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

const GrafPastel=() =>{
  return (
    <Card className="mt-6 h-50 w-50">
    <Title style={{ textAlign: "center" }}>Ventas "FECHA" - "FECHA</Title>
    <DonutChart
      className="mt-6"
      data={meses}
      category='Ventas'
      index='name'
      valueFormatter={valueFormatter}
      showLabel
      colors={["slate", "violet", "indigo", "rose", "cyan", "amber","red", "blue", "yellow", "orange","pink","lime"]}
    />

    
  </Card>
  
  )
}

export default GrafPastel