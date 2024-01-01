import Image from 'next/image'
import type { NextPage } from 'next'
import { Inter } from 'next/font/google'
import axios from 'axios';
import {Video} from '../types'
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { BASE_URL } from '@/utils';

interface IProps{
  videos: Video[]
}


const inter = Inter({ subsets: ['latin'] })

const Home = ({videos} : IProps) => {
  return (
    <h1 className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map((video:Video) => (
          <VideoCard post={video} key={video._id}/>
        ))
      ): (
        <NoResults text={'No Videos'}/>
      )}
    </h1>
  )
}

export const getServerSideProps = async () => {
  const {data} = await axios.get(`${BASE_URL}/api/post`)

  return {
    props: {videos: data}
  }
}

export default Home