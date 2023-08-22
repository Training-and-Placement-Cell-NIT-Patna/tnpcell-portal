import Layout from '@/components/coordinator/Layout'
import { AgGridReact } from 'ag-grid-react'
import { toast } from 'react-toastify'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useState, useEffect } from 'react'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function Jobs({ token }) {
  const [rowData, setRowData] = useState([])


  function handleApprove(id) {
    window.location.href = `/coordinator/jobs/${id}`;
  }


  const [columnDefs] = useState([
    {
      headerName: 'S.No.',
      valueGetter: 'node.rowIndex + 1',
    },
    {
      headerName: 'Details',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleApprove(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Details
            </button>
          </div>
        )
      },

      // function handleApprove(id) {
      //   window.location.href = `/admin/companies/${id}`;
      // }
    },
    {
      headerName: 'Company',
      field: 'attributes.company.data.attributes.company_name',
      // cellRenderer: function (params) {
      //   return (
      //     <div>
      //       <Link
      //         href={`/admin/jobs/${params.data.attributes.company.data.id}`}
      //       >
      //         {params.value}
      //       </Link>
      //     </div>
      //   )
      // },
    },
    {
      headerName: 'Job Title',
      field: 'attributes.job_title',
      cellRenderer: function (params) {
        return (
          <div>
            <Link href={`/coordinator/jobs/${params.data.id}`}>{params.value}</Link>
          </div>
        )
      },
    },
    {
      headerName: 'Approval Status',
      field: 'attributes.approval_status',
    },
    {
      headerName: 'Category',
      field: 'attributes.category',
    },
    {
      headerName: 'Classification',
      field: 'attributes.classification',
    },
    {
      headerName: 'JAF',
      field: 'attributes.jaf.data.attributes.url',
      cellRenderer: function (params) {
        return (
          <div>
            {params.value ? (
              <a
                href={`${API_URL}${params.value}`}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-yellow-600 hover:text-yellow-700 focus:text-yellow-800'
              >
                View JAF
              </a>
            ) : (
              <span className='text-xs font-medium'>No JAF</span>
            )}
          </div>
        )
      },
    },
    {
      headerName: 'POC 1 Name',
      field: 'attributes.POC1.name',
    },
    {
      headerName: 'POC 1 Mobile No',
      field: 'attributes.POC1.mobile_no',
    },
    {
      headerName: 'POC 2 Name',
      field: 'attributes.POC2.name',
    },
    {
      headerName: 'POC 2 Mobile No',
      field: 'attributes.POC2.mobile_no',
    },
  ])


  // useEffect(() => {
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   }


  //   axios
  //     .get(`${API_URL}/api/jobs?populate=*&sort=id:desc`, config)
  //     .then((res) => {
  //       let fetched_data = res.data.data
  //       setRowData(fetched_data)
  //     })
  //     .catch((err) => {
  //       toast.error('Error while fetching data')
  //       console.error(err)
  //     })
  // }, [])

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`${API_URL}/api/jobs?populate=*&sort=id:desc`, config)
      .then((res) => {
        let fetched_data = res.data.data;
        let filtered_data = fetched_data.filter(
          (job) => job.attributes.approval_status === "approved"
        );
        setRowData(filtered_data);
      })
      .catch((err) => {
        toast.error("Error while fetching data");
        console.error(err);
      });
  }, []);

  return (

    <Layout>

      <div className=' flex flex-col items-center'>
        <div className='border-b border-gray-200 w-[1100px] px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
              Jobs
            </h1>
          </div>
          <div className='mt-4 flex sm:mt-0 sm:ml-4'>


            {/* <button
              type='button'
              className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-0 sm:ml-0'
            >
              Deactivate
            </button> */}


            <Link href={`/coordinator/jobs/add`}>
              <button
                type='button'
                className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-[#e1be53] hover:bg-[#f0c74c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-1 sm:ml-3'
              >
                Add Job
              </button>
            </Link>
          </div>
        </div>
        <div className='ag-theme-alpine mt-4' style={{ margin: "auto", width: 1100, height: 500 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: true, filter: true }}
            rowSelection='multiple'
            domLayout='normal'
          ></AgGridReact>
        </div>
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
