import { Schema, model, models} from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email es requerido"],
        match: [
            /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
            "Email no es valido"
        ]
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
        select: false
    },
    fullname:{ 
        type: String,
        required: [true, "Fullname es requerido"],
        maxLength: [50, "Fullname debe ser menor a 50 caracteres"],
        minLength: [3, "Fullname debe ser mayor a 3 caracteres"]
    },
    userNumber:{ 
        type: Number,
        unique: [true,"numero de usuario invalido"],
        required: [true, "Numero de interno es requerido"],
        minLength: [3, "El numero de interno debe ser mayor a 3 caracteres"]
    },
    alias:{
        type: String,
        required: [true, "Asigne un alias."]
    }
})

const Usuarios = models.Usuarios || model('Usuarios', userSchema);

export default Usuarios;