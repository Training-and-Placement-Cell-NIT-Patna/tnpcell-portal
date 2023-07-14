import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { Doughnut, Pie } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function RegisteredGraph({ student = [], title = '' }) {
  const [resultMap, setResultMap] = useState([])

  useEffect(() => {
    const occurences = student.reduce(function (r, row) {
      r[row.attributes.program.data?.attributes?.program_name] =
        ++r[row.attributes.program.data?.attributes?.program_name] || 1
      return r
    }, {})

    const mapData = Object.keys(occurences).map(function (key) {
      return { key: key, value: occurences[key] }
    })
    setResultMap(mapData)
  }, [student])
  let result = {
    labels: resultMap.map((item) => item.key),
    datasets: [
      {
        label: 'Students Registered',
        data: resultMap.map((item) => item.value),
        backgroundColor: [
          'rgba(60, 174, 255, 0.9)',
          'rgba(174, 94, 250, 0.9)',
          'rgba(91, 223, 172, 0.9)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.9)',
          'rgba(153, 102, 255, 0.9)',
          'rgba(255, 159, 64, 0.9)',
        ],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div>
      <p className='text-center text-xl font-bold'>{title}</p>
      <Doughnut
        data={result}
        options={{
          responsive: true,
        }}
      />
    </div>
  )
}
