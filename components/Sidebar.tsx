import React, {useState} from 'react'
import {NextPage} from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/dist/client/link'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'
import Discover from './Discover'

const Sidebar = () => {
  const [showSidebar, setshowSidebar] = useState(true)
  const normalLink = 'flex items-center gap-3 hover p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#ed2647] hover:bg-gray-100'
  return (
    <div>
      <div className='block xl:hidden m-2 ml-4 mt-3 text-xl'
      onClick={() => setshowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle/> : <AiOutlineMenu/>}
      </div>
      {showSidebar && (
        <div
        className={`${
          showSidebar ? 'xl:w-400' : 'w-20'
        } flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3`}
        >
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href="/">
              <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome/>
                </p>
                <span className='text-xl hidden xl:block'>
                  Recommended
                </span>
              </div>
            </Link>
          </div>
          
          <Discover/>
          <SuggestedAccounts/>
          <Footer/>
        </div>
        
      )}
    
    </div>
  )
}

export default Sidebar