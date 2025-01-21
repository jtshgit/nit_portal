import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const addSes = async (sestitle, selectedDate) => {
    return await axios.post(`${API_URL}/addses`, { sestitle, selectedDate }, { withCredentials: true });
};
export const getsesInfo = async (id) => {
    return await axios.post(`${API_URL}/getsesinfo`, { id }, { withCredentials: true });
};
export const addsubject = async (id, subject) => {
    return await axios.post(`${API_URL}/addsubject`, { id, subject }, { withCredentials: true });
};
export const addschd = async (id, schedule) => {
    return await axios.post(`${API_URL}/addschd`, { id, schedule }, { withCredentials: true });
};
export const fillatd = async (id, attendance) => {
    return await axios.post(`${API_URL}/fillatd`, { id, attendance }, { withCredentials: true });
};
export const changeSesDate = async (id, date) => {
    return await axios.post(`${API_URL}/changesesdate`, { id, date }, { withCredentials: true });
};
export const resetpass = async (email) => {
    return await axios.post(`${API_URL}/resetpass`, { email }, { withCredentials: true });
};
export const reset = async (otp, email, password) => {
    return await axios.post(`${API_URL}/resetconfirm`, { otp, email, password }, { withCredentials: true });
};
export const resetOtpCheck = async (otp, email) => {
    return await axios.post(`${API_URL}/resotpcheck`, { otp, email }, { withCredentials: true });
};
export const login = async (email, password) => {
    return await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
};
export const submitForm = async (name, type, url, sem, date,set, work,work2,branch) => {
    return await axios.post(`${API_URL}/submitform`, { name, type, url, sem , date,set, work,work2,branch}, { withCredentials: true });
};
export const updateForm = async (id,name, type, url, sem, date,set, work,work2,branch) => {
    return await axios.post(`${API_URL}/updateform`, {id, name, type, url, sem , date,set, work,work2,branch}, { withCredentials: true });
};

export const getContent = async (url) => {
    return await axios.get(url, { withCredentials: true });
};
export const getSubmitedContent = async (set) => {
    return await axios.post(`${API_URL}/getsubmitedcontent`,{set}, { withCredentials: true });
};
export const getProtected = async () => {
    return await axios.get(`${API_URL}/protected`, { withCredentials: true });
};