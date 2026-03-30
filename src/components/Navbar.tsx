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
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate()

    return (
        
        <div className='flex  sticky top-0  w-full h-15 bg-[#261810] items-center justify-center px-4  text-white '>
            {/* //desktop */}
            <div className=' grid grid-cols-3 gap-4 w-full mr-auto ml-auto flex place-items-center p-4 hidden md:flex'>
                <h1 className='justify-start w-full'>Gerenciamento de Prontuários</h1>
                <ul className='flex gap-3 w-full items-center justify-center'>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `p-2 rounded-md transition-all duration-300 hover:bg-white/10 ${isActive ? 'bg-white/20 text-[#BB9877] ' : ''}`
                            }
                        >
                            Início
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/clientes"
                            className={({ isActive }) =>
                                `p-2 rounded-md transition-all duration-300 hover:bg-white/10 ${isActive ? 'bg-white/20 text-[#BB9877] ' : ''}`
                            }
                        >
                            Meus Clientes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/prontuarios"
                            className={({ isActive }) =>
                                `p-2 rounded-md transition-all duration-300 hover:bg-white/10 ${isActive ? 'bg-white/20 text-[#BB9877] ' : ''}`
                            }
                        >
                            Prontuários
                        </NavLink>
                    </li>
                </ul>
                <div className='w-full flex justify-end'>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className='text-[15px] font-normal hover:cursor-pointer bg-transparent border-none rounded-md hover:bg-white/10 p-2 transition-all duration-300'>Sair</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-[#261810] border-none text-white'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você deseja mesmo sair?</AlertDialogTitle>

                            </AlertDialogHeader>
                            <AlertDialogFooter className='bg-[#261810] border-none text-black'>
                                <AlertDialogCancel className='hover:cursor-pointer bg-[#261810] border-none'>Não</AlertDialogCancel>
                                <AlertDialogAction className='hover:cursor-pointer'
                                    onClick={() => {
                                        navigate('/login')
                                    }}
                                >
                                    Sim
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            {/* //mobile */}
            <div>

            </div>

        </div>



    )
}

export default Navbar