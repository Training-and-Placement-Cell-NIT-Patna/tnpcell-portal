import Layout from '@/components/student/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useEffect, useState } from 'react'
import NotApproved from '@/components/student/NotApproved'

export default function JobsApplied({ token = '' }) {
  // check if student is approved or not
  const [approved, setApproved] = useState(false)
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    fetch(`${API_URL}/api/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.approved === 'approved') {
          setApproved(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    fetch(`${API_URL}/api/student/applied-jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const [columnDefs] = useState([
    {
      headerName: 'Company',
      field: 'job.company.company_name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Job Title',
      field: 'job.job_title',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Student Status',
      field: 'status',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Classification',
      field: 'job.classification',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Job Status',
      field: 'job.job_status',
      filter: 'agTextColumnFilter',
    },

    ////////////////////// Adding extra Info

    {
      headerName: 'Other Info',
      field: 'job.other_info',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'JAF',
      field: 'job.jaf.url',
      cellRenderer: function (params) {
        if (params.value) {
          return (
            <a
              href={API_URL + params.value}
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-yellow-600 hover:text-yellow-700 focus:text-yellow-800'
            >
              View JAF
            </a>
          )
        } else {
          return 'No JAF'
        }
      },
    },
  ])

  if (!approved) {
    return (
      <Layout>
        <NotApproved />
      </Layout>
    )
  }
  return (
    <Layout heading='Jobs Applied'>
      <div className='ag-theme-alpine mt-4' style={{ height: '400px' }}>
        <AgGridReact
          rowData={jobs}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)
  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
