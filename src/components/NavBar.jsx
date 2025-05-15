import Link from "next/link"
import Image from "next/image";
import Logoutbutton from "./Logoutbutton";
import { CircleUserRound } from 'lucide-react';
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  const loggedUser = session?.user
  console.log("User (Nav):",loggedUser)
  const email = loggedUser?.email
  // console.log(email)
  return (
    <>
      <nav className="bg-[#0a0a14] px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-500"> <Link href='/'>NoteNest </Link></h1>
        
        {loggedUser ? (<>
          <div className="flex   items-center gap-2">
            {loggedUser?.image ? (<>
              <Image
                src={loggedUser?.image}
                alt={loggedUser?.name}
                width={35}
                height={35}
                className="rounded-full cursor-pointer "
              />
            </>) :  <CircleUserRound width={35} height={35} className="cursor-pointer hover:text-green-500"/>}
            <span className="mx-1">|</span>
            <Logoutbutton />
          </div>
        </>) : (<>
          <ul className="flex gap-3  py-3 text-lg tracking-widest">
            <li className="hover:text-lime-400 hover:underline "><Link href='/login'> Login </Link></li>
            <li className="hover:text-lime-400 hover:underline "><Link href='/register'> Register </Link></li>
          </ul>
        </>)}
      </nav>
    </>
  );
}

export default Navbar