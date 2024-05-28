import React, { useState } from 'react';
import {Link, useNavigate} from 'react';
import{ login as authLogin} from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth';
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error , setError] = useState("")
    
    const login = async(data) => {
        console.log(`${data} in login button`)
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-e-xl p-10 border border-black/10 `}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'> Sign to your Account </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don't have any account ?
                <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign Up!
                </Link>
            </p>
            {error && <p className='text-red-800 mt-8 text-center'> {error} </p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input 
                    label="Email: "
                    placeholder = "Enter your email: "
                    type="email"
                    {...register("email",{
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input  
                    label="Password:"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required:true,
                    })}
                    />
                    <Button type="submit" className='w-full'>Sign In</Button>
                </div>
            </form>
        </div>
    </div>
  );
}
/*
    handle submit is a method oran event where we use our oun submit method , apparently handle submit is a keyword 
    inside which we pass our 'own handle submit method (login in this case)' 
    and when this method is called then the registors are used to keep track of states of input data so that we dont 
    need to keep track of them .
*/ 
/* 
    We use {...registor} to spread registor value so that if wont be overwritten in other inputs 
    (overwrite na ho isliye hamesha spread spread krte h)

    {..required (key, {})}  <-- syntax 
)
*/
export default Login;