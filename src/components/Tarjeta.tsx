import { Card, Text, Metric } from "@tremor/react";
import React from 'react'

const Tarjeta = () => {
  return (
    <Card className="max-w-xs mx-auto"> 
        <Text>Ventas - Enero</Text>
    <Metric>$ 50,000</Metric>
    </Card>
  )
}

export default Tarjeta