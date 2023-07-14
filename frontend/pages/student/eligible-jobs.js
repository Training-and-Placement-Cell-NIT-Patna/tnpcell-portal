import Layout from "@/components/student/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import NotApproved from "@/components/student/NotApproved";
import NoResume from "@/components/student/NoResume";
import moment from "moment";

export default function EligibleJobs({ token = "" }) {
  const router = useRouter();
  const [approved, setApproved] = useState(false);
  const [resume_set, setResumeSet] = useState(false);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.approved === "approved") {
          setApproved(true);
        }

        if (!resp.resume) {
          toast.error("Please upload your resume, before applying for jobs");
          setResumeSet(false);
        } else if (!resp.resume_link) {
          toast.error("Please set your resume_link, before applying for jobs");
          setResumeSet(false);
        } else {
          setResumeSet(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/student/eligiblejobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(
  //   JSON.stringify({
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  // );

  async function handleApply(id) {
    if (confirm("Are you sure to apply ?")) {
      const res = await fetch(`${API_URL}/api/student/apply?jobId=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("Invalid User");
          return;
        }
        console.debug(res);
        let err_msg = "Something Went Wrong";
        try {
          const data = await res.json();

          /* In case of error, from backend we should receive this structure:
	    *
	//    * {
	//    *   data: null
	//    *   error: {
	//    *   	status: 400,
	//    *   	name: "BadRequestError",
	//    *   	message: "Bad Request",
	//    *   	details: [{
	//    *   	  messages: [{
	//    *	    id: "Not eligible"
	//    *   	  }]
	//    *   	}]
	//    *   }
	//    * }
	//    * */

          if (data.error && Array.isArray(data.error.details)) {
            const err_detail = data.error.details[0];
            if (err_detail && Array.isArray(err_detail.messages)) {
              if (err_detail.messages[0]) {
                err_msg = err_detail.messages[0].id || err_msg;
              }
            }
          }
        } catch (_e) {}
        toast.error(err_msg);
      } else {
        const data = await res.json();
        toast.success("Successfully Applied");
        router.push(`/student/jobs-applied`);
      }
    }
  }

  const [columnDefs] = useState([
    {
      headerName: "Job Title",
      field: "job_title",
      filter: "agTextColumnFilter",
    },

    {
      headerName: "Company",
      field: "company.company_name",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Apply",
      field: "id",
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type="button"
              onClick={() => handleApply(params.value)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply
            </button>
          </div>
        );
      },
    },
    {
      headerName: "JAF",
      field: "jaf.url",
      cellRenderer: function (params) {
        if (params.value) {
          return (
            <div>
              <a
                href={API_URL + params.value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                View JAF
              </a>
            </div>
          );
        } else {
          return <div>No JAF</div>;
        }
      },
    },
    {
      headerName: "Job Category",
      field: "classification",
      filter: "agTextColumnFilter",
    },

    {
      headerName: "Deadline",
      field: "last_date",
      cellRenderer: function (params) {
        if (params.value) {
          return moment(params.value).local().format("yyyy-MM-DD hh:mm A");
        } else {
          return "N.A.";
        }
      },
    },
  ]);
  if (!approved) {
    return (
      <Layout>
        <NotApproved />
      </Layout>
    );
  } else if (!resume_set) {
    return (
      <Layout>
        <NoResume />
      </Layout>
    );
  }

  return (
    <Layout heading="Eligible Jobs">
      <div className="ag-theme-alpine mt-4" style={{ height: 800 }}>
        <AgGridReact
          rowData={jobs}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: { token: token }, // will be passed to the page component as props
  };
}
