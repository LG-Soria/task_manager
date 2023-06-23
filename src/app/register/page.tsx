"use client";
import axios from "axios"
import { AxiosError} from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
    
    const [error, setError] = useState();
    const router = useRouter()

  const  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
        const signUpResponse = await axios.post("/api/auth/signup", {
            email: formData.get("email"),
            fullname: formData.get("fullname"),
            userNumber: formData.get("userNumber"),
            alias: formData.get("alias"),
            password: formData.get("password"),
          });

          
          //con esta funcion de nextAuth, logeamos despues de registrarse.
          const res = await signIn('credentials',{
            email: signUpResponse.data.email,
            password: formData.get("password"),
            redirect: false,

          })
          
          
          if (res?.ok) return router.push('/dashboard')
          console.log(res)

    } catch (error) {
        console.log(error)
       if (error instanceof AxiosError){
        setError(error.response?.data.message)
       }
    }
  };
  return (
    <div
      className="container mx-auto w-3/4 h-auto my-10 rounded-2xl 
    border border-solid shadow-xl md:w-1/2 text-palabra"
    >
      <h1 className="text-center font-bold mt-20 mb-14 text-4xl ">Sign-up</h1>
      {error && <div className="bg-red-500 text-white p-2 mb-2 ">{error}</div>}
      <form
        onSubmit={handleSubmit}
        id="formulario_login"
        className="flex flex-col h-screen items-stretch justify-between"
      >
        <input
          type="text"
          name="fullname"
          placeholder="Nombre completo"
          className=" focus:bg-campo mx-auto w-2/3 px-3 py-4 rounded-2xl"
        />
        <input
          type="number"
          name="userNumber"
          placeholder="Número de interno"
          className=" focus:bg-campo mx-auto w-2/3 px-3 py-4 rounded-2xl"
        />
        <input
          type="text"
          name="alias"
          placeholder="Alias de usuario"
          className=" focus:bg-campo mx-auto w-2/3 px-3 py-4 rounded-2xl"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" focus:bg-campo mx-auto w-2/3 px-3 py-4 rounded-2xl"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className=" focus:bg-campo mx-auto w-2/3 px-3 py-4 rounded-2xl"
        />
        <input
          type="password"
          name="pass_repeat"
          placeholder="Repetir contraseña"
          className=" focus:bg-campo mx-auto w-2/3 px-3 py-4 rounded-2xl"
        />
        <button
          type="submit"
          className="bg-botones text-2xl text-white font-semibold rounded-2xl mx-auto w-1/2 py-2.5 mb-20"
        >
          Registrarme
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
