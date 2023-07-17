import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
// import { BaseGridSerializingSession } from "ag-grid-community";
// import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-toastify";

export default function SignIn() {
  const notificationMethods = [
    { id: "company", title: "Company" },
    { id: "student", title: "Student" },
    { id: "coordinator", title: "Coordinator" },
    { id: "admin", title: "Admin" },
    // { id: "alumn", title: "Alumn"}
  ];

  const { login, error } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
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
    login({ username, password }); //role bhejne ki need nhi ill correct it later
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
            <p className="m-3 text-gray-900 font-serif text-justify">
              The Training and Placement cell of NIT PATNA forms an integral
              part in shaping the careers of the students of the institute. It
              organizes and coordinates campus placement program to fulfill its
              commitment of a job to every aspirant. Not only that it also
              encourages and works towards the continuing education for the
              college employees.
            </p>
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md h-screen backdrop-opacity-60 bg-white/30 ">
          <div className="py-8 mt-5 shadow sm:rounded-lg sm:px-10 g-blur-md h-[35rem] p-7">
            <div>
              <h1 className="mt-2 text-center text-3xl font-bold font-sans pb-7 text-black ">
                Login
              </h1>
              {/* <label
                htmlFor="role"
                className="block text-sm font-medium text-slate-700 py-2"
              >
                Account Type
              </label>
              <select
                name="role"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm mb-3"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="company">Company</option>
                <option value="student">Student</option>
                <option value="coordinator">Coordinator</option>
              </select> */}
            </div>
            <form
              className="space-y-5"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    name="username"
                    placeholder="Username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm "
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-800"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="Password"
                    type={passwordShown ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  <div
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-2 flex items-center leading-5 cursor-pointer  text-orange-600 px-2 py-1 rounded-md text-sm"
                  >
                    {passwordShown ? "Hide" : "Show"}
                  </div>
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
                  Sign in
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
