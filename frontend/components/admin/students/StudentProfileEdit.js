
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { API_URL } from "@/config/index";
import { PaperClipIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function StudentProfileEdit({ token = "", student }) {
  console.log("token", token)
  const id = student?.id;
  const {
    createdAt,
    resume_link,
    updatedAt,
    user_relation,
    program,
    course,
    profile_pic,
    placed_status,
    ...newStudent
  } = student.attributes;

  // console.log("student: ",student.attributes)

  const [values, setValues] = useState(newStudent);
  const [isPwd,setIsPwd] = useState(false);
  const [chosenCourse , setChosenCourse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    // const hasEmptyFields = Object.values(values).some((element) => {
    //   element === ''

    // })

    // console.log("ID=>",id ,typeof(id) );
    // console.log(JSON.stringify({ data: values }))
    // id = String(id)

    if (confirm("Are you sure you want to edit student profile?")) {

      try {
        const form = new FormData()
        form.append('data',values); 
        console.log(form)
        const dataBody = JSON.stringify({ data: values });

        // console.log("mybody: ",dataBody);


        try
        {
          const res = await fetch(`${API_URL}/api/students/${id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: dataBody,
          });

        }
        catch(e){
          console.log("my merror: ",e);
        }
        


        console.log("my res: ", res);

        // console.log("changed=>" + JSON.stringify({ data: values }));

        if (!res.ok) {
          if (res.status === 403 || res.status === 401) {
            toast.error("No token included");
            return;
          }

          const profile = await res.json();

          console.log("Edit error: ", profile?.error);

          toast.error(profile?.error.name); // this is letting internal server error!!!
        } else {
          const profile = await res.json();
          toast.success("Profile Edited Successfully");
        }
        
      } catch (e) {
        console.log("error while edit: ",e)
      }
  
    }
  };

  const handlePwdChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: !values.pwd })
    setIsPwd(value);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    // console.log("name: ",name," value: ",value);
   
  };

  const changePlacedStatus = async (e) => {
    if (confirm("Are you sure you want to change placed status?")) {
      e.preventDefault();
      // api/student/set-placed-status?roll=2111mc02&placed_status=placed_a2
      const res = await fetch(
        `${API_URL}/api/student/set-placed-status?roll=${values.roll}&placed_status=${placedStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("Forbidden");
          return;
        }
      } else {
        toast.success("Placed Status Updated");
      }
    }
  };

  const [programs, setPrograms] = useState([program.data]);//this contains an object consists of two properties {id: , attributes: } and the attributes further contain the program_name

  const [courses, setCourses] = useState([course?.data]); //this conatin an object consists of two properties {id:  , attributes: } and the attributes has the course_name

  const [mainData , setMainData] = useState([]); // data which is filled by student 

  const [placedStatus, setPlacedStatus] = useState(placed_status);

  useEffect(() => {
    setIsPwd(values.pwd)
    // console.log("values(UseEffect): ",values.pwd)
  }, [values.pwd])

  //get courses of selected program

  useEffect(() => {
    fetch(`${API_URL}/api/programs?populate=*`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMainData(data.data);
        setPrograms(data.data)

      });
  }, []);

  //   useEffect(() => {
  //   const res = fetch(`${API_URL}/api/students/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ data: values }),
  //   }).then(res => {
  //     console.log(res.data)
  //   })
  // },[])

  useEffect(() => {

    mainData.map((program) => {

      // if (program.id === parseInt(values.program)) {
      //   setCourses(program?.attributes?.courses?.data);
      // }

      if (program.id === parseInt(values.program)) {
       if (program?.attributes?.courses?.data?.attributes?.course_name != course.data.attributes.course_name) {

         setCourses([course?.data]);
          setCourses((pre) => {
            
            // if(program.attributes.courses.data.attributes.course_name != )
            return (
              [...pre, ...program?.attributes?.courses?.data]
            )
          });
        }
      }
    })
  }, [values.program]);

  return (
    <>
      {/* Form for changing placed status, DO NOT REMOVE thinking empty form */}

      <form onSubmit={changePlacedStatus} id="placedStatus"></form>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6 mt-4">
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Student Personal Information, account will be active after
                  admin approval.
                  <img src={`${API_URL}${student?.attributes?.profile_pic?.data?.attributes?.url}`} />
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="approved"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      name="approved"
                      id="approved"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 bg-white border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      value={values.approved}
                      onChange={handleInputChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="placed_status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Placed Status( For Off-Campus &amp; PPO Offers )
                    </label>
                    <select
                      name="placed_status"
                      id="placed_status"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 bg-white border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      onChange={(e) => setPlacedStatus(e.target.value)}
                      value={placedStatus}
                    >
                      <option value="unplaced">Not Placed</option>
                      <option value="placed_tier1">Placed in Tier1</option>
                      <option value="placed_tier2">Placed in Tier2</option>
                      <option value="placed_tier">Placed in Tier3</option>
                    </select>
                    <button
                      type="submit"
                      form="placedStatus"
                      className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-800 focus:outline-none focus:border-yellow-700 focus:shadow-outline-indigo active:bg-yellow-700 transition ease-in-out duration-150"
                    >
                      Change Placed Status
                    </button>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="internship_status_2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Internship Status (2 Month)
                    </label>
                    <select
                      name="internship_status_2"
                      id="internship_status_2"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 bg-white border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      value={values.internship_status_2}
                      onChange={handleInputChange}
                    >
                      <option value="false">Not Got Internship</option>
                      <option value="true">Got Internship</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="internship_status_6_m"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Internship Status (6 Month)
                    </label>
                    <select
                      name="internship_status_6_m"
                      id="internship_status_6_m"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 bg-white border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      value={values.internship_status_6_m}
                      onChange={handleInputChange}
                    >
                      <option value="false">Not Got Internship</option>
                      <option value="true">Got Internship</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="fte_status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      FTE Status
                    </label>
                    <select
                      name="fte_status"
                      id="fte_status"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 bg-white border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      value={values.fte_status}
                      onChange={handleInputChange}
                    >
                      <option value="false">Not Got FTE</option>
                      <option value="true">Got FTE</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="roll"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Roll No.
                    </label>
                    <input
                      value={values.roll}
                      onChange={handleInputChange}
                      type="text"
                      name="roll"
                      id="roll"
                      autoComplete="roll"
                      required
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      value={values.name}
                      onChange={handleInputChange}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-9 sm:col-span-3">
                    <label
                      htmlFor="father_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Father&quot;s Name
                    </label>
                    <input
                      value={values.father_name}
                      onChange={handleInputChange}
                      type="text"
                      name="father_name"
                      id="father_name"
                      autoComplete="father_name"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-9 sm:col-span-3">
                    <label
                      htmlFor="father_occupation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Father&#39;s Occupation
                    </label>
                    <input
                      value={values.father_occupation}
                      onChange={handleInputChange}
                      type="text"
                      name="father_occupation"
                      id="father_occupation"
                      autoComplete="father_occupation"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-9 sm:col-span-3">
                    <label
                      htmlFor="mother_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mother&apos;s Name
                    </label>
                    <input
                      value={values.mother_name}
                      onChange={handleInputChange}
                      type="text"
                      name="mother_name"
                      id="mother_name"
                      autoComplete="mother_name"
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-9 sm:col-span-3">
                    <label
                      htmlFor="mother_occupation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mother&apos;s Occupation
                    </label>
                    <input
                      value={values.mother_occupation}
                      onChange={handleInputChange}
                      type="text"
                      name="mother_occupation"
                      id="mother_occupation"
                      autoComplete="mother_occupation"
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="personal_email_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Personal Email
                    </label>
                    <input
                      value={values.personal_email_id}
                      onChange={handleInputChange}
                      type="text"
                      name="personal_email_id"
                      id="personal_email_id"
                      autoComplete="email"
                      required
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="institute_email_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Institute Email
                    </label>
                    <input
                      value={values.institute_email_id}
                      onChange={handleInputChange}
                      type="text"
                      name="institute_email_id"
                      id="institute_email_id"
                      autoComplete="email"
                      required
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="mobile_number_1"
                      className="block text-sm font-medium text-gray-700"
                      required
                    >
                      Mobile Number 1
                    </label>
                    <input
                      value={values.mobile_number_1}
                      onChange={handleInputChange}
                      type="text"
                      name="mobile_number_1"
                      id="mobile_number_1"
                      autoComplete="tel-national"
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="mobile_number_2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number 2
                    </label>
                    <input
                      value={values.mobile_number_2}
                      onChange={handleInputChange}
                      type="text"
                      name="mobile_number_2"
                      id="mobile_number_2"
                      autoComplete="tel-national"
                      required
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <select
                      value={values.gender}
                      onChange={handleInputChange}
                      id="gender"
                      name="gender"
                      autoComplete="gender"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    >
                      <option>Select</option>
                      <option>female</option>
                      <option>male</option>
                      <option>other</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      value={values.category}
                      onChange={handleInputChange}
                      id="category"
                      name="category"
                      autoComplete="category"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    >
                      <option value="">Select</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                      <option value="ews">EWS</option>
                    </select>
                  </div>

                 
                    {values.category !== 'general' ? (<>
                    <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='category_link'
                          className='block text-sm font-medium text-gray-700'
                        >
                        Category Certificate<span className='text-red-700'>*</span> 
                       
                        </label>
                
                     <div className="w-full flex ">
                        
                        <input
                          value={values.category_link}
                          onChange={handleInputChange}
                          type='text'
                          name='category_link'
                          id='category_link'
                          placeholder='Drive Link'
                          autoComplete='tel-national'
                          required={values.category !== 'general' ? true : false}
                          className='mt-0 block w-[90%] px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500 hover:cursor-pointer'
                        /><span
                          className="inline m-auto  "
                        > {(values.category_link) ? (<a
                          href={values.category_link}
                          target="_tpc"
                        ><FaEye  color="yellow" />
                        </a>) : null}</span>

                     </div>
                      
                      </div>
                    </>) : null}
           

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="pwd"
                      className="block text-sm font-medium text-gray-700"
                    >
                      PWD
                    </label>
                    <select
                      value={values.pwd}
                      onChange={handlePwdChange}
                      id="pwd"
                      name="pwd"
                      autoComplete="pwd"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    >
                      <option>Select</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>

                 {
                   isPwd && (
                      <div className="col-span-9 sm:col-span-3">
                        <label
                          htmlFor="type_of_disability"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Type Of Disability (If PWD)
                        </label>
                        <input
                          value={values.type_of_disability}
                          required={values.pwd ? true : false}
                          type="text"
                          name="type_of_disability"
                          id="type_of_disability"
                          autoComplete="type_of_disability"
                          className="mt-0 block w-full px-0.5 border-0 border-b-2 border-blue-900 "
                        />
                      </div>
                   )
                 }

                  {
                    isPwd && (
                      <div className="col-span-9 sm:col-span-3">
                        <label
                          htmlFor="disability_percentage"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Disability Percentage (If PWD)
                        </label>
                        <input
                          value={values.disability_percentage}
                          required={values.pwd ? true : false}
                          type="text"
                          name="disability_percentage"
                          id="disability_percentage"
                          autoComplete="disability_percentage"
                          className="mt-0 block w-full px-0.5 border-0 border-b-2 border-blue-900 "
                        />
                      </div>
                    )
                  }

                  {
                    isPwd && (
                      <div className="col-span-3 sm:col-span-1">
                        <label
                          htmlFor="disability_certificate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Disability Certificate (IF PWD)
                        </label>
                        <input
                          value={values.disability_certificate}
                          required={values.pwd ? true : false}
                          onChange={handleInputChange}
                          type="text"
                          name="disability_certificate"
                          id="disability_certificate"
                          autoComplete="disability_certificate"
                          placeholder="Drive Link"
                          className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                        />
                      </div>
                    )
                  }

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="date_of_birth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </label>
                    <input
                      value={values.date_of_birth}
                      onChange={handleInputChange}
                      type="date"
                      name="date_of_birth"
                      id="date_of_birth"
                      autoComplete="date_of_birth"
                      required
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="blood_group"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Blood Group
                    </label>
                    <input
                      value={values.blood_group}
                      onChange={handleInputChange}
                      type="text"
                      name="blood_group"
                      id="blood_group"
                      autoComplete="blood_group"
                      placeholder="E.g- A+"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Height
                    </label>
                    <input
                      value={values.height}
                      onChange={handleInputChange}
                      type="text"
                      name="height"
                      id="height"
                      autoComplete="height"
                      placeholder="In cm (E.g 68.9)"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Weight
                    </label>
                    <input
                      value={values.weight}
                      onChange={handleInputChange}
                      type="text"
                      name="weight"
                      id="weight"
                      autoComplete="weight"
                      placeholder="In Kg (E.g - 58)"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Permanent Address
                    </label>
                    <textarea
                      value={values.address}
                      onChange={handleInputChange}
                      rows={4}
                      name="address"
                      id="address"
                      autoComplete="address"
                      required
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="domicile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Domicile
                    </label>
                    <input
                      value={values.domicile}
                      onChange={handleInputChange}
                      type="text"
                      name="domicile"
                      id="domicile"
                      autoComplete="domicile"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      value={values.city}
                      onChange={handleInputChange}
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="city"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <input
                      value={values.state}
                      onChange={handleInputChange}
                      type="text"
                      name="state"
                      id="state"
                      autoComplete="state"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="pin_code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      PIN CODE
                    </label>
                    <input
                      value={values.pin_code}
                      onChange={handleInputChange}
                      type="text"
                      name="pin_code"
                      id="pin_code"
                      autoComplete="pin_code"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="correspondance_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correspondence Address
                    </label>
                    <input
                      value={values.correspondance_address}
                      onChange={handleInputChange}
                      type="text"
                      name="correspondance_address"
                      id="correspondance_address"
                      autoComplete="correspondance_address"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="aadhar_no"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Aadhar No
                    </label>
                    <input
                      value={values.aadhar_no}
                      onChange={handleInputChange}
                      type="text"
                      name="aadhar_no"
                      id="aadhar_no"
                      autoComplete="aadhar_no"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="driving_licience_no"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Driving License No
                    </label>
                    <input
                      value={values.driving_licience_no}
                      onChange={handleInputChange}
                      type="text"
                      name="driving_licience_no"
                      id="driving_licience_no"
                      autoComplete="driving_licience_no"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="driving_licience_link"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Driving license


                    </label>
                    
                     <div className="flex w-full">
                      <input
                        value={values.driving_licience_link}
                        onChange={handleInputChange}
                        type="text"
                        name="driving_licience_link"
                        id="driving_licience_link"
                        autoComplete="driving_licience_link"
                        placeholder="Drive Link"
                        className="mt-0 block w-[90%] px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500 hover:cursor-pointer"
                      />
                      <span
                        className="inline m-auto  "
                      > {(values.driving_licience_link) ? (<a
                          href={values.driving_licience_link}
                        target="_tpc"
                      ><FaEye color="yellow" />
                      </a>) : null}</span>
                     </div>

                   
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="pancard_no"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Pan Card No
                    </label>
                    <input
                      value={values.pancard_no}
                      onChange={handleInputChange}
                      type="text"
                      name="pancard_no"
                      id="pancard_no"
                      autoComplete="pancard_no"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Academic Details
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Student Academic Information, account will be active after
                  admin approval.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="rank"
                      className="block text-sm font-medium text-gray-700"
                    >
                      GATE / JEE / JAM Rank
                    </label>
                    <input
                    required
                      value={values.rank}
                      onChange={handleInputChange}
                      type="number"
                      name="rank"
                      id="rank"
                      autoComplete="rank"
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="categoryRank"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category Rank
                    </label>
                    <input
                    required
                      value={values.categoryRank}
                      onChange={handleInputChange}
                      type="number"
                      name="categoryRank"
                      id="categoryRank"
                      autoComplete="categoryRank"
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* 
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='registered_for'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Registering for
                    </label>
                    <select
                      value={values.registered_for}
                      onChange={handleInputChange}
                      id='registered_for'
                      name='registered_for'
                      autoComplete='registered_for'
                      required
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                    >
                      <option>Select</option>
                      <option>Internship</option>
                      <option>FTE</option>
                    </select>
                  </div>
 */}

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="program"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Program
                    </label>
                    <select
                     
                      // value={program.value}
                      onChange={handleInputChange}
                      id="program"
                      name="program"
                      autoComplete="program"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    >
                      {/* <option>Select</option> */}
                      {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.attributes.program_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <p>{course.data.attributes.course_name}</p>
                  <p>{program.data.attributes.program_name}</p> */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="course"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Course
                    </label>
                    <select
                      value={values.course}
                      onChange={handleInputChange}
                      id="course"
                      name="course"
                      autoComplete="course"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    >
                      {/* <option>Select</option> */}
                      {/* <option value=''>{course.data.attributes.course_name}</option> */}
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course?.attributes?.course_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-5 sm:col-span-2">
                    <label
                      htmlFor="X_board"
                      className="block text-sm font-medium text-gray-700"
                    >
                      X Board
                    </label>
                    <input
                      value={values.X_board}
                      onChange={handleInputChange}
                      type="text"
                      name="X_board"
                      id="X_board"
                      // min={33}
                      // max={100}
                      // step='.01'
                      autoComplete="X_board"
                      // placeholder='In percentage Ex: 88.5'
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="X_YOP"
                      className="block text-sm font-medium text-gray-700"
                    >
                      X Year Of Passing
                    </label>
                    <input
                      value={values.X_YOP}
                      onChange={handleInputChange}
                      type="text"
                      name="X_YOP"
                      id="X_YOP"
                      autoComplete="X_YOP"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-2">
                    <label
                      htmlFor="X_marks"
                      className="block text-sm font-medium text-gray-700"
                    >
                      X Marks
                    </label>
                    <input
                      value={values.X_marks}
                      onChange={handleInputChange}
                      type="number"
                      name="X_marks"
                      id="X_marks"
                      min={33}
                      max={100}
                      step=".01"
                      autoComplete=""
                      placeholder="In percentage Ex: 88.5"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="X_marksheet"
                      className="block text-sm font-medium text-gray-700"
                    >
                      X Marksheet

                     
                    </label>
                    
                    <div className="flex w-full">
                      <input
                        value={values.X_marksheet}
                        onChange={handleInputChange}
                        type="text"
                        name="X_marksheet"
                        id="X_marksheet"
                        autoComplete="X_marksheet"
                        placeholder="Drive Link"
                        required
                        className="mt-0 block w-[90%] px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500 hover:cursor-pointer"
                      />
                      <span
                        className="inline m-auto  "
                      > {(values.X_marksheet) ? (<a
                          href={values.X_marksheet}
                        target="_tpc"
                      ><FaEye color="yellow" />
                      </a>) : null}</span>
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="XII_board"
                      className="block text-sm font-medium text-gray-700"
                    >
                      XII Board
                    </label>
                    <input
                      value={values.XII_board}
                      onChange={handleInputChange}
                      type="text"
                      name="XII_board"
                      id="XII_board"
                      autoComplete="XII_board"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="XII_YOP"
                      className="block text-sm font-medium text-gray-700"
                    >
                      XII Year Of Passing
                    </label>
                    <input
                      value={values.XII_YOP}
                      onChange={handleInputChange}
                      type="text"
                      name="XII_YOP"
                      id="XII_YOP"
                      autoComplete="XII_YOP"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-2">
                    <label
                      htmlFor="XII_marks"
                      className="block text-sm font-medium text-gray-700"
                    >
                      XII Marks
                    </label>
                    <input
                      value={values.XII_marks}
                      onChange={handleInputChange}
                      type="number"
                      name="XII_marks"
                      id="XII_marks"
                      min={33}
                      max={100}
                      step=".01"
                      placeholder="In percentage Ex: 88.5"
                      autoComplete="XII_marks"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="XII_marksheet"
                      className="block text-sm font-medium text-gray-700"
                    >
                      XII Marksheet

                 
                    </label>
                 
                      <div className="w-full flex">
                      <input
                        value={values.XII_marksheet}
                        onChange={handleInputChange}
                        type="text"
                        name="XII_marksheet"
                        id="XII_marksheet"
                        autoComplete="XII_marksheet"
                        placeholder="Drive Link"
                        required
                        className="mt-0 block w-[90%] px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500 hover:cursor-pointer"
                      />
                      <span
                        className="inline m-auto  "
                      > {(values.XII_marksheet) ? (<a
                          href={values.XII_marksheet}
                        target="_tpc"
                      ><FaEye color="yellow" />
                      </a>) : null}</span>
                      </div>
                  
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="spi_1"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-1
                    </label>
                    <input
                      value={values.spi_1}
                      onChange={handleInputChange}
                      type="number"
                      max={10}
                      name="spi_1"
                      id="spi_1"
                      autoComplete="spi_1"
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="spi_2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-2
                    </label>
                    <input
                      value={values.spi_2}
                      onChange={handleInputChange}
                      type="number"
                      max={10}
                      name="spi_2"
                      id="spi_2"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="spi_3"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-3
                    </label>
                    <input
                      value={values.spi_3}
                      onChange={handleInputChange}
                      type="number"
                      max={10}
                      name="spi_3"
                      id="spi_3"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="spi_4"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-4
                    </label>
                    <input
                      value={values.spi_4}
                      onChange={handleInputChange}
                      type="number"
                      max={10}
                      name="spi_4"
                      id="spi_4"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="spi_5"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-5
                    </label>
                    <input
                      value={values.spi_5}
                      onChange={handleInputChange}
                      type="number"
                      max={10}
                      name="spi_5"
                      id="spi_5"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="spi_6"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-6
                    </label>
                    <input
                      value={values.spi_6}
                      onChange={handleInputChange}
                      type="number"
                      max={10}
                      name="spi_6"
                      id="spi_6"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="spi_7"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-7
                    </label>
                    <input
                      value={values.spi_7}
                      onChange={handleInputChange}
                      type="number"
                      max={10}
                      name="spi_7"
                      id="spi_7"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="spi_8"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-8
                    </label>
                    <input
                      value={values.spi_8}
                      onChange={handleInputChange}
                      type="number"
                      max={10}
                      name="spi_8"
                      id="spi_8"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="spi_9"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-9
                    </label>
                    <input
                      value={values.spi_9}
                      onChange={handleInputChange}
                      type="number"
                      min={2}
                      max={10}
                      step=".01"
                      placeholder="Ex: 8.86"
                      name="spi_9"
                      id="spi_9"
                      autoComplete="spi_9"
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="spi_9"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CGPA-10
                    </label>
                    <input
                      value={values.spi_10}
                      onChange={handleInputChange}
                      type="number"
                      min={2}
                      max={10}
                      step=".01"
                      placeholder="Ex: 8.86"
                      name="spi_10"
                      id="spi_10"
                      autoComplete="spi_10"
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="cpi"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Overall CGPA
                    </label>
                    <input
                      value={values.cpi}
                      onChange={handleInputChange}
                      type="number"
                      max={10}
                      name="cpi"
                      id="cpi"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="all_sem_marksheet"
                      className="block text-sm font-medium text-gray-700"
                    >
                      All Sem Marksheets
                    </label>
             
                     <div className="flex w-full">
                      <input
                        value={values.all_sem_marksheet}
                        onChange={handleInputChange}
                        type="text"
                        name="all_sem_marksheet"
                        id="all_sem_marksheet"
                        autoComplete="all_sem_marksheet"
                        placeholder="Drive Link"
                        required
                        className="mt-0 block w-[90%] px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500 hover:cursor-pointer"
                      />
                      <span
                        className="inline m-auto  "
                      > {(values.all_sem_marksheet) ? (<a
                          href={values.all_sem_marksheet}
                        target="_tpc"
                      ><FaEye color="yellow" />
                      </a>) : null}</span>
                     </div>
                
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="total_backlogs"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Total Backlogs
                    </label>
                    <input
                      value={values.total_backlogs}
                      onChange={handleInputChange}
                      type="text"
                      name="total_backlogs"
                      id="total_backlogs"
                      autoComplete="total_backlogs"
                      placeholder="Ex: 0,1"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="current_backlogs"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Backlogs
                    </label>
                    <input
                      value={values.current_backlogs}
                      onChange={handleInputChange}
                      type="text"
                      name="current_backlogs"
                      id="current_backlogs"
                      autoComplete="current_backlogs"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-1">
                    <label
                      htmlFor="current_status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Status
                    </label>
                    <input
                      value={values.current_status}
                      onChange={handleInputChange}
                      type="text"
                      name=""
                      id="current_status"
                      autoComplete="current_status"
                      placeholder="Ex: P/F"
                      required
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500"
                    />
                  </div>

                  {/* <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="bachelor_marks"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bachelor&apos;s Marks
                    </label>
                    <input
                      value={values.bachelor_marks}
                      onChange={handleInputChange}
                      type="text"
                      name="bachelor_marks"
                      id="bachelor_marks"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div> */}

                  {/* <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="master_marks"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Master&apos;s Marks
                    </label>
                    <input
                      value={values.master_marks}
                      onChange={handleInputChange}
                      type="text"
                      name="master_marks"
                      id="master_marks"
                      autoComplete=""
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div> */}
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="admission_year"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Year of admission
                    </label>
                    <input
                      value={values.admission_year}
                      onChange={handleInputChange}
                      type="number"
                      min={2000}
                      max={2200}
                      name="admission_year"
                      id="admission_year"
                      autoComplete="admission_year"
                      placeholder="Ex: 2022"
                      required
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

     
          {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
                      {newStudent.resume ? "resume.pdf" : "No resume found"}
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0 space-x-4">
                    {newStudent.resume.data ? (
                      <div className="">
                        <a
                          href={`${API_URL}${newStudent.resume.data.attributes.url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-yellow-600 hover:text-yellow-500 px-2"
                        >
                          Download
                        </a>
                        <a
                          href={newStudent.resume_link}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-yellow-600 hover:text-yellow-500"
                        >
                          Google Drive Link
                        </a>
                      </div>
                    ) : (
                      <p className="font-medium text-yellow-600 hover:text-yellow-500">
                        NA
                      </p>
                    )}
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
          
        {/* for docs */}


        {/* Note:- Beware that the "typee" is also responsible for the toogle effect of view of "google drive link"  */}


          <Comp
          googleDoc={newStudent.resume}
            link={newStudent.resume_link}
          typee={'Resume'}
          />
          <Comp
          googleDoc={newStudent.tenthCertificate}
            link={newStudent.X_marksheet}
          typee={'Tenth Certificate'}
          />

        
          <Comp
          googleDoc={newStudent.twelthCertificate}
            link={newStudent.XII_marksheet}
          typee={'Twelth Certificate'}
          />
          <Comp
          googleDoc={newStudent.aadharCard}
          typee={'AadharCard'}
          />
          <Comp
            googleDoc={newStudent.drivingLicence}
            link={newStudent.driving_licience_no}
          typee={'Driving Licence'}
          />
          <Comp
            googleDoc={newStudent.allSemMarksheet}
            link={newStudent.all_sem_marksheet}
          typee={'All Sem Marksheet'}
          />
          <Comp
            googleDoc={newStudent.panCard}
          typee={'Pan Card'}
          />

          {/* Toggle effect docs */}

         { (values.category !== 'general')? (
            <Comp
              googleDoc={newStudent.casteCertificate}
              link={values.category_link}
              typee={'Caste Certificate'}
            />
         ):null}

         {isPwd  && (
            <Comp
              googleDoc={newStudent.disabilityCertificate}
              link={values.disability_certificate}
              typee={'Disability Certificate'}
            />
         )}


          
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}


var Comp = function ({googleDoc,link,typee}){

  //data = {resume , 10,12, AAdhar , Pan, Driving, all sem  }

  //data = {of which I have to show all the attributes}
  //li k

  return (
    <>
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">{typee}</dt>
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
                  {googleDoc ? typee+".pdf" : `No ${typee} found`}
                </span>
              </div>
              <div className="ml-4 flex-shrink-0 space-x-4">
                {googleDoc.data ? (
                  <div className="">
                  <span>
                      <a
                        href={`${API_URL}${googleDoc.data.attributes.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-yellow-600 hover:text-yellow-500 px-2"
                      >
                        Download
                      </a>
                  </span>
                    {
                      link ? (
                        <span>
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-yellow-600 hover:text-yellow-500 cursor-pointer"
                          >
                            Google Drive Link
                          </a>
                        </span>
                      ):null
                    }
                  </div>
                ) : (
                  <p className="font-medium text-yellow-600 hover:text-yellow-500">
                    NA
                  </p>
                )}
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </>
  )
}