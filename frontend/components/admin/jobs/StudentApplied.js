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



  // const handlePlacedIntern_2m = async () => {
  //   // Only use visible/filtered + selected rows
  //   const selectedRows = gridRef.current.api
  //     .getSelectedNodes()
  //     .filter((node) => node.displayed)
  //     .map((node) => node.data)
  //   const selectedStudents = selectedRows.map(
  //     (row) => row.attributes.student.data.attributes.name
  //   )
  //   if (
  //     confirm(
  //       `Are you sure you want to place these students? ${selectedStudents}`
  //     )
  //   ) {
  //     selectedRows.map((row) => {
  //       fetch(`${API_URL}/api/applications/${row.id}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           data: {
  //             status: 'selected',
  //           },
  //         }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           toast.success(
  //             `${row.attributes.student.data.attributes.name} marked as placed`
  //           )
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //           toast.error(
  //             `${row.attributes.student.data.attributes.name} failed to place`
  //           )
  //         })
  //     })
  //     fetchData()
  //   }
  // }



  // const handlePlacedIntern_6m = async () => {
  //   // Only use visible/filtered + selected rows
  //   const selectedRows = gridRef.current.api
  //     .getSelectedNodes()
  //     .filter((node) => node.displayed)
  //     .map((node) => node.data)
  //   const selectedStudents = selectedRows.map(
  //     (row) => row.attributes.student.data.attributes.name
  //   )
  //   if (
  //     confirm(
  //       `Are you sure you want to place these students? ${selectedStudents}`
  //     )
  //   ) {
  //     selectedRows.map((row) => {
  //       fetch(`${API_URL}/api/applications/${row.id}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           data: {
  //             status: 'selected',
  //           },
  //         }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           toast.success(
  //             `${row.attributes.student.data.attributes.name} marked as placed`
  //           )
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //           toast.error(
  //             `${row.attributes.student.data.attributes.name} failed to place`
  //           )
  //         })
  //     })
  //     fetchData()
  //   }
  // }



  const handlePlaced = async () => {
    // Only use visible/filtered + selected rows
    const selectedRows = gridRef.current.api
      .getSelectedNodes()
      .filter((node) => node.displayed)
      .map((node) => node.data)
    const selectedStudents = selectedRows.map(
      (row) => row.attributes.student.data.attributes.name
    )
    if (
      confirm(
        `Are you sure you want to place these students? ${selectedStudents}`
      )
    ) {
      selectedRows.map((row) => {
        fetch(`${API_URL}/api/applications/${row.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              status: 'selected',
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(
              `${row.attributes.student.data.attributes.name} marked as placed`
            )
          })
          .catch((err) => {
            console.log(err)
            toast.error(
              `${row.attributes.student.data.attributes.name} failed to place`
            )
          })
      })
      fetchData()
    }
  }



  const handleUnplaced = async () => {
    // Only use visible/filtered + selected rows
    const selectedRows = gridRef.current.api
      .getSelectedNodes()
      .filter((node) => node.displayed)
      .map((node) => node.data)
    const selectedStudents = selectedRows.map(
      (row) => row.attributes.student.data.attributes.name
    )
    if (
      confirm(
        `Are you sure you want to unplace these students? ${selectedStudents}`
      )
    ) {
      selectedRows.map((row) => {
        fetch(`${API_URL}/api/applications/${row.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              status: 'applied',
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(
              `${row.attributes.student.data.attributes.name} marked as unplaced`
            )
          })
          .catch((err) => {
            console.log(err)
            toast.error(
              `${row.attributes.student.data.attributes.name} failed to unplace`
            )
          })
      })
      fetchData()
    }
  }




  const handleRejected = async () => {
    // Only use visible/filtered + selected rows
    const selectedRows = gridRef.current.api
      .getSelectedNodes()
      .filter((node) => node.displayed)
      .map((node) => node.data)
    const selectedStudents = selectedRows.map(
      (row) => row.attributes.student.data.attributes.name
    )
    if (
      confirm(
        `Are you sure you want to reject these students? ${selectedStudents}`
      )
    ) {
      selectedRows.map((row) => {
        fetch(`${API_URL}/api/applications/${row.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              status: 'rejected',
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(
              `${row.attributes.student.data.attributes.name} marked as rejected`
            )
          })
          .catch((err) => {
            console.log(err)
            toast.error(
              `${row.attributes.student.data.attributes.name} failed to reject`
            )
          })
      })
      fetchData()
    }
  }

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


  const fetchData = async () => {
    const res = await fetch(`${API_URL}/api/applications?${query}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    setStudents(data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  //  console.log(data);


  // function handleApprove(id) {
  //   window.location.href = `/admin/students/${id}`;
  // }

  const [columnDefs] = useState([
    {
      headerName: '',
      field: 'checkbox',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },

    {
      headerName: 'Roll No.',
      field: 'attributes.student.data.attributes.roll',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

      // cellRenderer: function (params) {
      //   return (
      //     <div>
      //       <Link href={`/admin/students/${params.data.id}`}>
      //         {params.value}
      //       </Link>
      //     </div>
      //   )
      // },
      // headerCheckboxSelection: true,
      // headerCheckboxSelectionFilteredOnly: true,
      // checkboxSelection: true,
    },
    {
      headerName: 'Details',
      field: 'id',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

      cellRenderer: function (params) {
        // console.log(params.data.attributes.student.data.id)
        return (
          <Link href={`/admin/students/${params.data.attributes.student.data.id}`}>
            <button
              type='button'
              // onClick={() => handleApprove(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600'
            >
              Details
            </button>
          </Link>
        )
      },
    },

    {
      headerName: 'Name',
      field: 'attributes.student.data.attributes.name',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Admission Year',
      field: 'attributes.student.data.attributes.admission_year',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    // {
    //   headerName: 'Approved',
    //   field: 'attributes.approved'
    // },

    {
      headerName: 'Placed Status',
      field: 'attributes.student.data.attributes.placed_status',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'Internship Status (2 Month)',
      field: 'attributes.student.data.attributes.internship_status_2',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'Internship Status (6 Month)',
      field: 'attributes.student.data.attributes.internship_status_6',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'FTE Status',
      field: 'attributes.student.data.attributes.fte_status',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'Course',
      field: 'attributes.student.data.attributes.course.data.attributes.course_name',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'Program',
      field: 'attributes.student.data.attributes.program.data.attributes.program_name',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Father Name',
      field: 'attributes.student.data.attributes.father_name',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Father Occupation',
      field: 'attributes.student.data.attributes.father_occupation',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'Mother Name',
      field: 'attributes.student.data.attributes.mother_name',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'Mother Occupation',
      field: 'attributes.student.data.attributes.mother_occupation',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Mobile',
      field: 'attributes.student.data.attributes.mobile_number_1',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'Alternate Mobile',
      field: 'attributes.student.data.attributes.mobile_number_2',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'Institute Email',
      field: 'attributes.student.data.attributes.institute_email_id',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'Personal Email',
      field: 'attributes.student.data.attributes.personal_email_id',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    // {
    //   headerName: 'Registered For',
    //   field: 'attributes.registered_for',
    // },
    // {
    //   headerName: 'Resume',
    //   field: 'attributes.resume',
    //   cellStyle: (params) => ({ borderRight: '2px solid #ccc',  }),

    //   cellRenderer: function (params) {
    //     return (
    //       <div>
    //         {params.value.data ? (
    //           <a
    //             href={API_URL + params.value.data.attributes.url}
    //             target='_blank'
    //             rel='noreferrer'
    //             className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-yellow-600 hover:text-yellow-700 focus:text-yellow-800'
    //           >
    //             Resume
    //           </a>
    //         ) : (
    //           <span>NA</span>
    //         )}
    //       </div>
    //     )
    //   },
    // },
    {
      headerName: 'Resume',
      field: 'attributes.student.data.attributes.resume_link',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

      cellRenderer: function (params) {
        return (
          <div>
            {params.value ? (
              <a
                href={params.value}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-yellow-600 hover:text-yellow-700 focus:text-yellow-800'
              >
                Resume Link
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        )
      },
    },


    {
      headerName: 'Blood Group',
      field: 'attributes.student.data.attributes.blood_group',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'Height',
      field: 'attributes.student.data.attributes.height',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'Weight',
      field: 'attributes.student.data.attributes.weight',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'Domicile',
      field: 'attributes.student.data.attributes.domicile',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Address',
      field: 'attributes.student.data.attributes.address',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'City',
      field: 'attributes.student.data.attributes.city',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'State',
      field: 'attributes.student.data.attributes.state',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Pin Code',
      field: 'attributes.student.data.attributes.pin_code',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Correspondence Address',
      field: 'attributes.student.data.attributes.correspondance_address',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Aadhar No',
      field: 'attributes.student.data.attributes.aadhar_no',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Driving License No',
      field: 'attributes.student.data.attributes.driving_licience_no',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Driving License',
      field: 'attributes.student.data.attributes.driving_licience_link',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Pancard No',
      field: 'attributes.student.data.attributes.pancard_no',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'All Semester Marksheets',
      field: 'attributes.student.data.attributes.all_sem_marksheet',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'X Marksheet',
      field: 'attributes.student.data.attributes.X_marksheet',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'XII Marksheet',
      field: 'attributes.student.data.attributes.XII_marksheet',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'X Board',
      field: 'attributes.student.data.attributes.X_board',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'X YOP',
      field: 'attributes.student.data.attributes.X_YOP',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'XII Board',
      field: 'attributes.student.data.attributes.XII_board',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'XII YOP',
      field: 'attributes.student.data.attributes.XII_YOP',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 1',
      field: 'attributes.student.data.attributes.spi_1',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'SPI 2',
      field: 'attributes.student.data.attributes.spi_2',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'SPI 3',
      field: 'attributes.student.data.attributes.spi_3',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'SPI 4',
      field: 'attributes.student.data.attributes.spi_4',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'SPI 5',
      field: 'attributes.student.data.attributes.spi_5',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'SPI 6',
      field: 'attributes.student.data.attributes.spi_6',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'SPI 7',
      field: 'attributes.student.data.attributes.spi_7',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'SPI 8',
      field: 'attributes.student.data.attributes.spi_8',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'SPI 9',
      field: 'attributes.student.data.attributes.spi_9',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'Total Backlogs',
      field: 'attributes.student.data.attributes.total_backlogs',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'Current Backlogs',
      field: 'attributes.student.data.attributes.current_backlogs',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },

    {
      headerName: 'Current Status',
      field: 'attributes.student.data.attributes.current_status',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'CPI',
      field: 'attributes.student.data.attributes.cpi',
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },



    {
      headerName: 'Xth Marks',
      field: 'attributes.student.data.attributes.X_marks',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'XIIth Marks',
      field: 'attributes.student.data.attributes.XII_marks',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'Category',
      field: 'attributes.student.data.attributes.category',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'PWD',
      field: 'attributes.student.data.attributes.pwd',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Type Of Disability',
      field: 'attributes.student.data.attributes.type_of_disability',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Disability Percentage (If PWD)',
      field: 'attributes.student.data.attributes.disability_percentage',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },


    {
      headerName: 'Disability Certificate (If PWD)',
      field: 'attributes.student.data.attributes.disability_certificate',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },

    {
      headerName: 'Gender',
      field: 'attributes.student.data.attributes.gender',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),


    },
    {
      headerName: 'Date of Birth',
      field: 'attributes.student.data.attributes.date_of_birth',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

    },
    {
      headerName: 'Bachelor Marks',
      field: 'attributes.student.data.attributes.bachelor_marks',
      cellStyle: (params) => ({ borderRight: '2px solid #ccc', }),

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

        <div className='mt-4 sm:mt-0 sm:ml-4'>

          {/* <button
            type='button'
            className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-0 sm:ml-0'
          >
            Deactivate
          </button> */}

          <button
            type='button'
            onClick={handleRejected}
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:order-1 sm:ml-3'
          >
            Mark as Rejected
          </button>

          {/* 
          <button
            type='button'
            onClick={handleUnplaced}
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:order-1 sm:ml-3'
          >
            UnMark as Placed
          </button> */}


          <button
            type='button'
            onClick={handlePlaced}
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3'
          >
            Intern (2M)
          </button>

          <button
            type='button'
            onClick={handlePlaced}
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3'
          >
            Intern (6M)
          </button>

          <button
            type='button'
            onClick={handlePlaced}
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3'
          >
            FTE
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

      <div className='ag-theme-alpine mt-4' style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowMultiSelectWithClick={true}
          rowSelection='multiple'
          rowData={students}
          columnDefs={columnDefs}
          domLayout='normal'
          headerClass="my-header-class"
          defaultColDef={{ sortable: true, filter: true }}
        ></AgGridReact>
      </div>
    </div>
  )
}

// ex: shiftwidth=2 expandtab:
