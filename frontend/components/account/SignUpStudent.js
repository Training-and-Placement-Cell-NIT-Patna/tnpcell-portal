import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function SignUpStudent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allowNewReg, setAllowNewReg] = useState(false);
  const { register } = useContext(AuthContext);
  useEffect(() => {
    fetch(`${API_URL}/api/setting`)
      .then((res) => res.json())
      .then((data) => {
        setAllowNewReg(data.data?.attributes?.registrations_allowed);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmEmail !== email) {
      toast.error("Emails do not match!");
      return;
    }
    if (password !== confirmPassword && email !== "" && username !== "") {
      toast.error("Passwords do not match!");
      return;
    }
    if (!allowNewReg) {
      toast.info("Registrations are closed Right Now!");
      return;
    }
    register({ username, email, password });
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-auto text-center">
            <Image
              className="mx-auto"
              width={100}
              height={100}
              alt="NIT Patna"
              src="/images/logo.png"
            />
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Training and Placement Cell
          </h2>
          <h2 className="text-center font-extrabold text-3xl uppercase">
            NIT Patna
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            New Student Registration Or{" "}
            <Link href="/loginPage">
              <a className="font-medium text-yellow-600 hover:text-yellow-500">
                Login
              </a>
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <p className="text-red-500">{allowNewReg ? '' : 'Registrations are closed Right Now!'}</p>
          <div className="bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    id="username"
                    name="username"
                    maxLength={7} //2006001
                    minLength={7}
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    placeholder="Roll Number"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    id="email"
                    name="email"
                    pattern=".+@nitp\.ac\.in"
                    type="password"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    placeholder="Institute email address"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Email
                </label>
                <div className="mt-1">
                  <input
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value.toLowerCase())}
                    id="confirmEmail"
                    name="confirmEmail"
                    pattern=".+@nitp\.ac\.in"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    placeholder="Institute email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                  <small className="block">
                    Must contain at least one number and one uppercase and
                    lowercase letter, and least 8 characters
                  </small>
                </label>
                <div className="mt-1">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    //  pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    type="password"
                    placeholder="strong password is recommended"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirmPassword"
                    name="confirmPassword"
                    //  pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    type="password"
                    autoComplete="current-password"
                    placeholder="Confirm Password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  disabled={!allowNewReg}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
