import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";


async function Navbar() {
  const session = await getServerSession();
  console.log(session);
  

  return (
    <nav className="bg-slate-300  h-12 mb-5 ">
      <div className="flex flex-row justify-between w-3/4">
        <Link
        className="m-3" href="/"> Marca de empresa.</Link>

        <ul className="justify-between flex flex-row">
          {session ? (
         
            <>
            <li className="m-3">
              <Link href="/dashboard/profile"> Perfil </Link>
            </li> 
              <h1 className='font-medium text-lg mt-2.5'>{session.user?.email}</h1></>


          ) : (
            <>
              <li className="m-3">
                <Link href="/login"> Login </Link>
              </li>
              <li className="m-3">
                <Link href="/register"> Registro</Link>
              </li>
              <li className="m-3">
                <Link href="/about"> About </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
