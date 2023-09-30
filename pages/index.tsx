import Image from 'next/image'
import type { NextPage } from 'next'
import { Inter } from 'next/font/google'
import axios from 'axios';

// interface IProps{
//   videos: 
// }

const inter = Inter({ subsets: ['latin'] })

const Home:NextPage = ({videos}) => {
  console.log(videos)
  return (
    <h1 className='text-3xl font-bold underline'>
      
    </h1>
  )
}

export const getServerSideProps = async () => {
  const {data} = await axios.get(`http://localhost:3000/api/post`)

  console.log()
  return {
    props: {videos: data}
  }
}

export default Home