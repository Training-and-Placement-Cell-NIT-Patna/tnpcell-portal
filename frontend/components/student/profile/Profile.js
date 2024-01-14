/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from "@heroicons/react/outline";
import { PaperClipIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";

export default function Profile({ student, token }) {
  const { handleLastUpdatedBy } = useContext(AuthContext);
  const [studentData, setStudentData] = useState(student);
  // function to convert float to 2 decimal places either its string or number
  const convertToIntegers = (cpi) => {
    if (cpi) {
      return parseFloat(cpi).toFixed(2);
    }
    return cpi;
  };
  const router = useRouter();
  const [profilePic, setProfilePic] = useState(null);
  const [editCpi, setEditCpi] = useState(false);
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmitCpi = async (e) => {
    e.preventDefault();
    if (
      confirm(
        `
        Are you sure you want to update CPI/CGPA? 
        Details:
        CPI: ${studentData.cpi}
        Sem 1 CGPA: ${studentData.spi_1}
        Sem 2 CGPA: ${studentData.spi_2}
        Sem 3 CGPA: ${studentData.spi_3}
        Sem 4 CGPA: ${studentData.spi_4}
        Sem 5 CGPA: ${studentData.spi_5}
        Sem 6 CGPA: ${studentData.spi_6}
        Sem 7 CGPA: ${studentData.spi_7}
        Sem 8 CGPA: ${studentData.spi_8}
        Sem 9 CGPA: ${studentData.spi_9}
        Sem 10 CGPA: ${studentData.spi_10}


        `
      )
    ) {
      if (
        convertToIntegers(studentData.cpi) > 10 ||
        convertToIntegers(studentData.spi_1) > 10 ||
        convertToIntegers(studentData.spi_2) > 10 ||
        convertToIntegers(studentData.spi_3) > 10 ||
        convertToIntegers(studentData.spi_4) > 10 ||
        convertToIntegers(studentData.spi_5) > 10 ||
        convertToIntegers(studentData.spi_6) > 10 ||
        convertToIntegers(studentData.spi_7) > 10 ||
        convertToIntegers(studentData.spi_8) > 10 ||
        convertToIntegers(studentData.spi_9) > 10 ||
        convertToIntegers(studentData.spi_10) > 10
      ) {
        toast.error("Please enter valid CGPA/CPI");
        return;
      }

      // @important lastUpdateBy should be called before this api call its important to save logs first and then do changes in student profile
      if (
        !(await handleLastUpdatedBy({ selectedStudentId: student.id, token: token }))
      ) {
        toast.error("Something went wrong");
        console.log("Unable to update logs in student profile");
        return;
      }
      // formdata
      const formData = new FormData();
      formData.append("cpi", convertToIntegers(studentData.cpi));
      formData.append("spi_1", convertToIntegers(studentData.spi_1));
      formData.append("spi_2", convertToIntegers(studentData.spi_2));
      formData.append("spi_3", convertToIntegers(studentData.spi_3));
      formData.append("spi_4", convertToIntegers(studentData.spi_4));
      formData.append("spi_5", convertToIntegers(studentData.spi_5));
      formData.append("spi_6", convertToIntegers(studentData.spi_6));
      formData.append("spi_7", convertToIntegers(studentData.spi_7));
      formData.append("spi_8", convertToIntegers(studentData.spi_8));
      formData.append("spi_9", convertToIntegers(studentData.spi_9));
      formData.append("spi_10", convertToIntegers(studentData.spi_10));

      const res = await fetch(`${API_URL}/api/student/modify`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.ok) {
        toast.success("Successfully Updated");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
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
        setEditCpi(data.data.attributes.cpi_change_allowed);
      })

      .catch((err) => {
        console.log(err);
        toast.error(
          "Unable to fetch data from setting !!! api/setting not working"
        );
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("profile_pic", profilePic);

    const res = await fetch(`${API_URL}/api/student/modify`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      toast.success("Successfully Updated");
      router.push("/student/profile");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Applicant Information{" "}
            {student.approved == "pending" && (
              <span className="px-2 mx-2 py-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                <svg
                  className="animate-spin  ml-1 mr-3 h-5 w-5 text-green-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-15"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Approval Pending
              </span>
            )}
            {student.approved == "approved" && (
              <span className="px-2 mx-2 py-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                <CheckIcon className="mr-1 h-5 w-5 text-green" />
                Approved
              </span>
            )}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and Academic details.
          </p>
        </div>

        {/* 
        <div>
          <p className='text-sm font-medium text-gray-500'>
            Registered for:{' '}
            <span className='mt-1 text-sm text-gray-700 px-2'>
              {student.registered_for}
            </span>
          </p>
        </div> */}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                Profile Picture
              </dt>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                {student.profile_pic ? (
                  <div>
                    <Image
                      src={API_URL + student.profile_pic.url}
                      width={500}
                      height={500}
                      priority
                      objectFit="cover"
                      alt="student profile"
                    />
                  </div>
                ) : (
                  "No Profile Picture"
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {profilePic ? (
                      <div className="text-gray-600 text-sm">
                        <Image
                          src={URL.createObjectURL(profilePic)}
                          width={70}
                          height={90}
                          objectFit="cover"
                          alt="student profile pic preview"
                        />
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="profile_pic"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                      >
                        <span>Upload a file</span>
                        <input
                          // value={values.profile_pic}
                          onChange={handleFileChange}
                          id="profile_pic"
                          name="profile_pic"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG up to 500KB
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-3.5 py-2 mt-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Update
                </button>
              </div>
            </div>
          </form>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Full Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.name}
            </dd>
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Roll Number
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.roll}
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Father&apos;s Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.father_name}
            </dd>
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Father Occupation
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.father_occupation}
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Mother&apos;s Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.mother_name}
            </dd>
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Mother Occupation
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.mother_occupation}
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Personal Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.personal_email_id}
            </dd>
            <dt className="text-sm font-medium text-gray-500">
              Institute Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.institute_email_id}
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Mobile Number 1
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.mobile_number_1}
            </dd>
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Mobile Number 2
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.mobile_number_2}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Gender
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 capitalize">
              {student.gender}
            </dd>
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Category
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.category}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Program
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 capitalize">
              {student?.program?.program_name}
            </dd>
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Course
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student?.course?.course_name}
            </dd>
          </div>
          <form onSubmit={handleSubmitCpi}>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 1 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_1"
                  id="spi_1"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_1 || ""}
                  onChange={handleChange}
                />
              </dd>
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 2 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_2"
                  id="spi_2"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_2 || ""}
                  onChange={handleChange}
                />
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 3 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_3"
                  id="spi_3"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_3 || ""}
                  onChange={handleChange}
                />
              </dd>
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 4 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_4"
                  id="spi_4"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_4 || ""}
                  onChange={handleChange}
                />
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 5 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_5"
                  id="spi_5"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_5 || ""}
                  onChange={handleChange}
                />
              </dd>
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 6 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_6"
                  id="spi_6"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_6 || ""}
                  onChange={handleChange}
                />
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 7 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_7"
                  id="spi_7"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_7 || ""}
                  onChange={handleChange}
                />
              </dd>
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 8 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_8"
                  id="spi_8"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_8 || ""}
                  onChange={handleChange}
                />
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 9 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_9"
                  id="spi_9"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_9 || ""}
                  onChange={handleChange}
                />
              </dd>
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                CGPA Sem 10 (Current, leave blank if not applicable)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="spi_10"
                  id="spi_10"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.spi_10 || ""}
                  onChange={handleChange}
                />
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                Overall CGPA (Current)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                <input
                  //disable if editCpi is false
                  disabled={!editCpi}
                  type="number"
                  name="cpi"
                  id="cpi"
                  // border red if editCPi is false
                  className={`appearance-none border-1 ${
                    editCpi ? "border-green-200" : "border-gray-200"
                  } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                  value={studentData.cpi}
                  onChange={handleChange}
                />
              </dd>
              <div>
                {editCpi ? (
                  <button
                    type="submit"
                    className="inline-flex items-center px-3.5 py-2 mt-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Edit CGPA/Overall CGPA
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              X Marks
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.X_marks}
            </dd>
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              XII Marks
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.XII_marks}
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Bachelor&apos;s Marks (if completed)
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.bachelor_marks}
            </dd>
            <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
              Master&apos;s Marks (if completed)
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
              {student.master_marks}
            </dd>
          </div>

          {/* got this */}

          {studentData.is_mtech && (
            <>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                  <div className="m-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Mtech Academic Details{" "}
                      {student.approved == "pending" && (
                        <span className="px-2 mx-2 py-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                          <svg
                            className="animate-spin  ml-1 mr-3 h-5 w-5 text-green-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-15"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Approval Pending
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Mtech Academic Details
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  College Name (Btech)
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  {student.mtech_college_name}
                </dd>

                {/* year */}

                <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                  Year of Passing
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  <input
                    disabled
                    type="number"
                    name="mtech_YOP"
                    id="mtech_YOP"
                    className={`appearance-none border-1 border-gray-200 rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                    value={studentData.mtech_YOP}
                    // onChange={handleChange}
                  />
                </dd>

                <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                  1st Sem CGPA
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  <input
                    disabled={!editCpi}
                    type="number"
                    name="mtech_spi_1"
                    id="mtech_spi_1"
                    // border red if editCPi is false
                    className={`appearance-none border-1 ${
                      editCpi ? "border-green-200" : "border-gray-200"
                    } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                    value={studentData.mtech_spi_1}
                    onChange={handleChange}
                  />
                </dd>

                <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                  2nd Sem CGPA
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  <input
                    //disable if editCpi is false
                    disabled={!editCpi}
                    type="number"
                    name="mtech_spi_2"
                    id="mtech_spi_2"
                    className={`appearance-none border-1 ${
                      editCpi ? "border-green-200" : "border-gray-200"
                    } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                    value={studentData.mtech_spi_2}
                    onChange={handleChange}
                  />
                </dd>

                <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                  3rd Sem CGPA
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  <input
                    //disable if editCpi is false
                    disabled={!editCpi}
                    type="number"
                    name="mtech_spi_3"
                    id="mtech_spi_3"
                    className={`appearance-none border-1 ${
                      editCpi ? "border-green-200" : "border-gray-200"
                    } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                    value={studentData.mtech_spi_3}
                    onChange={handleChange}
                  />
                </dd>

                <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                  4th Sem CGPA
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  <input
                    //disable if editCpi is false
                    disabled={!editCpi}
                    type="number"
                    name="mtech_spi_4"
                    id="mtech_spi_4"
                    className={`appearance-none border-1 ${
                      editCpi ? "border-green-200" : "border-gray-200"
                    } rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                    value={studentData.mtech_spi_4}
                    onChange={handleChange}
                  />
                </dd>

                <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                  Gate Rank
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  <input
                    disabled
                    type="number"
                    name="mtech_gate_rank"
                    id="mtech_gate_rank"
                    className={`appearance-none border-1 border-gray-200 rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                    value={studentData.mtech_gate_rank}
                    // onChange={handleChange}
                  />
                </dd>

                <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                  Gate Score
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  <input
                    disabled
                    type="number"
                    name="mtech_gate_score"
                    id="mtech_gate_score"
                    className={`appearance-none border-1 border-gray-200 rounded w-full py-2 px-4 text-gray-900 text-sm leading-tight focus:outline-none focus:border-blue-500`}
                    value={studentData.mtech_gate_score}
                    // onChange={handleChange}
                  />
                </dd>
              </div>
            </>
          )}

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Resume</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul
                role="list"
                className="border border-gray-200 rounded-md divide-y divide-gray-200"
              >
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 flex-1 w-0 truncate">
                      {student.resume ? student.resume.name : "No resume found"}
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0 space-x-4">
                    {student.resume ? (
                      <div className="">
                        <a
                          href={`${API_URL}${student.resume.url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-orange-600 hover:text-orange-500 px-2"
                        >
                          Download
                        </a>
                        <a
                          href={student.resume_link}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-orange-600 hover:text-orange-500"
                        >
                          Resume Link
                        </a>
                      </div>
                    ) : (
                      <Link href="/student/resume">
                        <a className="font-medium text-orange-600 hover:text-orange-500">
                          Upload
                        </a>
                      </Link>
                    )}
                  </div>
                </li>
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Uploaded Transcripts (Marksheet)
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {student.transcript_link}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
