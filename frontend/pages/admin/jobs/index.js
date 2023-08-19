
import Layout from '@/components/admin/Layout'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useCallback, useRef, useState, useEffect } from 'react'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { API_URL } from '@/config/index'
import Link from 'next/link'



export default function Jobs({ token }) {
  const [rowData, setRowData] = useState([])


  ///////////////////////////////////////////////////

  const gridRef = useRef()

  const onBtExport = useCallback(() => {

    // See comment in pages/admin/students/index.js for logic behind this

    const selected_and_visible_node = gridRef.current.api.getSelectedNodes().findIndex(node => node.displayed);

    console.log(selected_and_visible_node)

    if (selected_and_visible_node == -1) {
      // If nothing is selected, export ALL
      gridRef.current.api.exportDataAsCsv()
    } else {
      // Else, export selected
      gridRef.current.api.exportDataAsCsv({
        onlySelected: true,
      })
    }
  }, [])

  /////////////////////
  const onRowClicked = useCallback((event) => {
    // event.data contains the row data
    window.location.href = `/admin/jobs/${event.data.id}`
  }, [])



  const [columnDefs] = useState([
    {
      headerName: 'S.No.',
      valueGetter: 'node.rowIndex + 1',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      headerClass: ' header-cell '
    },

    {
      headerName: 'Details',
      field: 'id',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              // onClick={() => handleApprove(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600'
            >
              Details
            </button>
          </div>
        )
      },
    },

    {
      headerName: 'Company',
      field: 'attributes.company.data.attributes.company_name',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
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
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      field: 'attributes.job_title',
      // cellRenderer: function (params) {
      //   return (
      //     <div>
      //       <Link href={`/admin/jobs/${params.data.id}`}>{params.value}</Link>
      //     </div>
      //   )
      // },
    },
    // {
    //   headerName: 'Approval Status',
    //   field: 'attributes.approval_status',
    // },
    {
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      headerClass: ' header-cell ',
      headerName: 'Category',
      field: 'attributes.category',
    },
    {
      headerName: 'Classification',
      field: 'attributes.classification',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      headerClass: ' header-cell ',
    },
    {
      headerName: 'JAF',
      field: 'attributes.jaf.data.attributes.url',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      headerClass: ' header-cell ',
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
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      headerClass: ' header-cell '
    },
    {
      headerName: 'POC 1 Mobile No',
      field: 'attributes.POC1.mobile_no',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      headerClass: ' header-cell '
    },
    {
      headerName: 'POC 2 Name',
      field: 'attributes.POC2.name',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      headerClass: ' header-cell '
    },
    {
      headerName: 'POC 2 Mobile No',
      field: 'attributes.POC2.mobile_no',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),
      headerClass: ' header-cell '
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

      <div className='flex-1'>
        <div className='border-b border-gray-200  px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
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


            {/* 
            <button
              type='button'
              onClick={onBtExport}
              className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-1 sm:ml-3'
            >
              Export
            </button> */}



            <Link href={`/admin/jobs/add`}>
              <button
                type='button'
                className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-900 hover:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 sm:order-1 sm:ml-3'
              >
                Add Job
              </button>
            </Link>
          </div>
        </div>

        <div className='ag-theme-alpine mt-4' style={{margin:"auto",width:"1100px", height: "500px" }}>

          <AgGridReact
            onCellFocused={(event) => event.api.clearFocusedCell()}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: true, filter: true }}
            onRowClicked={onRowClicked}
            domLayout= 'normal'
            headerClass="my-header-class"
            rowStyle={{ cursor: 'pointer' }}
          // Add the following inline styles
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

// ex: shiftwidth=2 expandtab: