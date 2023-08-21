const StudentRegisteredData = [ 77,58,58,67,80,66,3,9,10,0];
const xAxisLabel = ["ME", "EE", "CE", "ECE", "CSE", "IT", "PHY", "CHEM", "MATH", "ARCH"]

const JobOfferedData = [ 63,50,35,78,120,93,3,0,1,0];

const Sdata = {
    labels:xAxisLabel,

    datasets:[
        {
            type: 'line',
            label:"Total No. of Job Offers made",
            // borderColor:"rgba(113,202,226,255)",
            borderColor:"black",
            backgroundColor:"black",
            borderWidth:2,
            fill:false,
            data:JobOfferedData
        },
        {
            type: 'bar',
            label:"Total No. of registered Eligible student",
            backgroundColor: "rgba(113,202,226,255)",
            // borderColor:"rgba(113,202,226,255)",
            borderWidth:2,
            data:StudentRegisteredData,
        },

    ],
}


export default Sdata;