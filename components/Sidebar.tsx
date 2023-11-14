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
  const userProfile = false
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
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>
                Log in to like and comment on videos
              </p>
              <div className='pr-4'>
                
                


                {/* <GoogleLogin
                  clientId='503060615313-6ikfvcvijakchtlbqup35vti55duoq98.apps.googleusercontent.com'
                  render={(renderProps) =>(
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                    className='bg-white text-lg text-[#ed2647] border-[1px] border-[#ed2647]
                    font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white
                    hover:bg-[#ed2647] cursor-pointer'
                    >
                      Log in
                    </button>

                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy='single_host_origin'
                /> */}
              </div>
            </div>
          )}
          <Discover/>
          <SuggestedAccounts/>
          <Footer/>
        </div>
        
      )}
    
    </div>
  )
}

export default Sidebar