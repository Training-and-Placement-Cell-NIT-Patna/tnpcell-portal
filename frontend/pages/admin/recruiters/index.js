// import RecruitersSection from '@/components/admin/recruiters/RecruitersSection'
// import Layout from '@/components/admin/Layout'
// import { toast } from 'react-toastify'
// import { API_URL } from '@/config/index'
// import { parseCookies } from '@/helpers/index'
// import axios from 'axios'
// import React, {useEffect} from 'react'
// import qs from 'qs'

// export default function Recruiters({ token }) {
//   const [rowData, setRowData] = React.useState([])
  
//   useEffect(() => {
//     const config = {
//       headers: { Authorization: `Bearer ${token}` },
//     };

//     const query = qs.stringify({
//       filters: {
//         role: {
//           type: {
//             $eq: 'company',
//           },
//         },
//       },
//       populate: ['role'],
//     },
//     {
//       encodeValuesOnly: true, // prettify url
//     })

//     axios.get(`${API_URL}/api/users?${query}`, config)
//       .then(async res => {
//         setRowData(res.data);
//       })
//       .catch(err => {
//         toast.error("Error while fetching data");
//         console.error(err);
//       });
//   }, [])

//   return (
//     <Layout>
//       <RecruitersSection recruiters={rowData} token={token} />
//     </Layout>
//   )
// }

// export async function getServerSideProps({ req }) {
//   const { token } = parseCookies(req)

//   return {
//     props: { token: token }, // will be passed to the page component as props
//   }
// }

// // ex: shiftwidth=2 expandtab:



import qs from 'qs'
import Layout from '@/components/admin/Layout'
import { AgGridReact } from 'ag-grid-react'
import { toast } from 'react-toastify'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import React, { useState, useEffect, useRef } from 'react'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { API_URL } from '@/config/index'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function Recruiters({ token }) {
  const [rowData, setRowData] = React.useState([])
  const router = useRouter()
  const [columnDefs] = useState([
    {
      headerName: 'S.No.',
      valueGetter: 'node.rowIndex + 1',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
    },
    {
      headerName: 'Username',
      field: 'username',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
    },
    {
      headerName: 'Email',
      field: 'email',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
    },
    {
      headerName: 'Details',
      field: 'email',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
      cellRenderer: function (params) {
        return (
          <div>
            <Link href={`/recruiters?filter[email]=${params.value}`}>
              <button
                type='button'
                className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600'
              >
                Details
              </button>
            </Link>
          </div>
        )
      },
    },
    {
      headerName: 'Edit',
      field: 'id',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
      cellRenderer: function (params) {
        return (
          <div>
            <Link href={`/admin/recruiters/${params.value}`}>
              <button
                type='button'
                className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600'
              >
                Edit
              </button>
            </Link>
          </div>
        )
      },
    },
    {
      headerName: 'Delete',
      field: 'id',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleDelete(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-re-600'
            >
              Delete
            </button>
          </div>
        )
      },
    }
  ])
  const gridRef = useRef()
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const query = qs.stringify({
      filters: {
        role: {
          type: {
            $eq: 'company',
          },
        },
      },
      populate: ['role'],
    },
      {
        encodeValuesOnly: true, // prettify url
      })

    axios.get(`${API_URL}/api/users?${query}`, config)
      .then(async res => {
        setRowData(res.data);
      })
      .catch(err => {
        toast.error("Error while fetching data");
        console.error(err);
      });
  }, [])
  // function handleApprove(email) {
  //   window.location.href = `/recruiters?filter[email]=${email}`;
  // }

  // function handleEdit(id) {
  //   window.location.href = `/admin/recruiters/${id}`;
  // }
  const handleDelete = async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      method: 'DELETE',
    }
    if (confirm('Are you sure you want to delete this recruiter?')) {
      const res = await fetch(`${API_URL}/api/users/${id}`, config)
      console.log(token)
      if (res.status === 200) {
        toast.info('Recruiter deleted successfully!')
        router.reload()
      } else {
        toast.error('Error deleting recruiter!')
      }
    }
  }
  return (
    <Layout>
      <div className='px-4 py-5 border-b border-gray-200 sm:px-6'>
        <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
          <div className='ml-4 mt-2'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Recruiters
            </h3>
          </div>
        </div>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ margin: "auto", height: 400, width: 1100 }}>
        <AgGridReact
          ref={gridRef}
          rowMultiSelectWithClick={true}
          domLayout='normal'
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection='multiple'
          headerClass="my-header-class"
          defaultColDef={{ sortable: true, filter: true }}
          overlayNoRowsTemplate='Please wait while data is being fetched'
          rowDragManaged={true}
          colDragManaged={true}
          colResizeDefault='true'
          animateRows={true}
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

