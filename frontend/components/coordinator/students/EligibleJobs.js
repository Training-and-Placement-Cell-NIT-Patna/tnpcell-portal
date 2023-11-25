import { useCallback, useRef, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default function Eligiblejobs({ jobs = '' }) {

  const onRowClicked = useCallback((event) => {
    // event.data contains the row data
    window.location.href = `/coordinator/jobs/${event.data.id}`
  }, [])


  const [columnDefs] = useState([
    {
      headerName: 'Company',
      field: 'company.company_name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Job',
      field: 'job_title',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Classification',
      field: 'classification',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Category',
      field: 'category',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Job Status',
      field: 'job_status',
      filter: 'agTextColumnFilter',
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
      <div className='ag-theme-alpine mt-4' style={{ height: 'auto' }}>
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
          onRowClicked={onRowClicked}
          rowStyle={{ cursor: 'pointer' }}
        // Add the following inline styles
        ></AgGridReact>


      </div>
    </div>
  )
}
