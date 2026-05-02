"use client";

import handleRegisterAction from "@/actions/handleRegisterAction";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function RegisterForm({ role }) {
  const [error, setError] = useState();
  const { pending } = useFormStatus();
  const [typedValues, setTypedValues] = useState({ name: "", email: "" });
  console.log(role);

  async function handleSubmit(formdata) {
    const response = await handleRegisterAction(formdata, role);
    console.log(response);
    if (response?.error) {
      setError(response);
    }
  }
  return (
    <form
      className="flex flex-col gap-3 text-xl sm:text-2xl"
      action={handleSubmit}
    >
      {" "}
      <div>
        {" "}
        <label htmlFor="name" className="block">
          {role === "student" ? "Full name:" : "Company name:"}
        </label>
        <input
          className={`border shadow-md rounded w-[90%] h-9 sm:text-xl ${error?.path === "name" && "border-red-500"} p-2`}
          id="name"
          name="name"
          value={typedValues?.name}
          onChange={(e) => {
            setTypedValues({ ...typedValues, name: e.target.value });
            setError(null);
          }}
        />
      </div>
      <div>
        {" "}
        <label htmlFor="email" className="block">
          Email:
        </label>
        <input
          className={`border shadow-md rounded w-[90%] h-9 sm:text-xl ${error?.path === "email" && "border-red-500"} p-2`}
          id="email"
          name="email"
          value={typedValues?.email}
          onChange={(e) => {
            setTypedValues({ ...typedValues, email: e.target.value });
            setError(null);
          }}
        />
      </div>
      <div>
        {" "}
        <label htmlFor="password" className="block">
          Password:
        </label>
        <input
          className={`border shadow-md rounded w-[90%] h-9 sm:text-xl ${error?.path === "password" && "border-red-500"} p-2`}
          type="password"
          id="password"
          name="password"
          onChange={() => {
            setError(null);
          }}
        />
      </div>{" "}
      <div>
        {" "}
        <label htmlFor="cpassword" className="block">
          Confirm password:
        </label>
        <input
          className="border shadow-md rounded w-[90%] h-9 p-2"
          type="password"
          id="cpassword"
          name="cpassword"
        />
      </div>
      <div className=" mt-3 mb-1">
        <div className="flex justify-center text-center">
          {" "}
          {error && (
            <p className="text-[1rem] text-red-500 max-w-50 ">
              {error?.message}
            </p>
          )}
        </div>{" "}
        <button
          type="submit"
          className="border-2 py-1 px-2.5 rounded-xl bg-blue-600 text-white w-[90%]"
          disabled={pending}
        >
          Register
        </button>
      </div>
    </form>
  );
}
