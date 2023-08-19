import { useCallback, useRef, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default function Eligiblejobs({ jobs = '' }) {

  const onRowClicked = useCallback((event) => {
    // event.data contains the row data
    window.location.href = `/admin/jobs/${event.data.id}`
  }, [])


  const [columnDefs] = useState([
    {
      headerName: 'Company',
      field: 'company.company_name',
      filter: 'agTextColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc' }),
    },
    {
      headerName: 'Job',
      field: 'job_title',
      filter: 'agTextColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
    },
    {
      headerName: 'Classification',
      field: 'classification',
      filter: 'agTextColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
    },
    {
      headerName: 'Category',
      field: 'category',
      filter: 'agTextColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
    },
    {
      headerName: 'Job Status',
      field: 'job_status',
      filter: 'agTextColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),
    },
  ])
  return (
    <div className='my-4'>
      <div className='pb-5 border-b border-gray-200'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          {/* Eligible Jobs, but Not Applied */}
          Eligible Jobs
        </h3>
      </div>
      <div className='ag-theme-alpine mt-4 ' style={{ height: 'auto' }}>
        {/* <AgGridReact
          rowData={jobs}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact> */}

        <AgGridReact
          onCellFocused={(event) => event.api.clearFocusedCell()}
          rowData={jobs}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true }}
          domLayout='normal'
          headerClass="my-header-class"
          onRowClicked={onRowClicked}
          rowStyle={{ cursor: 'pointer' }}
        // Add the following inline styles
        ></AgGridReact>


      </div>
    </div>
  )
}
