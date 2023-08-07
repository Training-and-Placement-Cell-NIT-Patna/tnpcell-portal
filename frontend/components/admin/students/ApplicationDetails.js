import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default function ApplicationDetails({ applications = '' }) {
  const [columnDefs] = useState([
    {
      headerName: 'Company',
      field:
        'attributes.job.data.attributes.company.data.attributes.company_name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Job',
      field: 'attributes.job.data.attributes.job_title',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Classification',
      field: 'attributes.job.data.attributes.classification',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Category',
      field: 'attributes.job.data.attributes.category',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Application Status',
      field: 'attributes.status',
      filter: 'agTextColumnFilter',
    },
  ])
  return (
    <div className='my-4'>
      <div className='pb-5 border-b border-gray-200'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Applied Jobs
        </h3>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ height: 'auto' }}>
        <AgGridReact
          rowData={applications}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
          
          domLayout= 'autoHeight'
          headerClass="my-header-class"
        ></AgGridReact>
      </div>
    </div>
  )
}
