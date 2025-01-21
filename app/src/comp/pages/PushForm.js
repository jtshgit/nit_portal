import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { submitForm,updateForm } from '../../api/ApiAtd';
const subject = {

    "1037": "Artificial Intelligence and Data Science",
    "1024": "Artificial Intelligence and Machine Learning",
    "1010": "Civil Engineering",
    "1011": "Computer Science and Engineering",
    "1016": "Electrical Engineering",
    "1013": "Electronics and Communication Engineering",
    "1014": "Industrial Internet of Things",
    "1015": "Information Technology",
    "1036": "Mathematics and Computing",
    "1035": "Mechanical Engineering",
    "1038": "Microelectronics and VLSI Engineering",
    "1026": "Production and Industrial Engineering",
    "1039": "Robotics and Automation",
    "1040": "Sustainable Energy Technologies"

}
export default function PushForm({ item, set, setAcc, setContent }) {
    let newname = item.present? item.dataname: ((item.file_name).replaceAll("-", " ").replaceAll("_", " ").replaceAll(".pdf", ""))
    const [timer, setTimer] = useState(3);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [name, setname] = useState(newname);
    const [type, setType] = useState(item.type? item.type:"updates");
    const [work, setWork] = useState('none');
    const [work2, setwork2] = useState(item.work2? item.work2:"Btech");
    const [branch, setbranch] = useState(item.branch? item.branch:'all');
    const [sem, setSem] = useState(item.sem? item.sem:'all');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitModal, setsubmitModal] = useState(false);
    useEffect(() => {
        let interval;
        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            submitFormat();
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timer]);

    const startTimer = () => {
        setIsTimerRunning(true);
        setIsCancelled(false); // Reset cancel state
    };

    const cancelTimer = () => {
        setIsTimerRunning(false);
        setIsCancelled(true);
        setTimer(4);
        setsubmitModal(false)
    };
    const submitFormat = () => {
        if (!isCancelled) {
            submitData();
        }
    };
    const submitData = async () => {
        setSubmitLoading(true)
        setsubmitModal(false)
        try {
            let response = {}
            if(item.present){
                response = await updateForm(item.id,name, type, item.url, sem, item.last_modified, set, work, work2, branch);
            }else{
             response = await submitForm(name, type, item.url, sem, item.last_modified, set, work, work2, branch);
            }
            if (response.data.success) {
                setAcc(-1)
                item['id'] = response.data.data._id;
                item['present'] = true;
                item['setup'] = response.data.data.setup;
                item['dataname'] = response.data.data.name;
                item['work2'] = response.data.data.work2;
                item['sem'] = response.data.data.sem;
                item['type'] = response.data.data.type;
                item['branch'] = response.data.data.branch;
            } else {
                alert("Something went Wrong")
            }
        } catch (error) {
            alert(error)
        } finally {
            setSubmitLoading(false)
        }
    }
    return (
        <div>
            <a href={item.url} target='_blanck' type="button" class="gap-2 text-gray-900 bg-white hover:bg-gray-100 border border-slate-300 focus:ring-0 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2">
                <svg className='h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.335 11.4069L22.2682 11.0474L21.335 11.4069ZM21.335 12.5932L20.4018 12.2337L21.335 12.5932ZM2.66492 11.4068L1.73175 11.0474L2.66492 11.4068ZM2.66492 12.5932L1.73175 12.9526L2.66492 12.5932ZM3.5981 11.7663C4.89784 8.39171 8.17084 6 12 6V4C7.31641 4 3.31889 6.92667 1.73175 11.0474L3.5981 11.7663ZM12 6C15.8291 6 19.1021 8.39172 20.4018 11.7663L22.2682 11.0474C20.681 6.92668 16.6835 4 12 4V6ZM20.4018 12.2337C19.1021 15.6083 15.8291 18 12 18V20C16.6835 20 20.681 17.0733 22.2682 12.9526L20.4018 12.2337ZM12 18C8.17084 18 4.89784 15.6083 3.5981 12.2337L1.73175 12.9526C3.31889 17.0733 7.31641 20 12 20V18ZM20.4018 11.7663C20.4597 11.9165 20.4597 12.0835 20.4018 12.2337L22.2682 12.9526C22.5043 12.3396 22.5043 11.6604 22.2682 11.0474L20.4018 11.7663ZM1.73175 11.0474C1.49567 11.6604 1.49567 12.3396 1.73175 12.9526L3.5981 12.2337C3.54022 12.0835 3.54022 11.9165 3.5981 11.7663L1.73175 11.0474Z" fill="#000000"></path> <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> </g></svg>
                View Document
            </a>
            <textarea onChange={(e) => { setname(e.target.value) }} className='w-full border border-slate-300 rounded-lg text-xs px-3 py-2'>{name}</textarea>
            <div class="mb-2 relative w-full border border-slate-300 rounded-lg text-xs px-3 py-2">
                <label for="frm-whatever" class="sr-only">My field</label>
                <select onChange={(e) => { setType(e.target.value) }} class="appearance-none bg-white w-full" name="whatever" id="frm-whatever">
                    <option value="updates" selected>News</option>
                    <option value="results" selected={item.type === "results"}>Result</option>
                    <option value="datesheet"  selected={item.type === "datesheet"}>Date-Sheet</option>
                    <option value="tt" selected={item.type === "tt"}>Time-Table</option>
                    <option value="acalender" selected={item.type === "acalender"}>Acd. Calender</option>
                </select>
                <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>

            </div>
            <div class="relative w-full border border-slate-300 rounded-lg text-xs px-3 py-2">
                <label for="frm-whatever2" class="sr-only">My field</label>
                <select onChange={(e) => { setSem(e.target.value) }} class="appearance-none bg-white w-full" name="whatever" id="frm-whatever2">
                    <option value="all" selected>For all</option>
                    {Array.from({ length: 8 }, (_, i) => (
                        <option key={i + 1} value={i + 1} selected={item.sem !== "all" && (parseInt(i + 1) === parseInt(item.sem))}>{i + 1}</option>
                    ))}
                </select>
                <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            <div class="mt-2 relative w-full border border-slate-300 rounded-lg text-xs px-3 py-2">
                <label for="frm-whatever2" class="sr-only">My field</label>
                <select onChange={(e) => { setbranch(e.target.value) }} class="appearance-none bg-white w-full" name="whatever" id="frm-whatever2">
                    <option value="all" selected>For all</option>
                    {Object.entries(subject).map(([id, name]) => (
                        <option value={id} selected={item.branch !== "all" && (parseInt(id) === parseInt(item.branch))}>{name}</option>
                    ))}

                </select>
                <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            <div class="mt-2 relative w-full border border-slate-300 rounded-lg text-xs px-3 py-2">
                <label for="frm-whatever2" class="sr-only">My field</label>
                <select onChange={(e) => { setwork2(e.target.value) }} class="appearance-none bg-white w-full" name="whatever" id="frm-whatever2">
                    <option value="all" >For all</option>
                    <option value="Btech" selected>BTECH</option>
                    <option value="Mtech" selected={item.work2 === "Mtech"}>Mtech</option>
                    <option value="MSc" selected={(item.work2 === "MSc")}>MSC</option>
                    <option value="MCA"  selected={item.work2 === "MCA"}>MCA</option>
                </select>
                <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            {type === "results" && (<>
            </>)}
            <button onClick={() => setsubmitModal(true)} type="button" class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                {submitLoading ? (<><svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                    Submitting...</>) : ("Submit")}
            </button>
            {submitModal && (<div className='fixed top-0 left-0 flex items-center h-full w-full'>
                <div class=" rounded-2xl border border-blue-100 w-full bg-white p-4 shadow-lg sm:p-6 lg:p-8 m-4" style={{ zIndex: "1000px" }} role="alert">
                    <div class="flex items-center gap-4 w-full">
                        <span class="shrink-0 rounded-full bg-blue-400 p-2 text-white">
                            <svg
                                class="size-4"
                                fill="currentColor"
                                viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clip-rule="evenodd"
                                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                    fill-rule="evenodd"
                                />
                            </svg>
                        </span>

                        <p class="font-medium sm:text-lg">Confirm Submition!</p>
                    </div>

                    <p class="mt-4 text-gray-500">
                        {(item.file_name).replaceAll("-", " ").replaceAll("_", " ").replaceAll(".pdf", "")}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                        {item.last_modified}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                        for {sem}, type: {type}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                        branch: {subject[branch]}
                    </p>


                    <div class="mt-6 sm:flex sm:gap-4">
                        <a onClick={startTimer} class="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                        >
                            {isTimerRunning ? timer : "Submit"}
                        </a>

                        <a onClick={cancelTimer} class="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </a>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
