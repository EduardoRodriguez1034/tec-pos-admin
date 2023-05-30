//Se importan los componentes de tremor
import { Card, Text,Metric,Flex,ProgressBar,BadgeDelta} from '@tremor/react'
import React from 'react'


const CardProgress = () => {
  return (
    <Card className="max-w-lg">
      <Flex>
      <div>
        <Text>Ventas</Text>
        <Metric>$ 50,000</Metric>
        </div>
        <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
      </Flex>
      
        <Flex className="mt-2"> 
        <Text className="truncate">50% ($ 150,000)</Text>
        <text>$ 220,000</text>
        
          </Flex>
          <ProgressBar percentageValue={50} className="mt-2" />
    </Card>
  )
}

export default CardProgress