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
      const data = {
        labels: MONTHS,
        datasets: [{
          label: 'My First Dataset',
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
          borderWidth: 1
        }]
      };;
    return (
        <>
            <section className='py-20'>
                <div className='text-center py-10'>
                    <h1 className='text-center text-5xl font-serif font-semibold'>Seat Matrix</h1>
                </div>
                <div className='md:flex'>
                    <div className='md:w-1/2'>
                        <h1 className='text-center text-2xl font-medium'>B.tech Seat Matrix</h1>
                        <div className="flex justify-center">
                            <img src='https://tnp.nitp.ac.in/_next/image?url=%2F_next%2Fstatic%2Fimages%2FbTech_seatMatrix-84bdf4009b05ab43980b666181053838.png&w=640&q=75' className='' />
                        </div>
                    </div>
                    <div className='md:w-1/2'>
                        <h1 className='text-center text-2xl font-medium'>M.tech Seat Matrix</h1>
                        <div className="flex justify-center">
                            <img src="https://tnp.nitp.ac.in/_next/image?url=%2F_next%2Fstatic%2Fimages%2FmTech_seatMatrix-bfd6b54d92b21f9731696a2d875b6883.png&w=640&q=75" alt="" className='' />
                        </div>
                    </div>
                </div>
                <div className='py-10'>
                    <h1 className='text-center text-5xl font-serif font-semibold'>Placement Statistics</h1>
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