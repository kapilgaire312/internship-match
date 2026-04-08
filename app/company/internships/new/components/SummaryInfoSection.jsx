export default function SummaryInfoSection() {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl px-5 mr-5 py-4 ">
      <div>
        <div></div>
        <div className="text-xl font-semibold">Summary Information</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col ">
          <div className="text-[1.1rem] font-semibold">Internhip Title</div>
          <input
            className="border py-1.5 px-2 rounded text-md"
            placeholder="e.g. Software Engineering Intern"
          />
        </div>
        <div className="flex gap-4 ">
          <div className="w-full">
            <div className="flex flex-col ">
              <div className="text-[1.1rem] font-semibold">
                Monthly Salary (NRs)
              </div>
              <input
                className="border py-1.5 px-2 rounded text-md no-spinner"
                placeholder="e.g. 15000"
                type="text"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col ">
              <div className="text-[1.1rem] font-semibold">Level</div>
              <select className="border py-1.5 px-2 rounded text-md">
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
            <div className="flex flex-col ">
              <div className="text-[1.1rem] font-semibold">Work Model</div>
              <select className="border py-1.5 px-2 rounded text-md">
                <option value="Beginner">Remote</option>
                <option value="Medium">On site</option>
                <option value="Experienced">Hybrid</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col ">
              <div className="text-[1.1rem] font-semibold">Location</div>
              <input
                className="border py-1.5 px-2 rounded text-md no-spinner"
                placeholder="e.g. Kathmandu"
                type="text"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>{" "}
        <div className="flex gap-4 ">
          {" "}
          <div className="w-full">
            <div className="flex flex-col ">
              <div className="text-[1.1rem] font-semibold">Openings</div>
              <input
                className="border py-1.5 px-2 rounded text-md no-spinner"
                placeholder="e.g. 4"
                type="text"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col ">
              <div className="text-[1.1rem] font-semibold">
                Application Deadline
              </div>
              <input
                className="border py-1.5 px-2 rounded text-md no-spinner"
                placeholder="e.g. Kathmandu"
                type="text"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
