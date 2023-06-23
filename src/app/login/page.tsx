"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    const formData = new FormData(e.currentTarget);


      //con esta funcion de nextAuth logeamos.

      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      if (res?.error) return setError(res.error as string);

      if (res?.ok) return router.push("/dashboard/profile");
      console.log(res);
  };

  return (
    <div className="container mx-auto w-3/4 h-auto my-10 rounded-2xl border border-solid shadow-xl md:w-1/2 text-palabra">
      <h1 className="text-center font-bold mt-20 mb-14 text-4xl ">Log-in</h1>
      {error && <div className="bg-red-500 text-white p-2 mb-2 ">{error}</div>}
      <form
        onSubmit={handleSubmit}
        id="formulario_login"
        className="flex flex-col h-96 items-stretch justify-between"
      >
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

        <a href="./register" className="mx-auto  hover:text-botones">
          ¿No tenés cuenta? Registrate
        </a>
        <button
          type="submit"
          className="bg-botones text-2xl text-white font-semibold rounded-2xl mx-auto w-1/2 py-2.5 mb-20"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
