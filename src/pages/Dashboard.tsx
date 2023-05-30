import {Title,Text,TabList, Tab, Grid, Card, AreaChart} from '@tremor/react'
import React, { useState } from 'react'
import CardGridMap from '../components/CardGridMap';
import GrafPastel from '../components/GrafPastel';
import {es} from "date-fns/locale";
import RangoFecha from '../components/RangoFecha';
import Tabla from '../components/Tabla';
import CardProgress from '../components/CardProgress';
import Historial from '../components/Historial';
import AreaGraf from '../components/AreaGraf';




const Dashboard= () => {
  const[selectedView, setSelectedView]=useState("1");
  return (
    <main className='bg-slate-200 p-6 sm:p-10'>
        <Title> Dashboard </Title>
        <TabList 
        defaultValue={selectedView}
        onValueChange={ (value) => setSelectedView(value)} 
        className="mt-6"
        >
          <Tab value="1" text="General "/>
          <Tab value="2" text="Detalle"/>
          <Tab value="3" text="Historial"/>

        </TabList>
        {selectedView === "1" ? (
        <>
          <CardGridMap/>

          <div className="mt-4">
            <Card>
              <Tabla></Tabla>
            </Card>
            <AreaGraf/>
          </div>
        </>

      ) : selectedView === "2" ? (
        <Card className="mt-6">
          <div className="sm:p-2">
            <RangoFecha></RangoFecha>
            </div>

           <div className="sm:p-2"> 
           <CardGridMap/>
           <GrafPastel></GrafPastel>
           </div>

          <div className="sm:p-6">
            <Tabla></Tabla>
            </div>
        </Card>
      ) : (
        <Card className="mt-6">
          <div className="sm:p-6">
            <Historial></Historial>
          </div>
        </Card>
      
      )}



    </main>
  );
};

export default Dashboard