import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import { toast } from 'react-toastify'
import Link from 'next/link'

export default function JobRequest({ token = '' }) {
  // Fetch Companies from API
  const [jobs, setJobs] = useState([])

  const handleApprove = async (id) => {
    const res = await fetch(`${API_URL}/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          approval_status: 'approved',
        },
      }),
    })
    if (!res.ok) {
      toast.success('Something Went Wrong!')
    } else {
      toast.success('Successfully Approved')
    }
    fetchData()
  }
  const handleReject = async (id) => {
    const res = await fetch(`${API_URL}/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          approval_status: 'rejected',
        },
      }),
    })
    if (!res.ok) {
      toast.success('Something Went Wrong!')
    } else {
      toast.success('Successfully Rejected')
    }
    fetchData()
  }

  const fetchData = async () => {
    const res = await fetch(
      `${API_URL}/api/jobs?filters[approval_status][$eq]=pending&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await res.json()
    if (res.ok) {
      setJobs(data.data)
    } else {
      toast.warning('Something Went Wrong!')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const [columnDefs] = useState([
    {
      headerName: 'Job Title',
      field: 'attributes.job_title',
      cellRenderer: function (params) {
        return (
          <Link href={`/coordinator/job_unapproved/${params.data.id}`}>
            <a>{params.value}</a>
          </Link>
        )
      },
    },
    {
      headerName: 'Job Category',
      field: 'attributes.category',
    },
    {
      headerName: 'Company',
      field: 'attributes.company.data.attributes.company_name',
    },
    {
      headerName: 'Classfication',
      field: 'attributes.classification',
    },
    {
      headerName: 'Approve',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleApprove(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Approve
            </button>
          </div>
        )
      },
    },
    {
      headerName: 'Reject',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleReject(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Reject
            </button>
          </div>
        )
      },
    },
  ])
  return (
    <div className='w-[1100px]'>
      <div className='md:flex md:items-center md:justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-xl font-thin leading-7 text-gray-900 sm:text-2xl sm:truncate'>
            Jobs
          </h2>
        </div>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ height: '400px' }}>
        <AgGridReact
          rowData={jobs}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
          alwaysShowVerticalScroll={true}
          domLayout="normal"
        ></AgGridReact>
      </div>
    </div>
  )
}
