import React from 'react'
import  {footerList1, footerList2, footerList3} from '../utils/constants';

const List = ({items, mt} : {items:  string[], mt:boolean}) => (
  <div className= {`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
        {items.map((item) => (
          <p key = {item} className='text-gray-400 text-sm hover:underline cursor-pointer'>
            {item}
          </p>
        ))}
      </div>  
)

const Footer= () => {
  return (
    <div className='nt-6 hidden xl:block'>
      <div className='xl:border-b-2 pb-6 xl:border-gray-200'>
        <List items= {footerList1} mt={false}/>
      </div>  
      
      <div className='xl:border-b-2 pb-6 xl:border-gray-200'>
        <List items= {footerList2} mt ={true}/>
      </div>  
      
      <div className='xl:border-b-2 pb-6 xl:border-gray-200'>
        <List items= {footerList3} mt = {true}/>
      </div>  

    </div>
  )
}

export default Footer