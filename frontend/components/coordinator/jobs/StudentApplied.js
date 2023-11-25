import { useCallback, useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { toast } from 'react-toastify'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import qs from 'qs'
import Link from 'next/link'

export default function StudentApplied({ token = '', id = '' }) {
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
    // For logic, see comment in components/admin/jobs/StudentApplied.js

    // visible selected rows
    const selectedRows = gridRef.current.api
      .getSelectedNodes()
      .filter((node) => node.displayed)
      .map((node) => node.data)
    const selectedData = selectedRows
      .map((node) => node.attributes.student.data.attributes.roll)
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

  const query = qs.stringify(
    {
      populate: ['student.course', 'job.company', 'student.program'],
      filters: {
        job: {
          id: {
            $eq: id,
          },
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  )

  useEffect(() => {
    fetch(`${API_URL}/api/applications?${query}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.data)
      })
  }, [])

  const [columnDefs] = useState([
    {
      headerName: 'S.No.',
      valueGetter: 'node.rowIndex + 1',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Status',
      field: 'attributes.status',
    },
    {
      headerName: 'Student Name',
      field: 'attributes.student.data.attributes.name',
    },
    {
      headerName: 'Roll',
      field: 'attributes.student.data.attributes.roll',
      cellRenderer: function (params) {
        return (
          <div>
            <Link
              href={`/admin/students/${params.data.attributes.student.data.id}`}
            >
              <a>{params.value}</a>
            </Link>
          </div>
        )
      },
    },
    {
      headerName: 'Institute Email',
      field: 'attributes.student.data.attributes.institute_email_id',
    },
    {
      headerName: 'Personal Email',
      field: 'attributes.student.data.attributes.personal_email_id',
    },
    {
      headerName: 'Mobile Number',
      field: 'attributes.student.data.attributes.mobile_number_1',
    },
    {
      headerName: 'Alternate Mobile Number',
      field: 'attributes.student.data.attributes.mobile_number_2',
    },
    {
      headerName: 'Program',
      field:
        'attributes.student.data?.attributes?.program.data?.attributes?.program_name',
    },
    {
      headerName: 'Course',
      field:
        'attributes.student.data.attributes.course.data.attributes.course_name',
    },
    {
      headerName: 'Category',
      field: 'attributes.student.data.attributes.category',
    },
    {
      headerName: 'Gender',
      field: 'attributes.student.data.attributes.gender',
    },
    {
      headerName: 'Date of Birth',
      field: 'attributes.student.data.attributes.date_of_birth',
    },
    {
      headerName: 'Xth Marks',
      field: 'attributes.student.data.attributes.X_marks',
    },
    {
      headerName: 'XIIth Marks',
      field: 'attributes.student.data.attributes.XII_marks',
    },
    {
      headerName: 'CPI',
      field: 'attributes.student.data.attributes.cpi',
    },
    {
      headerName: 'GATE / JEE / JAM Rank',
      field: 'attributes.job.data.attributes.rank',
    },
    {
      headerName: 'GATE / JEE / JAM Category Rank',
      field: 'attributes.job.data.attributes.categoryRank',
    },
    {
      headerName: 'Bachelor Marks',
      field: 'attributes.student.data.attributes.bachelor_marks',
    },
    {
      headerName: 'Master Marks',
      field: 'attributes.student.data.attributes.master_marks',
    },
    {
      headerName: 'Address',
      field: 'attributes.student.data.attributes.address',
    },
    {
      headerName: 'Resume Link',
      field: 'attributes.student.data.attributes.resume_link',
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
      field: 'attributes.student.data.attributes.transcript_link',
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
      field: 'attributes.student.data.attributes.cover_letter_link',
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
            Students Applied
          </h3>
        </div>
        <div className='mt-4 flex sm:mt-0 sm:ml-4'>
          <button
            type='button'
            className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-0 sm:ml-0'
          >
            Deactivate
          </button>
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
          ref={gridRef}
          rowMultiSelectWithClick={true}
          rowSelection='multiple'
          rowData={students}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true }}
        ></AgGridReact>
      </div>
    </div>
  )
}

// ex: shiftwidth=2 expandtab:
