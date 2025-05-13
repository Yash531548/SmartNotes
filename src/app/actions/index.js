'use server'
const { signOut, signIn } = require("@/auth")

export async function doSocialLogin(formData){
    const action = formData.get('provider');
    console.log(action)
    await signIn(action,{redirectTo:'/'})
}

export async function doLogout(){
    await signOut({redirectTo:'/login'})
}

export async function doCredentialLogin(formData){
    console.log("Formdata: " , formData)
    try {
        const response = await signIn("credentials",{
            password: formData.get("password"),
            email: formData.get("email"),
            redirect: false
        })
        return response
    } catch (error) {
        throw new Error(error.message);
    }

}