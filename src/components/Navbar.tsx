import React, { useState } from 'react';
import {
  House, Users, ShoppingCart, Store,
  ShoppingBasket, Menu, User, Settings, LogOut, Package, X 
} from 'lucide-react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
} from "./ui/alert-dialog";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);


  const navLinks = [
    { to: "/home", label: "Início" },
    { to: "/clientes", label: "Meus Clientes" },
    { to: "/prontuarios", label: "Prontuários" },
  ];


  
  // Função para pegar o título da página atual
  const getPageTitle = () => {
    const current = navLinks.find(link => link.to === location.pathname);
    return current ? current.label : "Dashboard";
  };

  return (
    <>
      {/* DESKTOP */}
      <div className='hidden md:flex sticky top-0 z-50 w-full h-15 bg-[#261810] items-center px-6 text-white shadow-md'>
        <div className='grid grid-cols-3 w-full items-center'>
          <h1 className='font-bold text-lg'>Gerenciamento de Prontuários</h1>
          
          <ul className='flex gap-4 justify-center'>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all duration-300 hover:bg-white/10 ${
                      isActive ? 'bg-white/20 text-[#BB9877]' : 'text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className='flex justify-end'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className='hover:bg-white/10 text-white'>Sair</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='bg-[#BF9B7A] border-none text-white'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você deseja mesmo sair?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className='border-none bg-white/20 text-white hover:bg-white/30'>Não</AlertDialogCancel>
                  <AlertDialogAction className='bg-red-600 hover:bg-red-700' onClick={() => navigate('/')}>
                    Sim
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>


      {/* MOBILE */}
      <div className="md:hidden">
     
        <header className="bg-[#261810] px-4 h-16 flex items-center justify-between fixed top-0 w-full z-[60] shadow-sm text-white">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>

          <span className="font-bold text-lg">{getPageTitle()}</span>
          <div className="w-10" /> 
        </header>

    
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed top-16 left-0 w-full bg-[#261810] z-50 border-b border-white/10 shadow-xl overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.to}
                    variant="ghost"
                    className="w-full justify-start h-12 text-white hover:bg-white/10"
                    onClick={() => { navigate(link.to); setIsOpen(false); }}
                  >
                    {link.label}
                  </Button>
                ))}
                
                <Separator className="my-2 bg-white/10" />
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-12 gap-3 text-white hover:bg-white/10"
                  onClick={() => { navigate("/perfil"); setIsOpen(false); }}
                >
                  <User size={20} /> Perfil
                </Button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center h-12 gap-3 px-4 text-red-400 font-bold hover:bg-white/5 rounded-lg transition-colors mt-2"
                >
                  <LogOut size={20} /> Sair da Conta
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="h-16" />
      </div>
    </>
  );
};

export default Navbar;