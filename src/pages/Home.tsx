import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardContent } from '../components/ui/card'
import { Plus } from 'lucide-react'
import Calendar from '../components/calendario/Calendario.tsx'





const Home = () => {
  return (
    <div className='w-full h-screen flex flex-col '>
      <div className='bg-gradient-to-l to-[#DFC4A4] from-[#F1E1CA] h-auto w-full text-black p-4 '>
        <h1 className='text-[25px] font-semibold'>Bem Vindo!</h1>
        <p>Organize seus prontuários e gerencie sua agenda aqui.</p>
      </div>
      <div className='p-8 text-[25px]'>

        <div className='grid grid-rows-[min-content_1fr] gap-4 '>
     
          <div className='flex grid grid-cols-[80%_20%] '>

            
              <Calendar />
          
            <div className='ml-auto'>
              <Card className='h-[400px] w-[300px] p-0 overflow-hidden hidden md:flex'>
                <CardHeader className='flex bg-[#261810] h-auto p-3  w-full justify-center items-center  text-white'>
                  <h1 className='text-[20px]'>Próximas Consultas</h1>
                </CardHeader>

                <CardContent className="p-4">
                  ...
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 