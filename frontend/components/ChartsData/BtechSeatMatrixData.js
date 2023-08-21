
const xLabel = ["B Arch", "Civil Enginn.", "Computer Sci. Engin.", "Electronics & comm. Enginne.", "Electrical Enginne.", "Mechanical Engin.", "Integrated Msc"];

const yDataLabel = [40, 101, 157, 127, 100, 105, 50];

const BtechSeatMatriData = {

    labels:xLabel,

    datasets: [
      {
        type:'bar',
        label:"No. of registered stduents",
         backgroundColor:"rgba(239,194,130,255)",
        borderColor:'white',
        borderWidth:3,
        data:yDataLabel
      }
    ]

}

export default BtechSeatMatriData;