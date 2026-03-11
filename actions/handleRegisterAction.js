"use server";

import { ZodError } from "zod";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user-model";
import bcrypt from "bcrypt";
import StudentProfile from "@/lib/models/studentProfile-model.js";
import CompanyProfile from "@/lib/models/companyProfile-model";
import CustomError from "@/utils/CustomError";
import { registerSchema } from "@/lib/utils/auth.validation";
import { redirect } from "next/navigation";

export default async function handleRegisterAction(formData, role = "student") {
  try {
    const data = Object.fromEntries(formData.entries()); // converting form data into js object, which zod accepts.

    //validate the data
    if (data.password != data.cpassword)
      throw new CustomError("Passwords don't match.", "err"); //calling the custom error to catch it effectively in the catch block

    //throw new Error("Passwords don't match.");
    const parsedData = registerSchema.parse(data);
    const { name, email, password } = parsedData;

    //connect to db
    await dbConnect();

    //create user and save user id and name in profile
    const user = await createUser(email, password, role);
    await saveProfile(role, user, name);
    await user.save();
  } catch (error) {
    //catch and return zoderror
    if (error instanceof ZodError) {
      return {
        error: true,
        message: error.issues[0].message,
        path: error.issues[0].path[0],
      };
    }

    //catch and return error thrown by myself.
    if (error.name === "CustomError")
      return {
        error: true,
        message: error.message,
        path: "password",
      };

    // catch and return the unexpected errors
    console.log(error);

    return { error: true, message: "Account registration failed." };
  }

  //redirect if not errors are found. it is outsied the try block as it throws exceprion internally.
  redirect("/login");
}

async function saveProfile(role, user, name) {
  if (role === "student") {
    const studentProfile = await StudentProfile.create({
      student_id: user._id,
      name,
    });
    studentProfile.save();
    console.log(studentProfile);
  } else if (role === "company") {
    const companyProfile = await CompanyProfile.create({
      company_id: user._id,
      name,
    });
    companyProfile.save();
  }
}

async function createUser(email, password, role) {
  //check if email is already used
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new CustomError("User with that email already exists.");

  //hash password and create a user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, role });

  console.log(user);
  return user;
}
