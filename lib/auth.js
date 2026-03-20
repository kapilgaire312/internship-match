import NextAuth from "next-auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user-model";
import CustomError from "@/utils/CustomError";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          //connect ot db
          await dbConnect();
          //find the user
          user = await User.findOne({ email: credentials.email });

          if (!user) return null;

          //check password

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isMatch) return null;
          //get the user id and user role
          const user_id = user._id.toString();
          const user_role = user.role;
          //returning user
          return {
            userId: user_id,
            email: credentials.email,
            role: user_role, //by default we can only save email and id, to save others we need to use callbacks.
          };
        } catch (error) {
          console.log(error);
          throw new Error("SERVER_ERROR");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //user exists only in first login(when authhorize returns user), so add the role when user logs in.
        token.role = user.role;
        token.userId = user.userId;
      }
      return token; //used to store secure token data
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.userId = token.userId;
      }
      return session; //session object is sent to the frontend. so is used to control what client can see
    },
  },
});
///**********how the return and error throwing works ********/////////////
//you return null or a user object from the authorize
//when null is returned, auth js takes it as throwing CredentialsSignin. and the response on signIn is:{ ok: false, error: "CredentialsSignin", status: 401 }
//when a new Error is thrown, the response on signIn is: { ok: false, error: "error meassage", status: 401 }
//when a user is returned, it is {ok:true}
// and if a user is returned, auth js creates a jwt token to store the user data and can be accessed with useSession. *it is not returned to signIn.
//
// here we are send our own error for user not found and wrong password. and new error if something goes wrong in server.
// another way, when not using customerror is return null on no user or wrong pass and to check if res.error = 'CredentialsSignin' and
// in catch throwing new error mesage like ServerError which can be looked in res.error for server errors.
//
//
//
//
//

//////***** callbacks**///
//User submits login form
//    ↓
//signIn("credentials")
//  ↓
//authorize() runs
// ↓
//User object returned
//  ↓
//jwt() callback runs
// ↓
//JWT token created/updated
// ↓
//session() callback runs
//  ↓
//Session sent to frontend
//
//
//Callbacks do not run once.

//Callback	Runs when
//authorize	login attempt
//jwt	login + every request
//session	whenever session is requested
