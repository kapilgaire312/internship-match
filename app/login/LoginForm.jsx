"use client";

import handleLoginAction from "@/actions/handleLoginAction";
import LoadingButton from "@/components/ui/LoadingButton";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  const [error, setError] = useState();
  const { pending } = useFormStatus();
  const [typedEmail, setTypedEmail] = useState("");
  async function handleSubmit(formData) {
    const res = await handleLoginAction(formData);
    console.log(res);
    if (res?.error) {
      setError(res);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-3 text-xl sm:text-2xl"
    >
      <div>
        {" "}
        <label htmlFor="email" className="block">
          email:
        </label>
        <input
          className={`border shadow-md rounded w-[90%] h-9 sm:text-xl ${error?.path === "email" && "border-red-500"} p-2 `}
          id="email"
          name="email"
          value={typedEmail}
          onChange={(e) => {
            setTypedEmail(e.target.value);
          }}
        />
      </div>

      <div>
        {" "}
        <label htmlFor="password" className="block">
          password:
        </label>
        <input
          className={`border shadow-md rounded w-[90%] h-9 sm:text-xl ${error?.path === "password" && "border-red-500"} p-2`}
          type="password"
          id="password"
          name="password"
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
          className="border-2 py-1 px-2.5 rounded-xl bg-blue-600 text-white w-[90%] cursor-pointer"
          disabled={pending}
        >
          Login{" "}
          <LoadingButton
            initialValue={"Login"}
            pendingValue={"Logging in"}
            isPending={pending}
          />
        </button>
      </div>
    </form>
  );
}
