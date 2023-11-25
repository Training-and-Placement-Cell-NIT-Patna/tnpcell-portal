

import { Chart } from "react-chartjs-2";
import BtechSeatMatriData from "../ChartsData/BtechSeatMatrixData";
import MTechSeatMatrix from "../ChartsData/MtechSeatMatrixData";
import AvgPkg from "../ChartsData/AveragePackageDeptWiseData";
import StudentRegisteredVsJobsOfferedData from "../ChartsData/SJobOffered"
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';



ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
)


function Statics() {

    return (
        <>
            <section className='py-20'>
                <div className='text-center py-10'>
                    <h1 className='text-center text-3xl md:text-5xl font-serif font-semibold text-red-900'>Seat Matrix</h1>
                </div>
                <div className='md:flex'>
                    <div className='md:w-1/2 flex flex-col items-center'>
                        <h1 className="font-medium text-sm md:text-lg  px-1  rounded-lg m-1 ">B.Tech Seat Matrix</h1>
                        <Chart
                            data={BtechSeatMatriData}
                        />
                        {/* </div> */}
                    </div>
                    <div className='md:w-1/2 flex flex-col items-center'>
                        <h1 className="font-medium text-sm md:text-lg px-1  rounded-lg m-1 ">M.Tech Seat Matrix</h1>
                        <Chart
                            data={MTechSeatMatrix}
                        />
                    </div>
                </div>
                <div className='py-10'>
                    <h1 className='text-center text-3xl md:text-5xl font-serif font-semibold text-red-900'>Placement Statistics</h1>
                </div>
                <div className='md:flex'>
                    <div className='md:w-1/2 flex flex-col items-center'>
                        <h1 className="font-medium text-sm md:text-lg  px-1  rounded-lg m-1 "> No. of Student registered V/S job Offered</h1>
                        <Chart type="bar" data={StudentRegisteredVsJobsOfferedData} />
                    </div>
                    <div className='md:w-1/2 flex flex-col items-center'>
                        <h1 className="font-medium text-sm md:text-lg  px-1  rounded-lg m-1 ">Average Package Department Wise</h1>
                        <Chart
                            type="bar"
                            data={AvgPkg}
                            title={"Average Package Department Wise"}

                        />
                        {/* <Bar data={data} /> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Statics