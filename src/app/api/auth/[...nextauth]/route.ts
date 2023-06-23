import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import Usuarios from "@/models/user";
import bcrypt from "bcryptjs"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: "Email", type: "email", placeholder: "tucorreo@email.com"},
                password: {label: "Password", type: "password", placeholder: "*******"},
            },
            async authorize(credentials, req) {
                await connectDB();
                console.log(credentials)

                //comprobar si el email existe en la base de datos.
                const userFound = await Usuarios.findOne({ email: credentials?.email}).select("+password");
                if(!userFound) throw new Error ("Crendeciales Invalidas")
                console.log(userFound)

                //comprando si la contraseña coincide
               const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
                if(!passwordMatch) throw new Error ("Credenciales Invalidas")
                return userFound;
            },
        })
    ],
    callbacks: {
        //cuando las coockies son almacenadas
        jwt({account, token, user, profile, session}){

            console.log({
                account,
                token,
                user,
                profile,
            })
            
            if (user) token.user = user;
            console.log(token)
            return token;
        },
        //cuando la session fue iniciada
        session({session, token}){
            session.user = token.user as any;
            console.log(session, token)
            return session
        }
    },
    pages: {
        signIn: '/login'
    }
})


export { handler as GET, handler as POST }