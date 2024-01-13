import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "@/config/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [role, setRole] = useState("student");
  // const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //register user
  const register = async (user) => {
    const res = await fetch(`${API_URL}/api/student/register-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      setRole(data.role);
      toast.success("Registration Successful!");
      toast.success("Please check your email to verify your account.");
      // redirect after 3 seconds
      setTimeout(() => {
        router.push("/loginPage");
      }, 3000);
    } else {
      const data = await res.json();

      toast.error("Registration Failed!");
      toast.error(data?.error?.message);
    }
  };

  // fetch(`${NEXT_URL}/api/register`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(user),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data.message.status === 400) {
  //       toast.error(data.message.message)
  //     } else {
  //       setUser(data)
  //       setRole(data.role)
  //       toast.success('Successfully Registered')
  //       // redirect after 3 seconds
  //       setTimeout(() => {
  //         router.push('/student/profile')
  //       }, 3000)
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   }

  //login user
  const login = async ({ username: identifier, password }) => {
    setLoading(true);
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setRole(data.role);
      if (data.role === "student") {
        router.push("student/profile");
        setLoading(false);
      } else if (data.role === "admin") {
        router.push("admin/home");
        setLoading(false);
      } else if (data.role === "coordinator") {
        router.push("coordinator/home");
        setLoading(false);
      } else if (data.role === "company") {
        // error are there check the componenet or page
        router.push("company/add");
        setLoading(false);
      } else {
        toast.error(data.error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error(data.error);
    }
  };

  //logout user
  const logout = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });
    if (res.ok) {
      setUser(null);
      setRole("");
      router.push("/");
    }
  };

  //check user logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      console.log(user);
      setUser(data.user); // idk why its not setting the user if user refreshes the page and try to alter any student data it will failed because its not setting the user
      setRole(data.role);
      console.log(user);
    } else {
      setUser(null);
      setRole("");
    }
  };

  // useEffect(() => {
  //   checkUserLoggedIn(); // this is for the temporary fix of the user not being logged in after refresh
  // }, [role]);

  // last updated by function

  const lastUpdatedBy = async (changedBy) => {
    try {
      const { selectedStudentId, token } = changedBy;
      const data = {
        lastUpdatedBy: {
          role: role,
          username: user.username,
          email: user.email,
          timeStamp: new Date().toLocaleString(),
        },
      };

      const res = await fetch(`${API_URL}/api/students/${selectedStudentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: data }),
      });
      const resp = await res.json();
      // @important

      if (resp.data.attributes.lastUpdatedBy) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        checkUserLoggedIn,
        loading,
        lastUpdatedBy,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
