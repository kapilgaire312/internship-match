"use client";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function SummaryInfoSection() {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const dateInputRef = useRef(null);

  useEffect(() => {
    dateInputRef.current.value = selectedDate;
  }, [selectedDate]);
  return (
    <>
      {" "}
      <div className="flex flex-col gap-4 bg-white rounded-xl px-5 mr-5 py-4 ">
        <div className="border-b pb-2 border-gray-200">
          <div></div>
          <div className="text-xl font-semibold">Summary Information</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 ">
            <div className="text-[1.1rem] font-semibold">Internhip Title</div>
            <input
              className="border py-1.5 px-2 rounded text-md"
              placeholder="e.g. Software Engineering Intern"
              name="inpternshipTitle"
            />
          </div>
          <div className="flex gap-4 ">
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">
                  Monthly Salary (NRs)
                </div>
                <input
                  className="border py-1.5 px-2 rounded text-md "
                  placeholder="e.g. 15000"
                  type="number"
                  name="monthlySalary"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">Level</div>
                <select
                  className="border py-1.5 px-2 rounded text-md "
                  name="level"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Medium">Medium</option>
                  <option value="Experienced">Experienced</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-4 ">
            {" "}
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">Work Model</div>
                <select
                  className="border py-1.5 px-2 rounded text-md"
                  name="workModel"
                >
                  <option value="Beginner">Remote</option>
                  <option value="Medium">On site</option>
                  <option value="Experienced">Hybrid</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">Location</div>
                <input
                  className="border py-1.5 px-2 rounded text-md "
                  placeholder="e.g. Kathmandu"
                  type="text"
                  name="location"
                />
              </div>
            </div>
          </div>{" "}
          <div className="flex gap-4 ">
            {" "}
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">Openings</div>
                <input
                  className="border py-1.5 px-2 rounded text-md "
                  placeholder="e.g. 4"
                  type="number"
                  name="openings"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">
                  Application Deadline
                </div>
                <div className="border rounded ">
                  {" "}
                  <input
                    disabled
                    ref={dateInputRef}
                    name="applicationDeadline"
                    className="hidden"
                  />
                  <DatePicker
                    className="focus:outline-none focus:ring-0 cursor-pointer"
                    showIcon
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date)}
                    minDate={new Date().setDate(new Date().getDate() + 1)}
                    onKeyDown={(e) => e.preventDefault()}
                    onFocus={(e) => e.target.blur()}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
