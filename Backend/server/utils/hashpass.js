import bcrypt from "bcryptjs";

// Hashing the password

export const hashedPassword =  (password) =>{
    const salt  = 10
    return bcrypt.hashSync(password, salt);
}


export const  comparePassword = (password1, password2) =>{
    return bcrypt.compareSync(password1, password2);
}