import { Bar } from "react-chartjs-2";
function BarChart(props){
    return(
        <>
            <div>
                <Bar
                
                data={props.chartData}

                options = {
                    {
                        plugins:{
                            title:{
                                display:true,
                                text:props.tittle,
                            },
                           
                        }
                    }
                }

                />
            </div>
        </>
    )

}

export default BarChart;