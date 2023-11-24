import React, {useState} from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import axios from 'axios'
import {SanityAssetDocument} from '@sanity/client'

import useAuthStore from '@/store/authStore'
import {client} from '../utils/client'

const Upload = () => {
  const [isLoading, setisLoading] = useState(false)
  const [videoAsset, setvideoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongFileType, setWrongFileType] = useState(false) 

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0]
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

    if(fileTypes.includes(selectedFile.type)){
      client.assets.upload('file', selectedFile, {contentType: selectedFile.type, filename: selectedFile.name})
      .then((data) => {
        setvideoAsset(data)
        setisLoading(false)
      })
    }else{
      setisLoading(false)
      setWrongFileType(true)
    }
  } 

  return (
    <div className='w-full h-full flex'>
      <div className='bg-white rounded-lg'>
        <div>
          <div>
            <p className='font-semibold text-2xl'>Upload a video</p>
            <p className='text-gray-500 text-md mt-1'>Upload a video from your device</p>
          </div>
          <div className='border-4 border-dashed rounded-xl flex flex-col justify-center items-center outline-none mt-10 cursor-pointer p-10 h-[450px] w-[300px] border-gray-400 hover:border-red-500 hover:bg-gray-100'>
            {isLoading ? (
              <p>
                Uploading...
              </p>
            ): (
              <div>
                {videoAsset ? (
                  <div>
                    <video src={videoAsset.url} loop controls className='rounded-xl h-[450px] mt-16 bg-black'>

                    </video>
                  </div>
                ):(
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className ="text-gray-300 text-6xl"/>
                        </p>
                        <p className='text-xl font-semibold'>
                          Upload a video
                        </p>
                      </div>
                      <p className='text-gray-400 text-center mt-10 text-small leading-10'>
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 10 GB
                      </p>
                      <p className='text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none bg-[#ed2647]'>
                        Select a file
                      </p>
                    </div>
                    <input type="file" name='upload-video' className='w-0 h-0' onChange={(e) => uploadVideo(e)} />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload