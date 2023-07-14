import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function RecruiterRegister({ token = '' }) {
  // Fetch Companies from API
  const [recruiter, setRecruiter] = useState([])

  const router = useRouter();

  const handleApprove = async (id) => {
    
    const res = await fetch(`${API_URL}/api/recruiters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          approved: 'approved',
        },
      }),
    })
    // console.log("register=>",data)

    if (!res.ok) {
      toast.warning('Something Went Wrong 1!')
    } else {
      router.push('/admin/recruiters/add');
      // toast.success('Recruiter Approved')
    }
    fetchData()
  }

  const handleReject = async (id) => {
    const res = await fetch(`${API_URL}/api/recruiters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          approved: 'rejected',
        },
      }),
    })

    // console.log("rejected=>",data)

    if (!res.ok) {
      toast.warning('Something Went Wrong 2!')
    } else {
      toast.info('Successfully Rejected')
    }
    fetchData()
  }

  const fetchData = async () => {
    const res = await fetch(
      `${API_URL}/api/recruiters?filters[approved][$eq]=pending&populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await res.json()


    if (res.ok) {
      setRecruiter(data.data)
    } else {
      toast.warning('Something Went Wrong 3!')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])



  const [columnDefs] = useState([
    // {
    //   headerName: 'S.No.',
    //   valueGetter: 'node.rowIndex + 1',
    // },
    {
      headerName: 'Company',
      field: 'attributes.company',
    //   cellRenderer: function (params) {
    //     return (
    //       <Link href={`/admin/recruiters/${params.data.id}`}>
    //         <a>{params.value}</a>
    //       </Link>
    //     )
    //   },
    },
    // {
    //   headerName: 'Approval Status',
    //   field: 'attributes.status',
    // },
    {
      headerName: 'Recruiter Name',
      field: 'attributes.recruiter_name',
    },
    {
        headerName: 'Email',
        field: 'attributes.email',
      },
      {
        headerName: 'Contact No',
        field: 'attributes.contact_no',
      },
    {
      headerName: 'Register',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleApprove(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Register
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
    <div>
      <div className='md:flex md:items-center md:justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-xl font-thin leading-7 text-gray-900 sm:text-2xl sm:truncate'>
            Recruiters
          </h2>
        </div>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ height: 300 }}>
        <AgGridReact
          rowData={recruiter}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </div>
  )
}
