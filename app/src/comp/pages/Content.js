import React, { useState, useEffect, use } from 'react'
import { getContent, getSubmitedContent } from '../../api/ApiAtd';
import PushForm from './PushForm';

export default function Content({ setLoading, url, set }) {
    const [content, setContent] = useState([]);
    const [showAcc, setAcc] = useState(-1)

    useEffect(() => {
        if (!url) return;
        const verifyUser = async () => {
            setLoading(true)
            try {
                const API_URL = process.env.REACT_APP_API_URL;
                const response1 = await getContent(`${API_URL}/getcontent` + url);
                const response2 = await getSubmitedContent(set);
                const data1 = response1.data.data;
                const data2 = response2.data.subdata;
                data1.sort((b, a) => new Date(a.last_modified) - new Date(b.last_modified));
                await (data1).forEach(item1 => {
                    const match = (data2).some(item2 => item2.name === item1.file_name);
                    if (match) {
                        item1['present'] = true;
                    }
                });


                // if (response.data) {
                //     console.log(response.data)
                //     const data = response.data.data;
                setContent(data1);
                // }
            } catch (error) {
                alert('Something Went Wrong:', error);
            } finally {
                setLoading(false)
            }
        };
        verifyUser();
    }, [url]);
    return (
        <div>
            <>{content && content.map((item, key) => {
                return <div class="border shadow rounded-md p-3 pb-4 max-w-sm w-full mx-auto mt-2">
                    <div class="flex space-x-4">
                        <div class="flex-1 space-y-6 py-1 cursor-pointer" onClick={() => {!item.present && ((showAcc === key) ? setAcc(-1) : setAcc(key))}}>
                            <div class="space-y-2">
                                <div class="grid grid-cols">
                                    <div class=" text-[12px] text-gray-500 rounded col-span-2">{item.file_name}</div>
                                </div>
                                <div class="h-2 text-[12px] text-gray-400 rounded">{item.last_modified}</div>
                            </div>
                        </div>
                        {item.present?(<div class="rounded-full bg-yellow-100 h-10 w-10 flex items-center">
                            <svg className={"w-8 h-8 ml-1 text-white "} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 13L10 16L17 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> </g></svg>
                        </div>):
                        (<div class="rounded-full bg-slate-700 h-10 w-10 flex items-center" onClick={() => { (showAcc === key) ? setAcc(-1) : setAcc(key) }}>
                            <svg className={"w-5 h-5 ml-2.5 text-white " + (((showAcc === key) || item.present) && ("transform rotate-180"))} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7"></path></svg>
                        </div>)}
                    </div>
                    <div class="">
                        <div class="relative overflow-hidden transition-all max-h-0 duration-300" x-ref="container2" style={{ maxHeight: ((showAcc === key) && "500px") }}>
                            <div class="mt-4">
                                {(showAcc === key) ? <PushForm item={item} set={set} setAcc={setAcc} setContent={setContent}/> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            })}</>

        </div>
    )
}
