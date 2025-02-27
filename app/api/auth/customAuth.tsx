"use server";

import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { defaultUser } from "@/utils/helpers";
import { CredentialsType } from "@/types";
import { UserParams, AccountParams, ProfileType } from "@/types";

// all of these api calls are performed on the server only (the "use server" directive above)

// recommend your database user table contains id,name,email, hashedpassword,and loginMethod fields if you
// allow for both credentials and provider logins and registration methods.

export async function credentialsSignIn(formData: FormData) {
  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  await signIn("credentials", { ...credentials, redirectTo: "/tasks" });
}

export async function credentialsSignInCallback(credentials: CredentialsType) {
  try {
    const { email, password } = credentials;

    // const user= await checkDBUser(email,hashedpassword)

    const user = {
      id: "1",
      name: defaultUser.name,
      email: defaultUser.email,
      image: defaultUser.image,
      loginMethod: "credentials",
    };

    // if (!user || user.loginMethod!=='credentials') {
    //   // redirected to error page
    //   return null
    // }

    // Any object returned will be saved in `user` property of the JWT
    return user;
  } catch (error) {
    //credentials are invalid
    return null;
  }
}

//this is a general signin callback so we can use this function to add more functionality to the provider logins

export async function signInCallback(user: UserParams, account: AccountParams) {
  var isAllowedToSignIn = true;

  //check if its a provider log in:

  if (account.provider !== "credentials") {
    //next auth automatically creates a user object from your provider profile and is
    // saved in the 'user' property of the JWT
    const { id, name, email, image } = user;

    //check if the user already has an account

    // const user= await checkDBUser(email)
    // if(!user || user.loginMethod!==account.provider){
    //  isAllowedToSignIn=false;
    // }

    return isAllowedToSignIn;
  }
  // no callback required for credentials signin (handled above)
  return true;
}

export async function registerProvider(user: UserParams, provider: string) {
  // if(user && user.email && provider){

  // // check if a user already exists in the database with the same email
  // const existingUser= await checkDBUser(user.email)

  // if (existingUser){
  // redirect ('/auth/error')
  // }

  // //create new user

  // const newUser= await createDBUser({loginMethod:provider, email, ...})

  // return

  // }else{

  // redirect ('/auth/error')
  // }

  return;
}

export async function registerCredentials(formData: FormData) {
  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  //check if the email already exists:
  // const existingUser= await checkDBUser(email)

  // if (existingUser){
  // redirect ('/auth/error')
  // }
  //

  try {
    // const newUser= await createDBUser({loginMethod:"credentials", email, hashedpassword ...})
  } catch (error) {
    redirect("/auth/error");
  }

  // at this point the new user was created successfully in the database

  await signIn("credentials", {
    ...credentials,
    redirectTo: "/auth/registerProcess?provider=credentials",
  });
}

//after credential or provider login a session is created. Check if this session
// exists on each async server page load and retrieve the user profile

export async function checkSession() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  return session;
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email");

  try {
    //check if there is a user in the database:
    //const existingUser= await checkDBUser(email)

    //if (!existingUser){
    // return {isOk:false}
    // }

    //now create a backend function to generate a recover code and send it to the user by email

    return {
      isOk: true,
    };
  } catch (error) {
    return {
      isOk: false,
    };
  }
}

export async function changePassword(formData: FormData) {
  const newPassword = formData.get("password");
  const recoveryCode = formData.get("recoveryCode");

  // console.log(newPassword, recoveryCode);
  try {
    // const response = await changeUserPassword(newPassword,recoveryCode)
    //now create a backend function to generate a recover code and send it to the user via email

    return {
      isOk: true,
    };
  } catch (error) {
    return {
      isOk: false,
    };
  }
}

export async function updateUserProfile({ userProfile }: ProfileType) {
  // const response =await updateUserProfile(userProfile.id,userProfile)
}
