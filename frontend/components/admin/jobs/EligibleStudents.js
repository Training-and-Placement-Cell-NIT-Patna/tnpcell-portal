import { useCallback, useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { toast } from 'react-toastify'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import qs from 'qs'
import Link from 'next/link'

export default function EligibleStudents({ token = '', id = '',job = {}}) {


  const [students, setStudents] = useState([])

  const gridRef = useRef()

  const onBtExport = useCallback(() => {

    // See comment in pages/admin/students/index.js for logic behind this

    const selected_and_visible_node = gridRef.current.api
      .getSelectedNodes()
      .findIndex((node) => node.displayed)

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

  const getSelectedRowData = () => {
    /**
     * Note: getSelectedRows() also returns rows that are not visible (ie. filtered)
     *
     * Instead, using getSelectedNodes().map(node => node.data)
     *
     * node.data refers to exactly same object as returned by getSelectedRows
     * Can verify this by just comparing the objects, node.data and row in console
     */

    // visible selected rows

    const selectedRows = gridRef.current.api
      .getSelectedNodes()
      .filter((node) => node.displayed)
      .map((node) => node.data)
    const selectedData = selectedRows
      .map((node) => node.roll)
      .join()
    downloadCV(selectedData)
    return selectedData
  }

  const downloadCV = async (ids) => {
    if (!ids || ids.trim().length === 0) {
      toast.error('No row selected')
      return
    }

    // download zip file
    fetch(`${API_URL}/api/admin/resume-zip?rolls=${ids}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status >= 400) {
          const res_json = await res.json()
          console.error(res_json)
          toast.error(res_json.error.message)
          throw res_json.error
        }

        return res.blob()
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'resume.zip')
        document.body.appendChild(link)
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }


//  useEffect(()  => {
//     fetch(`${API_URL}/api/admin/get-eligible-students?jobId=${id}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       //body: JSON.stringify(),
//     })

//     .then((res) => res.json())
//    // data=JSON.Stringfy(res)
//     .then((data) => {
//     setStudents(data)
//     console.log("data coming=>")
//     console.log(data)
//     })
//     .catch((err) => {
//       console.log("No data coming")
//       console.log(err)
//     })
  
// }, [])



const fetchData = async () => {
  const res = await fetch(`${API_URL}/api/admin/get-eligible-students?jobId=${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()


  setStudents(data)
}

useEffect(() => {
  fetchData()
}, [])



const onRowClicked = useCallback((event) => {
  // event.data contains the row data
  window.location.href = `/admin/students/${event.data.id}`
}, [])


  const [columnDefs] = useState([
    {
      headerName: 'S.No.',
      valueGetter: 'node.rowIndex + 1',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    // {
    //   headerName: 'Status',
    //   field: 'status',
    // },
    {
      headerName: 'Student Name',
      field: 'name',
    },
    {
      headerName: 'Roll',
      field: 'roll',
      cellRenderer: function (params) {
        return (
          <div>
            <Link
             href={`/admin/students/${params.data.id}`}
            >
              <a>{params.value}</a>
            </Link>
          </div>
        )
      },
    },
    {
      headerName: 'Institute Email',
      field: 'institute_email_id',
    },
    {
      headerName: 'Personal Email',
      field: 'personal_email_id',
    },
    {
      headerName: 'Mobile Number',
      field: 'mobile_number_1',
    },
    {
      headerName: 'Alternate Mobile Number',
      field: 'mobile_number_2',
    },
    {
      headerName: 'Program',
      field:
        'program.program_name',
    },
    {
      headerName: 'Course',
      field:
        'course.course_name',
    },
    {
      headerName: 'Category',
      field: 'category',
    },
    {
      headerName: 'Gender',
      field: 'gender',
    },
    {
      headerName: 'Date of Birth',
      field: 'date_of_birth',
    },
    {
      headerName: 'Xth Marks',
      field: 'X_marks',
    },
    {
      headerName: 'XIIth Marks',
      field: 'XII_marks',
    },
    {
      headerName: 'CPI',
      field: 'cpi',
    },
    {
      headerName: 'GATE / JEE / JAM Rank',
      field: 'rank',
    },
    {
      headerName: 'GATE / JEE / JAM Category Rank',
      field: 'categoryRank',
    },
    {
      headerName: 'Bachelor Marks',
      field: 'bachelor_marks',
    },
    {
      headerName: 'Master Marks',
      field: 'master_marks',
    },
    {
      headerName: 'Address',
      field: 'address',
    },
    {
      headerName: 'Resume Link',
      field: 'resume_link',
      cellRenderer: function (params) {
        return (
          <div>
            <a
              href={params.value}
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-yellow-600 hover:text-yellow-700 focus:text-yellow-800'
            >
              View Resume
            </a>
          </div>
        )
      },
    },
    {
      headerName: 'Transcript Link',
      field: 'transcript_link',
      cellRenderer: function (params) {
        return (
          <div>
            {params.value && (
              <a
                href={params.value}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-yellow-600 hover:text-yellow-700 focus:text-yellow-800'
              >
                View Transcript
              </a>
            )}
          </div>
        )
      },
    },
    {
      headerName: 'Cover Letter Link',
      field: 'cover_letter_link',
      cellRenderer: function (params) {
        return (
          <div>
            {params.value && (
              <a
                href={params.value}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-yellow-600 hover:text-yellow-700 focus:text-yellow-800'
              >
                View Cover Letter
              </a>
            )}
          </div>
        )
      },
    },
  ])
  return (
    <div className='my-4'>
      <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
        <div className='flex-1 min-w-0'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Eligible Students
          </h3>
        </div>

        
        <div className='mt-4 sm:mt-0 sm:ml-4'>
          <button
            type='button'
            onClick={onBtExport}
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-1 sm:ml-3'
          >
            Export
          </button>

          <button
            onClick={getSelectedRowData}
            type='button'
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-1 sm:ml-3'
          >
            Download CV
          </button>
        </div>
      </div>

      <div className='ag-theme-alpine mt-4' style={{ height: 400 }}>

<AgGridReact
    onCellFocused={(event) => event.api.clearFocusedCell()}
    ref={gridRef}
          rowMultiSelectWithClick={true}
          rowSelection='multiple'
          rowData={students}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true }}
    onRowClicked={onRowClicked}
    rowStyle={{ cursor: 'pointer' }}
    cellStyle={{ boxShadow: 'none' }}
    // Add the following inline styles
  ></AgGridReact>

      </div>
    </div>
  )
}

// ex: shiftwidth=2 expandtab: