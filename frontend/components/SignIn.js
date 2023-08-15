import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
// import { BaseGridSerializingSession } from "ag-grid-community";
// import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-toastify";
import { AiFillEye } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai'
export default function SignIn() {
  // const notificationMethods = [
  //   { id: "company", title: "Company" },
  //   { id: "student", title: "Student" },
  //   { id: "coordinator", title: "Coordinator" },
  //   { id: "admin", title: "Admin" },
  //   { id: "alumn", title: "Alumn"}
  // ];

  const { login, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("admin");
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);

  const [newReg, allowNewReg] = useState(true);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    fetch(`${API_URL}/api/setting`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        allowNewReg(data.data?.attributes?.registrations_allowed);
      })

      .catch((err) => {
        console.log(err);
        toast.error("Unable to fetch tpc_guidelines");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password }); //role bhejne ki need nhi i'll correct it later
  };

  return (
    <div className=" bg-cover bg-no-repeat ">
      <Nav />

      <div className="min-h-full md:flex md:flex-row cm:flex-col sm:px-6 lg:px-8 m-5">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
          <div className="sm:mx-auto sm:w-full sm:max-w-md backdrop-blur rounded-md p-7 mt-5 h-[35rem]">
            <div className=" text-center ">
              <Image
                className="mx-auto"
                width={100}
                height={100}
                alt="NIT Patna"
                src="/images/logo.png"
              />
            </div>

            <h2 className="mt-6 text-center text-3xl font-extrabold font-serif text-stone-800">
              Training and Placement Cell
            </h2>
            <h2 className="text-center font-extrabold text-3xl uppercase text-Black my-5">
              NIT Patna
            </h2>
            <p className="md:m-3 text-gray-900 font-serif text-justify">
              The Training and Placement cell of NIT PATNA forms an integral
              part in shaping the careers of the students of the institute. It
              organizes and coordinates campus placement program to fulfill its
              commitment of a job to every aspirant. Not only that it also
              encourages and works towards the continuing education for the
              college employees.
            </p>
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md h-screen backdrop-opacity-60 bg-white/30">
          <div className="py-8 mt-5 shadow sm:rounded-lg sm:px-10 g-blur-md h-[35rem] p-7 glass">
            <div>
              <h1 className="mt-2 text-center text-3xl font-bold font-sans pb-7 text-black ">
                Login
              </h1>
            </div>
            <form
              className="space-y-5"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="text" name="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none border-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
                    placeholder=""
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required />
                  <label htmlFor="username" className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
              </div>

              <div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type={`${passwordShown ? 'text' : 'password'}`} name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none border-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " value={password}
                    onChange={e => setPassword(e.target.value)}
                    id="password"
                    autoComplete="current-password"
                    required />
                  <div
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-2 flex items-center leading-5 cursor-pointer  text-black px-2 py-1 rounded-md text-sm"
                  >
                    {passwordShown ? <AiFillEye className="text-xl" /> : <AiFillEyeInvisible className="text-xl" />}
                  </div>
                  <label htmlFor="password" className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/account/forgotPassword">
                    <a className="font-medium text-yellow-600 hover:text-orange-500">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  {loading && (<>
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mt-1 mx-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="black" />
                    </svg></>)}
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
            </form>

            <div>
              {newReg ? (
                <p className="p-3 text-white">
                  Or{" "}
                  <Link href="/account/studentRegistration">
                    <a className=" text-yellow-500 hover:text-orange-500 font-bold">
                      Student Registration
                    </a>
                  </Link>
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              {newReg ? (
                <p className="p-3">
                  Or{" "}
                  <Link href="/account/RecruiterSignUp">
                    <a className=" text-yellow-500 hover:text-orange-500 font-bold">
                      Company Registration
                    </a>
                  </Link>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
