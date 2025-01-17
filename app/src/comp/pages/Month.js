import React, { useState, useEffect } from "react";

const MonthPicker = ({ onChange, date }) => {
  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [datepickerValue, setDatepickerValue] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, []);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const initDate = () => {
    if(date){
      setSelectedDate(date);
      setDatepickerValue(date);
      if (onChange) {
        onChange(date);
      }
      return;
    }
    const today = new Date();
    setSelectedDate(today);
    const formattedDate = formatDateForDisplay(today);
    setDatepickerValue(formattedDate);

    // Pass the current date to the parent component
    if (onChange) {
      onChange(formattedDate);
    }
  };

  const formatDateForDisplay = (date) => {
    const formattedDate = ("0" + date.getDate()).slice(-2);
    const formattedMonth = ("0" + (date.getMonth() + 1)).slice(-2);
    const formattedYear = date.getFullYear();
    return `${formattedDate}-${formattedMonth}-${formattedYear}`;
  };

  const getDateValue = (date) => {
    const selected = new Date(year, month, date);
    setSelectedDate(selected);
    const formattedDate = formatDateForDisplay(selected);
    setDatepickerValue(formattedDate);
    setShowDatepicker(false);

    // Pass the selected date to the parent component
    if (onChange) {
      onChange(formattedDate);
    }
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();

    const blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const closeDate = (e) => {
    // Close modal if clicked outside the modal content
    if (e.target.id === "authentication-date") {
      setShowDatepicker(false);
    }
  };
  return (
    <div className="relative">
      <input
        type="text"
        onClick={() => setShowDatepicker(!showDatepicker)}
        value={datepickerValue}
        readOnly
        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
        placeholder="Select date"
      />
      {showDatepicker && (
        <div id="authentication-date" onClick={closeDate} className="bg-white mt-2 rounded-lg shadow p-4 absolute z-10 top-10 left-0" style={{ width: "17rem" }}>
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
              <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
            </div>
            <div>
              <button
                type="button"
                onClick={handlePrevMonth}
                className="focus:outline-none transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 p-1 rounded-full"
              >
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="focus:outline-none transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 p-1 rounded-full"
              >
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19l7-7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap mb-3 -mx-1">
            {DAYS.map((day, index) => (
              <div key={index} style={{ width: "14.26%" }} className="px-0.5">
                <div className="text-gray-800 font-medium text-center text-xs">{day}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap -mx-1">
            {blankDays.map((_, index) => (
              <div
                key={index}
                style={{ width: "14.28%" }}
                className="text-center border p-1 border-transparent text-sm"
              ></div>
            ))}
            {noOfDays.map((date, index) => (
              <div key={index} style={{ width: "14.28%" }} className="px-1 mb-1">
                <div
                  onClick={() => getDateValue(date)}
                  className="cursor-pointer text-center py-2 text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 hover:bg-gray-200"
                >
                  {date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthPicker;
