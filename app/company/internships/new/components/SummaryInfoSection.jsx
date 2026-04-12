"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function SummaryInfoSection({ rawData, errorMessageArray }) {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  console.log(rawData);

  const [originalErrors, setOriginalErrors] = useState(new Map());
  const [error, setError] = useState(new Map());
  useEffect(() => {
    if (errorMessageArray) {
      const errors = new Map(
        errorMessageArray?.map((item) => {
          return [item.field, item.message];
        }),
      );
      setError(errors);
      setOriginalErrors(errors);
    }
  }, [errorMessageArray]);
  console.log("errorsl", error);

  useEffect(() => {
    console.log("errorsl", error);
  }, [error]);

  function removeErrorMessage(key) {
    const newErrors = new Map(error);
    newErrors.delete(key);
    setError(newErrors);
  }

  function addErrorMessage(key) {
    if (!error.has(key)) {
      if (originalErrors?.has(key)) {
        const newErrors = new Map(error);
        newErrors.set(key, originalErrors.get(key));
        setError(newErrors);
      }
    }
  }

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
              className={`border py-1.5 px-2 rounded text-md  ${error.get("internshipTitle") && "border-red-400 focus:outline-none"}`}
              placeholder="e.g. Software Engineering Intern"
              name="internshipTitle"
              defaultValue={rawData?.internshipTitle}
              onChange={(e) => {
                if (e.target.value !== rawData?.internshipTitle)
                  removeErrorMessage("internshipTitle");
                else addErrorMessage("internshipTitle");
              }}
            />
            <span className="text-sm text-red-400">
              {error.get("internshipTitle")}
            </span>
          </div>
          <div className="flex gap-4 ">
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">
                  Monthly Salary (NRs)
                </div>
                <input
                  className={`border py-1.5 px-2 rounded text-md  ${error.get("internshipTitle") && "border-red-400 focus:outline-none"}`}
                  placeholder="e.g. 15000"
                  type="number"
                  name="monthlySalary"
                  defaultValue={rawData?.monthlySalary}
                  onChange={(e) => {
                    if (e.target.value !== rawData?.internshipTitle)
                      removeErrorMessage("internshipTitle");
                    else addErrorMessage("internshipTitle");
                  }}
                />
                <span className="text-sm text-red-400">
                  {error.get("monthlySalary")}
                </span>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">Level</div>
                <div className="border py-1.5 px- rounded text-md">
                  {" "}
                  <Select defaultValue={"Beginner"} name="level">
                    <SelectTrigger className="w-full py-1.5 px-2 rounded text-md border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>{" "}
                      <SelectItem value="Experienced">Experienced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 ">
            {" "}
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">Work Model</div>
                <div className="border py-1.5 px- rounded text-md">
                  {" "}
                  <Select defaultValue={"remote"} name="workModel">
                    <SelectTrigger className="w-full py-1.5 px-2 rounded text-md border-none">
                      <SelectValue placeholder="Theme" />{" "}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="on-site">On site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">Location</div>
                <input
                  className={`border py-1.5 px-2 rounded text-md  ${error.get("internshipTitle") && "border-red-400 focus:outline-none"}`}
                  placeholder="e.g. Kathmandu"
                  type="text"
                  name="location"
                  defaultValue={rawData?.location}
                  onChange={(e) => {
                    if (e.target.value !== rawData?.internshipTitle)
                      removeErrorMessage("internshipTitle");
                    else addErrorMessage("internshipTitle");
                  }}
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
                  className={`border py-1.5 px-2 rounded text-md  ${error.get("internshipTitle") && "border-red-400 focus:outline-none"}`}
                  placeholder="e.g. 4"
                  type="number"
                  name="openings"
                  defaultValue={rawData?.openings}
                  onChange={(e) => {
                    if (e.target.value !== rawData?.internshipTitle)
                      removeErrorMessage("internshipTitle");
                    else addErrorMessage("internshipTitle");
                  }}
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
                    type="hidden"
                    name="applicationDeadline"
                    value={selectedDate.toISOString()}
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
