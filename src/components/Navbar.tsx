import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";


async function Navbar() {
  const session = await getServerSession();
  console.log(session);
  

  return (
    <nav>
      <div>
        <Link href="/"> Marca de empresa.</Link>

        <ul>
          {session ? (
         
            <li>
              <Link href="/dashboard/profile"> Perfil </Link>
            </li> 
          ) : (
            <>
              <li>
                <Link href="/login"> Login </Link>
              </li>
              <li>
                <Link href="/register"> Registro</Link>
              </li>
              <li>
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
