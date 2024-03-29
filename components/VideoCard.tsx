import { Video } from '@/types'
import React, { useRef } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import {RiVerifiedBadgeFill} from 'react-icons/ri'
import { useState } from 'react'

interface IProps {
    post: Video
}

const VideoCard: NextPage<IProps> = ({post}) => {

const [isHover, setisHover] = useState(false)
const [isVideoMuted, setisVideoMuted] = useState(false)
const [playing, setPlaying] = useState(false)
const videoRef = useRef<HTMLVideoElement>(null)
const onVideoPress = () => {
    if(playing){
        videoRef?.current?.pause();
        setPlaying(false)
    }else{
        videoRef?.current?.play()
        setPlaying(true)
    }
}
const onVolumePress = () => {
    if (videoRef && videoRef.current && !isVideoMuted)  {
        videoRef.current.muted = true;
        setisVideoMuted(true);
    }else if (videoRef && videoRef.current && isVideoMuted){
        videoRef.current.muted = false;
        setisVideoMuted(false);
    }
}

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6 relative'>
        <div>
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                <div className='md:w-16 md:h-16 w-10 h-10'>
                    <Link href ="/">
                        <>
                            <Image width={62} height={62} className='rounded-full' src={post.postedBy.image} alt='profile shoot' layout='responsive'/>
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={"/"}>
                        <div className='flex items-center gap-2'>
                            <p className='flex gap-2 items-center md:text-md font-bold text-bold'>
                              {post.postedBy.username}  {' '}
                              <RiVerifiedBadgeFill className = 'text-blue-400 text-md'/>
                            </p>
                            <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                            {post.postedBy.username}
                            </p>
                            
                        </div>
                    </Link>
                </div>
            </div>
        </div>

        <div className='flex gap-4 relative'>
            <div 
            onMouseEnter={() => setisHover(true)} onMouseLeave={() => setisHover(false)}
            >
                <Link href={`detail/${post._id}`}>
                    <video src={post.video.asset.url} loop ref = {videoRef} className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[250px] cursor-pointer bg-gray-100 rounded-3xl'>
                    </video>
                
                {isHover && (
                    <div className='relative bottom-20 cursor-pointer flex gap-20 left-16'>
                        {playing ? (
                            <button onClick={onVideoPress}>
                                <BsFillPauseFill className = 'text-black text-2xl lg-text-4xl xl:text-5xl absolute'/>
                            </button>
                        ) : (
                            <button onClick={onVideoPress}>
                                <BsFillPlayFill className = 'text-black text-2xl lg-text-4xl xl:text-5xl absolute'/>
                            </button>
                        )
                        }
                        {isVideoMuted ? (
                            <button onClick={onVolumePress}>
                                <HiVolumeOff className = 'text-black text-2xl lg-text-4xl xl:text-5xl absolute'/>
                            </button>
                        ) : (
                            <button onClick={onVolumePress}>
                                <HiVolumeUp className = 'text-black text-2xl lg-text-4xl xl:text-5xl absolute'/>
                            </button>
                        )
                        }
                    </div>
                )}
                </Link>
            </div>
        </div>
    </div>
  )
}

export default VideoCard