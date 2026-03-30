import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardContent } from '../components/ui/card'
import { Plus } from 'lucide-react'




const Home = () => {
  return (
    <div className='w-full h-screen flex flex-col '>
      <div className='bg-gradient-to-l to-[#DFC4A4] from-[#F1E1CA] h-auto w-full text-black p-4 '>
        <h1 className='text-[25px] font-semibold'>Bem Vindo!</h1>
        <p>Organize seus prontuários e gerencie sua agenda aqui.</p>
      </div>
      <div className='p-8 text-[25px]'>

        <div className='grid grid-rows-[min-content_1fr] gap-4 '>

          <div className='grid grid-cols-2 pb-8 h-20'>
            <h1>Agenda de hoje</h1>
            <div className='flex justify-end '>
              <Button className='bg-[#5B2813] font-normal w-[300px] h-10 hover:cursor-pointer'><Plus />Novo Agendamento</Button>
            </div>
          </div>

          <div className='flex flex-row'>



            <div className='flex items-start  '>
              <h1></h1>
            </div>
            <div className='ml-auto'>
              <Card className='h-[400px] w-[300px] p-0 overflow-hidden hidden md:flex'>
                <CardHeader className='flex bg-[#261810] h-10 p-0  w-full justify-center items-center text-white'>
                  <h1>Próximas Consultas</h1>
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