import {Title,Text,TabList, Tab, Grid, Card, Flex,Metric,BadgeDelta,ProgressBar} from '@tremor/react'
import React from 'react'


const data=[
    {
        title:'Ventas',
        metric: '$ 15,000',
        progress: 15 ,
        target: '$ 100,000',
        delta: '15%',
        deltaType: 'Incremento Moderado',
    },
    {
        title:'Ganancias',
        metric: '$ 10,000',
        progress: 50 ,
        target: '$ 20,000',
        delta: '50%',
        deltaType: 'Incremento',    
    },
    {
        title:'Usuarios',
        metric: '1,000',
        progress: 66 ,
        target: '1,500',
        delta: '66%',
        deltaType: 'Incremento Moderado',   
    },
]
const CardGridMap = () => {
  return (
    <Grid numColsMd={2} numColsLg={3} className="mt-6 gap-x-6 gap-y-6" >
        {
            data.map( (item) => (
                <Card key={item.title}> 
                    <Flex alignItems="start">
                        <div>
                            <Text>{item.title}</Text>
                            <Metric>{item.metric}</Metric>
                        </div>
                        <BadgeDelta >
                           {item.delta}
                        </BadgeDelta>
                    </Flex>
                    <Flex>
                        <Text>
                            {`${item.progress}% (${item.metric})`}
                        </Text>
                    </Flex>
                    <ProgressBar percentageValue={item.progress} className="mt-2"/>

                   
                </Card>
            ))
        }
    </Grid>
  )
}

export default CardGridMap