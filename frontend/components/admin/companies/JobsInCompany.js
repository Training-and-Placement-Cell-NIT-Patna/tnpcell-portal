import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function JobsInCompany({ id, token = '' }) {
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    fetch(`${API_URL}/api/jobs?populate=*&filters[company][id][$eq]=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data)
      })
  }, [])

  const [columnDefs] = useState([
    {
      headerName: 'S.No.',
      valueGetter: 'node.rowIndex + 1',
      cellStyle:(params)=>{
        background:"green"
      }    },
    {
      headerName: 'Company',
      field: 'attributes.company.data.attributes.company_name',
    },
    {
      headerName: 'Job Title',
      field: 'attributes.job_title',
      cellRenderer: function (params) {
        return (
          <div>
            <Link href={`/admin/jobs/${params.data.id}`}>{params.value}</Link>
          </div>
        )
      },
    },
    {
      headerName: 'Classification',
      field: 'attributes.classification',
    },
    {
      headerName: 'Job Status',
      field: 'attributes.job_status',
    },
    {
      headerName: 'JAF',
      field: 'attributes.jaf.data.attributes.url',
      cellRenderer: function (params) {
        return (
          <div>
            <a
              href={API_URL + params.value}
              className='inline-flex items-center py-1.5 border-2 text-xs font-medium shadow-sm text-rose-800 hover:text-rose-900 focus:text-rose-700'
            >
              View JAF
            </a>
          </div>
        )
      },
    },
  ])
  return (
    <div>
      <div></div>
      <div className='md:flex md:items-center md:justify-between mt-3'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-xl font-thin leading-7 text-gray-900 sm:text-2xl sm:truncate'>
            
          </h2>
        </div>
        <div className='flex md:mt-0 md:ml-4'>
          <Link href={`/admin/jobs/add`}>
            <button
              type='button'
              className='ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-900 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-700'
            >
              Add Job
            </button>
          </Link>
        </div>
      </div>
      <div className='ag-theme-alpine mt-4' style={{height:400}}>
        <AgGridReact
          rowData={jobs}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
          headerClass="my-header-class"
        ></AgGridReact>
      </div>
    </div>
  )
}
