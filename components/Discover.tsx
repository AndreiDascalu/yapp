import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";

import {topics} from '../utils/constants'

const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#ed2647] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#ed2647]'
const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black'



const Discover = () => {
    const router = useRouter();
    const { topic } = router.query;

    return (
      <div className='xl:border-b-2 pb-6 xl:border-gray-200'>
        <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
          Popular Topics
        </p>
        <div className='flex gap-3 flex-wrap flex-col xl:flex-col'>
          {topics.map((item) => (
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div className={topic === item.name ? activeTopicStyle :topicStyle}>
                <span className='font-bold text-2xl xl:text-md'>
                  {item.icon}
                </span>
                <span className='font-medium text-md hidden xl:block capitalize'>
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

export default Discover