import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { GoogleOAuthProvider } from '@react-oauth/google'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setisSSR] = useState(true)

  useEffect(() => {
    setisSSR(false)
  },[])

  if(isSSR){
    return null
  }
  return (
    <GoogleOAuthProvider clientId='713348199235-d9q7r9l0uc88cvv1f8fv7ruc3rjfltvs.apps.googleusercontent.com'>

    
    <div>
      <Navbar/>
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar/>
        </div>
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88hv] videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
