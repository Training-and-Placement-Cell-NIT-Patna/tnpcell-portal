import Layout from '@/components/admin/Layout'
import { AgGridReact } from 'ag-grid-react'
import { toast } from 'react-toastify'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useState, useCallback, useRef, useEffect } from 'react'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function Students({ token }) { 

  const [rowData, setRowData] = useState([])
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
      field: 'attributes.roll',
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
      cellRenderer: function (params) {
        return (
          <div>
            <Link href={`/admin/students/${params.value}`}>
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
      headerName: 'Name',
      field: 'attributes.name',
    },

    {
      headerName: 'Admission Year',
      field: 'attributes.admission_year',
    },

    // {
    //   headerName: 'Approved',
    //   field: 'attributes.approved'
    // },

    {
      headerName: 'Placed Status',
      field: 'attributes.placed_status',
    },
    {
      headerName: 'Internship Status (2 Month)',
      field: 'attributes.internship_status_2',
    },
    {
      headerName: 'Internship Status (6 Month)',
      field: 'attributes.internship_status_6',
    },
    {
      headerName: 'FTE Status',
      field: 'attributes.fte_status',
    },
    {
      headerName: 'Course',
      field: 'attributes.course.data.attributes.course_name',
    },
    {
      headerName: 'Program',
      field: 'attributes.program.data?.attributes?.program_name',
    },

    {
      headerName: 'Father Name',
      field: 'attributes.father_name',
    },

    {
      headerName: 'Father Occupation',
      field: 'attributes.father_occupation',
    },

    {
      headerName: 'Mother Name',
      field: 'attributes.mother_name',
    },

    {
      headerName: 'Mother Occupation',
      field: 'attributes.mother_occupation',
    },

    {
      headerName: 'Mobile',
      field: 'attributes.mobile_number_1',
    },
    {
      headerName: 'Alternate Mobile',
      field: 'attributes.mobile_number_2',
    },
    {
      headerName: 'Institute Email',
      field: 'attributes.institute_email_id',
    },
    {
      headerName: 'Personal Email',
      field: 'attributes.personal_email_id',
    },
      // {
      //   headerName: 'Registered For',
      //   field: 'attributes.registered_for',
      // },
    {
      headerName: 'Resume',
      field: 'attributes.resume',
      cellRenderer: function (params) {
        return (
          <div>
            {params.value.data ? (
              <a
                href={API_URL + params.value.data.attributes.url}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-yellow-600 hover:text-yellow-700 focus:text-yellow-800'
              >
                Resume
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        )
      },
    },
    {
      headerName: 'Resume',
      field: 'attributes.resume_link',
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
      field: 'attributes.blood_group',

    },

    {
      headerName: 'Height',
      field: 'attributes.height',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'Weight',
      field: 'attributes.weight',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'Domicile',
      field: 'attributes.domicile',
    },

    {
      headerName: 'Address',
      field: 'attributes.address',
    },

    {
      headerName: 'City',
      field: 'attributes.city',
    },

    {
      headerName: 'State',
      field: 'attributes.state',
    },

    {
      headerName: 'Pin Code',
      field: 'attributes.pin_code',
    },

    {
      headerName: 'Correspondance Address',
      field: 'attributes.correspondance_address',
    },

    {
      headerName: 'Aadhar No',
      field: 'attributes.aadhar_no',
    },

    {
      headerName: 'Driving Licience No',
      field: 'attributes.driving_licience_no',
    },

    {
      headerName: 'Driving Licience',
      field: 'attributes.driving_licience_link',
    },

    {
      headerName: 'Pancard No',
      field: 'attributes.pancard_no',
    },

    {
      headerName: 'All Semester Marksheets',
      field: 'attributes.all_sem_marksheet',
    },

    {
      headerName: 'X Marksheet',
      field: 'attributes.X_marksheet',
    },

    {
      headerName: 'XII Marksheet',
      field: 'attributes.XII_marksheet',
    },

    {
      headerName: 'X Board',
      field: 'attributes.X_board',
    },

    {
      headerName: 'X YOP',
      field: 'attributes.X_YOP',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'XII Board',
      field: 'attributes.XII_board',

    },

    {
      headerName: 'XII YOP',
      field: 'attributes.XII_YOP',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 1',
      field: 'attributes.spi_1',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 2',
      field: 'attributes.spi_2',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 3',
      field: 'attributes.spi_3',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 4',
      field: 'attributes.spi_4',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 5',
      field: 'attributes.spi_5',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 6',
      field: 'attributes.spi_6',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 7',
      field: 'attributes.spi_7',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 8',
      field: 'attributes.spi_8',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'SPI 9',
      field: 'attributes.spi_9',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'Total Backlogs',
      field: 'attributes.total_backlogs',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'Current Backlogs',
      field: 'attributes.current_backlogs',
      filter: 'agNumberColumnFilter',

    },

    {
      headerName: 'Current Status',
      field: 'attributes.current_status',
    },

    {
      headerName: 'CPI',
      field: 'attributes.cpi',
      filter: 'agNumberColumnFilter',
    },



    {
      headerName: 'Xth Marks',
      field: 'attributes.X_marks',
    },
    {
      headerName: 'XIIth Marks',
      field: 'attributes.XII_marks',
    },
    {
      headerName: 'Category',
      field: 'attributes.category',
    },

    {
      headerName: 'PWD',
      field: 'attributes.pwd',
    },

    {
      headerName: 'Type Of Disability',
      field: 'attributes.type_of_disability',
    },

    {
      headerName: 'Disability Percentage (If PWD)',
      field: 'attributes.disability_percentage',
    },


    {
      headerName: 'Disability Certificate (If PWD)',
      field: 'attributes.disabilty_certificate',
    },

    {
      headerName: 'Gender',
      field: 'attributes.gender',

    },
    {
      headerName: 'Date of Birth',
      field: 'attributes.date_of_birth',
    },
    {
      headerName: 'Bachelor Marks',
      field: 'attributes.bachelor_marks',
    },
  ])


  // Get placed status of students from /api/student/placed-status
  // @Ouput: {placed: {placed_a1: [], placed_a2: [], placed_x: []}}


  const getPlacedStatus = useCallback(async (data) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const res = await axios.get(`${API_URL}/api/student/placed-status`, config)
    const placed = res.data.placed
    const placed_tier1 = placed.placed_tier1
    const placed_tier2 = placed.placed_tier2
    const placed_tier3 = placed.placed_tier3

    // Update placed status of students
    const new_row_data = data.map((student) => {
      if (placed_tier1.includes(student.attributes.roll)) {
        student.attributes.placed = 'placed_tier1'
      } else if (placed_tier2.includes(student.attributes.roll)) {
        student.attributes.placed = 'placed_tier2'
      } else if (placed_tier3.includes(student.attributes.roll)) {
        student.attributes.placed = 'placed_tier3'
      } else {
        student.attributes.placed = 'unplaced'
      }
      return student
    })

    return new_row_data
  }, [])


  const getInternshipStatus_2 = useCallback(async (data) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const res = await axios.get(`${API_URL}/api/student/intern-status-2`, config)

    const internship = res.data.internship

    // Update internship status of students
    const new_row_data = data.map((student) => {
      if (internship.includes(student.attributes.roll)) {
        student.attributes.internship = 'Got Internship'
      } else {
        student.attributes.internship = 'None'
      }
      return student
    })

    // console.log(new_row_data)
    return new_row_data

  }, [])



  const getInternshipStatus_6 = useCallback(async (data) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const res = await axios.get(`${API_URL}/api/student/intern-status-6`, config)
    const internship = res.data.internship

    //Internship is not fetching itself

    // console.log("This is internship ",internship)

    // Update internship status of students
    const new_row_data = data.map((student) => {
      if (internship.includes(student.attributes.roll)) {
        student.attributes.internship = 'Got Internship'
      } else {
        student.attributes.internship = 'None'
      }
      return student
    })
    // console.log(new_row_data)
    return new_row_data
  }, [])


  const getfteStatus = useCallback(async (data) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const res = await axios.get(`${API_URL}/api/student/fte-status`, config)
    const fte = res.data.fte

    // Update fte status of students
    const new_row_data = data.map((student) => {
      if (fte.includes(student.attributes.roll)) {
        student.attributes.fte = 'Got FTE'
      } else {
        student.attributes.fte = 'None'
      }
      return student
    })
    // console.log(new_row_data)
    return new_row_data
  }, [])



  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }

    // Get all students, for strapi's pagination, using count of 50 per page
    const PAGE_SIZE = 100

    axios
      .get(
        `${API_URL}/api/students?pagination[page]=1&pagination[pageSize]=${PAGE_SIZE}&populate=*`,
        config
      )
      .then(async (res) => {
        let fetched_data = res.data.data
        let total_cnt = res.data.meta.pagination.total

        while (fetched_data.length < total_cnt) {
          const res = await axios.get(
            `${API_URL}/api/students?pagination[page]=${fetched_data.length / PAGE_SIZE + 1
            }&pagination[pageSize]=${PAGE_SIZE}&populate=*`,
            config
          )
          fetched_data = fetched_data.concat(res.data.data)
          // fetched_data.length += res.data.meta.pagination.pageSize;
        }

        fetched_data = await getPlacedStatus(fetched_data)

        fetched_data = await getInternshipStatus_2(fetched_data)

        fetched_data = await getInternshipStatus_6(fetched_data)

        fetched_data = await getfteStatus(fetched_data)

        fetched_data = fetched_data.filter((student) => {
          return student.attributes.approved === 'approved'
        })

        setRowData(fetched_data)
      })
      .catch((err) => {
        toast.error('Error while fetching data')
        console.error(err)
      })
  }, [])

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
  return (
    <Layout>
      <div className='flex flex-col items-center'>
        <div className='bg-white px-4 py-5 w-[1200px] border-b border-gray-200 sm:px-6'>
          <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
            <div className='ml-4 mt-2'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Students
              </h3>
            </div>
            <div className='ml-4 mt-2 flex-shrink-0'>
              <button
                type='button'
                onClick={onBtExport}
                className='inline-flex items-center px-4 py-2
              border border-transparent text-xs font-medium rounded shadow-sm
              text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
              >
                Export
              </button>
            </div>
          </div>
        </div>
        <div className='ag-theme-alpine mt-4' style={{ margin: "auto", height: 400, width: 1200 }}>
          <AgGridReact
            ref={gridRef}
            rowMultiSelectWithClick={true}
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection='multiple'
            domLayout='normal'
            defaultColDef={{ sortable: true, filter: true }}
            overlayNoRowsTemplate='Please wait while data is being fetched'
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
