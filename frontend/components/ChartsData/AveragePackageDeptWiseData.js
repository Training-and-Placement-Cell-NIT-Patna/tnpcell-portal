
const xLabel = ["Computer Science","Electronics and Communication","Electrical","Mechanical","Civil","Physics","Maths"];
const yLabelData = [8.93,6.7,5.7,5.2,5.0,4.0,4.0];
// const yLabelData = [0,2,4,6,8,10];
const AvgPkg ={
    labels: xLabel,

    datasets: [
        {
            type:"bar",
            label:"Average Package Department Wise",
            borderColor:"white",
            backgroundColor: "rgba(181,70,85,100)",
            borderWidth: 3,
            data: yLabelData,
        }
       
    ],

}

export default AvgPkg;


// {
//     labels: "",

//         data: yLabelData,

//             backgroundColor: [
//                 'rgba(3, 38, 224)',
//                 'rgba(3, 38, 224)',
//                 'rgba(3, 38, 224)',
//                 'rgba(3, 38, 224)',
//                 'rgba(3, 38, 224)',
//                 'rgba(3, 38, 224)',
//             ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',

//                 ],

//                     borderWidth: 1,
//         }