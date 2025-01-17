import React, { useState, useEffect, use } from 'react'
import Content from '../pages/Content'
import DatePicker from '../pages/Date'
import MonthPicker from '../pages/Month'
export default function Home({ data }) {
  const [fetchType, setFetchType] = useState(false)
  const [year, setyear] = useState('2024')
  const [month, setmonth] = useState('12')
  const [loadingContent, setLoading] = useState(false)
  const [url, setUrl] = useState('')
  const today = new Date();
  const currentYear = today.getFullYear();
  
  const currentMonth = today.getMonth() + 1;
  
  const formattedMonth = currentMonth.toString().padStart(2, '0');
  useEffect(() => {
    setyear(currentYear)
    setmonth(currentMonth)
    setUrl(`?y=`+currentYear+`&m=`+formattedMonth)
  },[])
  if (!data) {
    return (
      <div className='m-4'>
        <div class="border shadow rounded-md p-3 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-700 h-10 w-10"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                </div>
                <div class="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div></div>)
  }
  if (!data.admin) {
    return (
      <div className='m-4'>
        <div class="border font-semibold shadow rounded-md p-3 max-w-sm w-full mx-auto">
          Admins Login only
        </div></div>)
  }
  return (
    <div className='m-4 z-10'>
      <div class="border shadow rounded-md p-3 max-w-sm w-full mx-auto">
        <div class=" flex space-x-4">
          <div class="rounded-full bg-slate-700 h-10 w-10 overflow-hidden"><img src={process.env.REACT_APP_API_URL + `/proxy-image?url=${encodeURIComponent(data.user.pp)}`} /></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="space-y-2">
              <div class="grid grid-cols-3">
                <div class="h-2 text-[12px] text-gray-500 rounded col-span-2">{data.user.name}</div>
              </div>
              <div class="h-2 text-[12px] text-gray-400 rounded">{data.user.email}</div>
            </div>
          </div>
        </div>
      
      <div className='flex gap-2 mt-5'>
        <div className='flex items-center'>
          <button onClick={() => setyear(year-1)} className='text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-50 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:focus:ring-gray-500'><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
          <div className='bg-gray-50 rounded-lg text-sm mx-1 px-2 py-2'>{year}</div>
          <button onClick={() => setyear(currentYear>year?year+1:year)} className='text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-50 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:focus:ring-gray-500'><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0" /><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M4 12L20 12M20 12L14 18M20 12L14 6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g></svg></button>
        </div>
        <div className='flex items-center'>
          <button onClick={() => setmonth(month<2? 1: month-1)} className='text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-50 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:focus:ring-gray-500'><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
          <div className='bg-gray-50 rounded-lg text-sm mx-1 px-2 py-2'>{month}</div>
          <button onClick={() => setmonth((month>11 || (currentMonth === month && currentYear === year))? month: (month+1))} className='text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-50 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:focus:ring-gray-500'><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0" /><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M4 12L20 12M20 12L14 18M20 12L14 6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g></svg></button>
        </div>
        <button onClick={()=>{setUrl(`?y=`+year+`&m=`+(month.toString().padStart(2, '0')))}} className='text-gray-900 bg-gray-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-50 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-500'>
        {loadingContent ?(<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-1 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
        </svg>)
          :(<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0" /><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M4 12L20 12M20 12L14 18M20 12L14 6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g></svg>)}
        </button>
        </div>
      </div>
      <Content setLoading={setLoading} url={url} set={year+`/`+(month.toString().padStart(2, '0'))} />
    </div>
  )
}
