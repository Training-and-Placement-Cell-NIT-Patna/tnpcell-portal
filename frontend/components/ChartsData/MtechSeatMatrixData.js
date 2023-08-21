const xLabel = ["Civil Enginn.", "Computer Sci. Engin.", "Electrical Enginne.", "Mechanical Engin.", "Electronics & comm. Enginne.", "Architecture"];
const yLabelData = [105, 40, 42, 57, 31, 19];
const MTechSeatMatrix = {

    labels: xLabel,

    datasets: [
        {
            type:'bar',
            label: "No. of registered students",
            data: yLabelData,
            backgroundColor:"rgba(14,105,156,255)",
            borderColor: "white",
            borderWidth: 3,
        }
    ]

}
export default MTechSeatMatrix;