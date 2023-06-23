import { NextResponse } from "next/server";
import  Usuarios  from "@/models/user";
import  bcrypt  from "bcryptjs";
import { connectDB } from "@/libs/mongodb";


export async function POST(request: Request){
    
    const {fullname, email, password, userNumber, alias} = await request.json()


    //validacion de password
    if(!password || password.length < 6) return NextResponse.json({
        message: "Password debe tener al menos 6 caracteres"
    },
    {status: 400})

    if (/[a-zA-Z0-9]+/.test(password) === false) {
        return NextResponse.json({
            message: "La contraseña debe contener al menos una letra y un número"
        },
        {status: 400})
    }

    try {
        //conectando con mongoDb
        await connectDB()

        //Buscando si el email existe
        const userFound = await Usuarios.findOne({email})
        
        if(userFound) return NextResponse.json({
    "message": "El email ya existe"
   },
   {
    status: 409
   })


   //encriptando el password.
   const hashedPassword = await bcrypt.hash(password, 12)
   
   //si el email no existe, crea un nuevo usuario.

   const user = new Usuarios ({
       email,
       fullname,
       alias,
       userNumber,
       password : hashedPassword,
      
    })
    

    //lo guarda
   const savedUser = await user.save()
   console.log(savedUser, "usuario guardado")
    
    return NextResponse.json({
        _id: savedUser._id,
        email: savedUser.email,
        fullname: savedUser.fullname,
        userNumber: savedUser.userNumber,
        alias: savedUser.alias
    })
} catch (error) {
    
    console.log(error)
   if (error instanceof Error){
    return  NextResponse.json({
        message: error.message
    },{
        status: 400
    })
   }
    
}
}
