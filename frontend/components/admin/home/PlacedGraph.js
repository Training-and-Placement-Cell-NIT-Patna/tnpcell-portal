import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'FTE Placed Stats',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

export default function PlacedGraph({ student = [] }) {
  // Display Stack bar chart for students placed for each program and registered for FTE
  const [a1, setA1] = useState()
  const [a2, setA2] = useState()
  const [x, setX] = useState()
  const [unplaced, setUnplaced] = useState()
  const [label, setLabel] = useState([])

  let a1occurences = {},
    a2occurences = {},
    xoccurences = {},
    unplacedoccurences = {}

  useEffect(() => {

    // const ftestudent = student.filter(
    //   (item) => item.attributes.registered_for === 'FTE'
    // )
    // // set label for x axis

    // const label = ftestudent.map(
    //   (item) => item.attributes?.program.data?.attributes?.program_name
    // )

    const labelSet = new Set(label)

    setLabel(Array.from(labelSet))

    // Create dataset for placed a1, a2, x, unplaced

    const a1 = student.filter((item) => item.attributes.placed === 'A1')

    const a2 = student.filter((item) => item.attributes.placed === 'A2')

    const x = student.filter((item) => item.attributes.placed === 'X')

    const unplaced = student.filter(
      (item) => item.attributes.placed === 'Not Placed'
    )

    // Count occurences of each program
    a1.forEach((item) => {
      a1occurences[item.attributes?.program.data?.attributes?.program_name] =
        (a1occurences[item.attributes?.program.data?.attributes?.program_name] ||
          0) + 1
    })

    a2.forEach((item) => {
      a2occurences[item.attributes?.program.data?.attributes?.program_name] =
        (a2occurences[item.attributes?.program.data?.attributes?.program_name] ||
          0) + 1
    })

    x.forEach((item) => {
      xoccurences[item.attributes?.program.data?.attributes?.program_name] =
        (xoccurences[item.attributes?.program.data?.attributes?.program_name] ||
          0) + 1
    })

    unplaced.forEach((item) => {
      unplacedoccurences[item.attributes?.program.data?.attributes?.program_name] =
        (unplacedoccurences[
          item.attributes?.program.data?.attributes?.program_name
        ] || 0) + 1
    })

    setA1(a1occurences)
    setA2(a2occurences)
    setX(xoccurences)
    setUnplaced(unplacedoccurences)
  }, [student])

  let result = {
    labels: label,
    datasets: [
      {
        barPercentage: 0.5,
        label: 'Tier 1',
        data: a1,
        backgroundColor: 'rgba(94, 2, 2, 1)',
        borderColor: 'rgba(94, 2, 2, 1)',

        borderWidth: 1,
      },
      {
        barPercentage: 0.5,
        label: 'Tier 2',
        data: a2,
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        barPercentage: 0.5,
        label: 'Tier 3',
        data: x,
        borderWidth: 1,
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        barPercentage: 0.5,
        label: 'Not Placed',
        data: unplaced,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div>
      <p className='text-center text-xl font-bold'>Students Placed</p>
      <Bar data={result} options={options} />
    </div>
  )
}

