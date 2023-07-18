import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { API_URL } from "@/config/index";
import AuthContext from "@/context/AuthContext";
import moment from "moment";
// import AuthContext from '@/context/AuthContext'

export default function AddJob({ token = "" }) {
  const [values, setValues] = useState({
    job_title: "",
    job_status: "",
    classification: "",
    category: "",
    min_X_marks: 0,
    min_XII_marks: 0,
    min_cpi: 0,
    start_date: undefined,
    last_date: undefined,
    only_for_pwd: false,
    only_for_ews: false,
    only_for_female: false,
    approval_status: "pending",

    POC1: {
      name: "",
      mail_id: "",
      mobile_no: "",
    },
    POC2: {
      name: "",
      mail_id: "",
      mobile_no: "",
    },
    company_category: "",
    industry_sector: "",
    details_of_pay_package: {
      basic_salary: "",
      allowance: "",
      perks: "",
      ctc: "",
    },
    hr: {
      name: "",
      contact_number: "",
      email: "",
    },
  });

  const { user, logout } = useContext(AuthContext);

  const [eligibleCourses, setEligibleCourses] = useState(new Set());
  const [programs, setPrograms] = useState([]);
  const [jaf, setJaf] = useState("");

  useEffect(() => {
    programs?.map((program) => {
      program.attributes?.courses?.data?.map((course) => {
        setEligibleCourses((prev) => new Set([...prev, parseInt(course.id)]));
      });
    });
  }, [programs]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setJaf(file);
  };

  const handleDateChange = (e) => {
    let { name, value } = e.target;
    // value = moment(value).local().format('yyyy-MM-DDThh:mm:ss.SSS')
    value = moment(value).utcOffset("+0530", true);
    console.log(value);
    setValues({ ...values, [name]: value === "" ? undefined : value });
  };

  const handleCheckboxChange = (e) => {
    const { id } = e.target;
    if (e.target.checked) {
      setEligibleCourses((prev) => new Set([...prev, parseInt(id)]));
    } else {
      setEligibleCourses(
        (prev) => new Set([...prev].filter((course) => course !== parseInt(id)))
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    values["eligible_courses"] = Array.from(eligibleCourses).toString();
    const formData = new FormData();

    // formData.append('data', JSON.stringify(values))
    formData.append(
      "data",
      JSON.stringify({ ...values, company_name: user.username })
    );

    if (jaf && jaf !== "") {
      formData.append("files.jaf", jaf, jaf.name);
    }
    console.log(FormData);
    console.log(values);

    const companyName = user && user.username;
    values["company_name"] = companyName;

    // setFormData(values)
    // //  console.log(user.username)
    // console.log(formData)
    // const hasEmptyFields = Object.values(values).some((element) => {
    //   element === ''

    // })

    if (eligibleCourses.size === 0) {
      toast.error("Please select at-least one course");
      return;
    }

    if (confirm("Are you sure to add job?")) {
      // console.log("this is form data ", values)
      const res = await fetch(`${API_URL}/api/jobs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log(res);

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("No token included");
          return;
        }
        const err = await res.json();

        console.log("Not showing");

        // toast.error('Error: ' + err.error.details.errors[0].message)
      } else {
        console.log("showing");
        toast.success("Job Added Successfully");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleContactThreeInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      ["details_of_pay_package"]: {
        ...values.details_of_pay_package,
        [name]: value,
      },
    });
  };

  const handleContactFourInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      ["hr"]: {
        ...values.hr,
        [name]: value,
      },
    });
  };

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/companies?filters[status][$eq]=approved&populate=*`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCompanies(data.data))
      .catch((err) => console.log(err));

    fetch(`${API_URL}/api/programs?populate=*`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6 mt-4">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {/* <p>
                {user && user.email}
              </p> */}
              <p>{user && user.username}</p>
              Job Details
            </h3>
            {/* <p className='mt-1 text-sm text-gray-500'>
              Some other details of the job
            </p> */}
          </div>

          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-3">
              <div className="grid grid-cols-6 gap-6">
                {
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="company_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>

                    <select
                      name="company"
                      required
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    >
                      <option value="">Select Company</option>
                      {companies
                        ?.filter(
                          (company) =>
                            company.attributes?.company_name ===
                            (user && user.username)
                        )
                        .map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.attributes.company_name}
                          </option>
                        ))}
                    </select>
                  </div>
                }

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="company_category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Category
                    <small className="text-gray-500 ml-1">
                      e.g- gov, psu, mnc, pvt ltd, start up, ngo etc.
                    </small>
                  </label>
                  <input
                    value={values.company_category}
                    onChange={handleInputChange}
                    type="text"
                    name="company_category"
                    id="company_category"
                    autoComplete="company_category"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="industry_sector"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Industry Sector
                    <small className="text-gray-500 ml-1">
                      e.g- core, IT, management, finance, consulting, teaching,
                      finance etc.
                    </small>
                  </label>
                  <input
                    value={values.industry_sector}
                    onChange={handleInputChange}
                    type="text"
                    name="industry_sector"
                    id="industry_sector"
                    autoComplete="industry_sector"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="job_title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    value={values.job_title}
                    onChange={handleInputChange}
                    type="text"
                    name="job_title"
                    id="job_title"
                    autoComplete="job_title"
                    required
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                {/* Add field to upload JAF */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="jaf"
                    className="block text-sm font-medium text-gray-700"
                  >
                    JAF
                  </label>
                  <input
                    value={values.jaf}
                    onChange={handleFileChange}
                    type="file"
                    name="jaf"
                    id="jaf"
                    autoComplete="jaf"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="classification"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Classification
                  </label>
                  <select
                    name="classification"
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  >
                    <option value="none">Select Classification</option>
                    <option value="tier1">Tier1</option>
                    <option value="tier2">Tier2</option>
                    <option value="tier3">Tier3</option>
                    <option value="none">None (for Internship)</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Internship / FTE
                  </label>
                  <select
                    name="category"
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Internship (2 Month)">
                      Internship (2 Month)
                    </option>
                    <option value="Internship (6 Month)">
                      Internship (6 Month)
                    </option>
                    <option value="FTE">FTE</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="job_status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Status
                  </label>
                  <select
                    name="job_status"
                    required
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  >
                    <option value="">Select</option>
                    <option value="open">open</option>
                    <option value="ongoing">ongoing</option>
                    <option value="results_declared">results_declared</option>
                    <option value="abandoned">abandoned</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="min_X_marks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Minimum X Marks
                    <small className="text-gray-500 ml-1">
                      Ex: 88.5 (out of 100)
                    </small>
                  </label>
                  <input
                    value={values.min_X_marks}
                    onChange={handleInputChange}
                    type="number"
                    name="min_X_marks"
                    id="min_X_marks"
                    autoComplete="min_X_marks"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="min_XII_marks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Minimum XII Marks
                    <small className="text-gray-500 ml-1">
                      Ex: 88.5 (out of 100)
                    </small>
                  </label>
                  <input
                    value={values.min_XII_marks}
                    onChange={handleInputChange}
                    type="number"
                    name="min_XII_marks"
                    id="min_XII_marks"
                    autoComplete="min_XII_marks"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="min_cpi"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Minimum CPI
                    <small className="text-gray-500 ml-1">
                      Ex: 8.86 (out of 10)
                    </small>
                  </label>
                  <input
                    value={values.min_cpi}
                    onChange={handleInputChange}
                    type="number"
                    name="min_cpi"
                    id="min_cpi"
                    autoComplete="min_cpi"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="start_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    defaultValue={values.start_date}
                    onChange={handleDateChange}
                    type="datetime-local"
                    name="start_date"
                    id="start_date"
                    autoComplete="start_date"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="last_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Date
                  </label>
                  <input
                    defaultValue={values.last_date}
                    onChange={handleDateChange}
                    type="datetime-local"
                    name="last_date"
                    id="last_date"
                    autoComplete="last_date"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="only_for_female"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Only for female
                  </label>
                  <select
                    name="only_for_female"
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="only_for_pwd"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Only for PWD
                  </label>
                  <select
                    name="only_for_pwd"
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="only_for_ews"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Only for EWS
                  </label>
                  <select
                    name="only_for_ews"
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <div className="grid grid-cols-12 gap-6">
                    {programs?.map((program) => (
                      <div
                        key={program.id}
                        className="col-span-6 sm:col-span-4"
                      >
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">
                            {program.attributes.program_name}
                          </legend>
                          <div className="pt-6 space-y-3">
                            {program?.attributes?.courses?.data.map((course) => (
                              <div
                                key={course.id}
                                className="flex items-center"
                              >
                                <input
                                  id={course.id}
                                  name={course.id}
                                  onChange={handleCheckboxChange}
                                  type="checkbox"
                                  defaultChecked={course.id}
                                  className="h-4 w-4 border-gray-300 rounded text-yellow-600 focus:ring-yellow-500"
                                />
                                <label
                                  htmlFor={`${course.id}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {course.attributes.course_name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Pay Package
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Details of Pay Package
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="basic_salary"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Basic Salary
                  </label>
                  <input
                    value={values?.details_of_pay_package?.basic_salary}
                    onChange={handleContactThreeInputChange}
                    type="text"
                    name="basic_salary"
                    id="basic_salary"
                    autoComplete="basic_salary"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="allowance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Allowance
                  </label>
                  <input
                    value={values?.details_of_pay_package?.allowance}
                    onChange={handleContactThreeInputChange}
                    type="text"
                    name="allowance"
                    id="allowance"
                    autoComplete="allowance"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="perks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Perks
                  </label>
                  <input
                    value={values?.details_of_pay_package?.perks}
                    onChange={handleContactThreeInputChange}
                    type="text"
                    name="perks"
                    id="perks"
                    autoComplete="tel-national"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="ctc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CTC
                  </label>
                  <input
                    value={values?.details_of_pay_package?.ctc}
                    onChange={handleContactThreeInputChange}
                    type="text"
                    name="ctc"
                    id="ctc"
                    autoComplete="tel-national"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                HR/Recruiter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Contact Details Of HR/Recruiter
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    value={values?.hr?.name}
                    onChange={handleContactFourInputChange}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="mail_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    value={values?.hr?.mail_id}
                    onChange={handleContactFourInputChange}
                    type="email"
                    name="mail_id"
                    id="mail_id"
                    autoComplete="email"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="mobile_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Telephone/ Mobile
                  </label>
                  <input
                    value={values?.hr?.mobile_no}
                    onChange={handleContactFourInputChange}
                    type="text"
                    name="mobile_no"
                    id="mobile_no"
                    autoComplete="tel-national"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Add
          </button>

          <button>
            <a
              onClick={() => logout()}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer"
            >
              Logout
            </a>
          </button>
        </div>
      </div>
    </form>
  );
}
