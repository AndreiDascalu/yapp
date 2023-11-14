import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {AiOutlineLogout} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {IoMdAdd} from 'react-icons/io'
import Logo from 'utils/yapp-logo.png'
import { createOrGetUser } from '@/utils';

const Navbar = () => {
  const user = false;

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-grey-200 py-2 px-4'>
      <Link href={"/"}>
        <div className='w-[100px] md:w-[130px]'>
          <Image className='cursor-pointer' src ={Logo} alt='Yapp' layout = 'responsive'>

          </Image>
        </div>
      </Link>

      <div>
        SEARCH
      </div>

      <div>
        {user ? (
          <div> Logged in </div>
        ):(
          <GoogleLogin
                onSuccess={(response) => (createOrGetUser(response))}
                onError={() => console.log('An error occurred during login')}
                />
        )}
      </div>
      
    </div>
  )
}

export default Navbar