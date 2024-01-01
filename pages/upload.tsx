import React, {useState} from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import axios from 'axios'
import {SanityAssetDocument} from '@sanity/client'
import { topics } from '@/utils/constants'
import useAuthStore from '@/store/authStore'
import {client} from '../utils/client'
import { BASE_URL } from '@/utils'

const Upload = () => {
  const [isLoading, setisLoading] = useState(false)
  const [videoAsset, setvideoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongFileType, setWrongFileType] = useState(false) 
  const [caption, setcaption] = useState("")
  const [category, setcategory] = useState(topics[0].name)
  const [savingPost, setsavingPost] = useState(false)
  const {userProfile}: {userProfile: any} = useAuthStore()
  const router = useRouter()

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

  const handlePost = async () => {
    if(caption && videoAsset?._id && category){
      setsavingPost(true);
    }

    const document = {
      _type: 'post',
      caption,
      video:{
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset?._id
        }
      },
      userId: userProfile?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id
      },
      topic: category
    }

    await axios.post(`${BASE_URL}/api/post`, document)

    router.push('/')

  }

  return (
    <div className='w-full h-full flex absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[F8F8F8] justify-center'>
      <div className='bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
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
            {wrongFileType && (
              <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250ox]'>
                Please select a video file
              </p>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-3 pb-10'>
            <label className='text-md font-medium'>Caption</label>
            <input type="text"  onChange={(e) => {setcaption(e.target.value)}} className='rounded outline-none text-md border-2 border-gray-200 p-2' 
            />
            <label className='text-md font-medium'>Choose a category</label>
            <select className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer' 
              onChange={(e) => {setcategory(e.target.value)}}
            >
              {
                topics.map((topic) => (
                  <option key={topic.name} value={topic.name} className='outline-none capitalize bg-white text-gray-600 text-md hover:bg-slate-300 p-2'>
                    {topic.name}
                  </option>
                ))
              }
            </select>
            <div className='flex gap-6 mt-10'>
              <button onClick={() => {}} type="button" className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'>
                Discard
              </button>
              <button onClick={() => {handlePost()}} type="button" className='bg-[#ed2647] text-md font-medium p-2 rounded w-28 lg:w-44 outline-none text-white'>
                Post
              </button>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Upload