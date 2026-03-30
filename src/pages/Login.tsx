import React, { use } from 'react'
import { Card, CardHeader } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [alert, setAlert] = useState('')
  const navigate = useNavigate()


  const verificalogin = () => {
    if(login === 'admin' && senha === 'admin'){
      navigate('/')
    }else{
      setAlert('Login ou senha incorretos')
    }
    
  }

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-[#DFC4A4]'>
      <Card className='bg-[#261810] h-auto w-100 p-10'>
        <CardHeader>
          <h1 className='text-white text-[25px] font-semibold mx-auto'>Login</h1>
        </CardHeader>
        <label htmlFor="" className='text-white text-[20px]'>Login</label>
        <Input
          onChange={(e) => {
            setLogin(e.target.value)
          }}
          value={login}
          className='bg-white' />

        <label className='text-white text-[20px]'>Senha</label>
        <Input
        type='password'
          onChange={(e) => {
            setSenha(e.target.value)
          }}
          value={senha}
          className='bg-white' />

        <h1 className='text-white mx-auto'>{alert}</h1>

          <Button 
          onClick={() => {verificalogin()}}
          className='bg-white text-black hover:cursor-pointer hover:bg-gray-500 mt-1 w-35 h-10 ml-auto mr-auto'>Entrar</Button>
      </Card>
    </div>
  )
}

export default Login
