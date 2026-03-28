import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'

const Navbar = () => {
    return (
        //desktop
        <div className='flex fixed w-full h-15 bg-[#261810] items-center justify-center px-4  text-white'>
            <div className=' grid grid-cols-3 gap-4 w-full mr-auto ml-auto flex place-items-center p-4'>
                <h1 className='mr-auto'>Gerenciamento de Prontuários</h1>
                <ul className='flex gap-3'>
                    <li className='hover:cursor-pointer rounded-md hover:bg-white/10 p-2 transition-all duration-300'>Inicio</li>
                    <li className='hover:cursor-pointer rounded-md hover:bg-white/10 p-2 transition-all duration-300'>Meus Clientes</li>
                    <li className='hover:cursor-pointer rounded-md hover:bg-white/10 p-2 transition-all duration-300'>Prontuários</li>
                </ul>
                <div className='ml-auto'>
                    
                    <AlertDialog >
                        <AlertDialogTrigger asChild>
                            <Button className='hover:cursor-pointer bg-transparent border-none rounded-md hover:bg-white/10 p-2 transition-all duration-300 ' variant="outline">Sair</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você deseja mesmo sair?</AlertDialogTitle>
                                
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Não</AlertDialogCancel>
                                <AlertDialogAction>Sim</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

        </div>
    )
}

export default Navbar