

// import { Bar } from "react-chartjs-2";
import BarChart from "../Charts/BarChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
// import
// import Image from "next/image";
// import React from 'react'
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     Utils
//   } from 'chart.js'
//   import { Chart, Bar} from 'react-chartjs-2'
  // ChartJS.register(
  //     CategoryScale,
  //     LinearScale,
  //     PointElement,
  //     LineElement,
  //     Title,
  //     Tooltip,
  //     Legend
  //   )

Chart.register(CategoryScale);
  

function Statics() {
    // const { Utils } = Chart.helpers;
      var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    //   const labels = MONTHS({count: 7});

    //data for BTech seat Matrix

    const BtechSeatMatrixData = {

        labels:["B Arch", "Civil Enginn." , "Computer Sci. Engin.","Electronics & comm. Enginne." , "Electrical Enginne." , "Mechanical Engin." , "Integrated Msc"],

       datasets:[
        {
               labels: "",

               data: [ 40,101, 157, 127, 100, 105, 50],

               backgroundColor: [
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                //    'rgba(3, 38, 224)',
               ],
               borderColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   
               ],

               borderWidth: 1,
        }
       ]

    }
    const MTechSeatMatrix = {

        labels: ["Civil Enginn.", "Computer Sci. Engin.", "Electrical Enginne.", "Mechanical Engin.","Electronics & comm. Enginne."  , "Architecture"],

       datasets:[
        {
               labels: "",

               data: [ 105, 40, 42, 57, 31, 19],

               backgroundColor: [
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                //    'rgba(3, 38, 224)',
                //    'rgba(3, 38, 224)',
                //    'rgba(3, 38, 224)',
               ],
               borderColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(255, 99, 132, 0.2)',
                   
               ],

               borderWidth: 1,
        }
       ]

    }
    const BtechSeatMatriData = {

        labels:["B Arch", "Civil Enginn." , "Computer Sci. Engin.","Electronics & comm. Enginne." , "Electrical Enginne." , "Mechanical Engin." , "Integrated Msc"],

       datasets:[
        {
               labels: "",

               data: [ 40,101, 157, 127, 100, 105, 50],

               backgroundColor: [
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                   'rgba(3, 38, 224)',
                //    'rgba(3, 38, 224)',
               ],
               borderColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(255, 99, 132, 0.2)',
                   
               ],

               borderWidth: 1,
        }
       ]

    }





      const data = {
        labels: MONTHS,//y-axis
        datasets: [{
          label: 'My First Dataset',//x-axis
          data: [65, 59, 80, 81, 56, 55, 40,0,20,30,25],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
        //   #5a6ed8
          borderWidth: 1
        }]
      };;
    return (
        <>
            <section className='py-20'>

                <div>
                   
                </div>
                <div className='text-center py-10'>
                    <h1 className='text-center text-5xl font-serif font-semibold text-red-900'>Seat Matrix</h1>
                </div>
                <div className='md:flex'>
                    <div className='md:w-1/2 '>
                        {/* <h1 className='text-center text-2xl font-medium'>B.tech Seat Matrix</h1> */}
                        {/* <div className="flex justify-center h-full w-full "> */}
                            <BarChart
                                chartData={BtechSeatMatrixData}
                                tittle={"B. Tech Seat Matrix"}
                            />
                        {/* </div> */}
                    </div>
                    <div className='md:w-1/2'>
                        {/* <h1 className='text-center text-2xl font-medium'>M.tech Seat Matrix</h1> */}
                        <BarChart
                            chartData={MTechSeatMatrix}
                            tittle={"M. Tech Seat Matrix"}
                        />
                    </div>
                </div>
                <div className='py-10'>
                    <h1 className='text-center text-5xl font-serif font-semibold text-red-900'>Placement Statistics</h1>
                </div>
                <div className='md:flex'>
                    <div className='md:w-1/2'>
                        <h1 className='text-center text-2xl font-medium'>Total Students Registered Vs Total Job Offered</h1>
                        <div className="flex justify-center">
                            <img src='https://tnp.nitp.ac.in/_next/image?url=%2F_next%2Fstatic%2Fimages%2FstudentVsJob-fa73232b0cdf0acfed7da52e59ee77d7.png&w=640&q=75' className='' />
                        </div>
                    </div>
                    <div className='md:w-1/2'>
                        <h1 className='text-center text-2xl font-medium'>Average Package Department-wise</h1>
                        <div className="flex justify-center">
                            <img src="https://tnp.nitp.ac.in/_next/image?url=%2F_next%2Fstatic%2Fimages%2Fpackage-4de5de13ac6f66e0be1f3c18c1def8fa.png&w=640&q=75" alt="" className='' />
                        </div>
                        {/* <Bar data={data} /> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Statics