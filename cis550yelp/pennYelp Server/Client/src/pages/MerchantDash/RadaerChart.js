import React from 'react';
import Chart from 'react-apexcharts';

const RadarChart = ({ useful, funny, cool }) => {
  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.4,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ['Useful', 'Funny', 'Cool'],
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        const index = opts.dataPointIndex;
        const labels = [useful, funny, cool];
        return labels[index] !== undefined ? labels[index] : 0;
      },
    },
  };

  const chartSeries = [
    {
      name: 'Ratings',
      data: [useful, funny, cool],
    },
  ];

  return <Chart options={chartOptions} series={chartSeries} type="radar" height="200" />;
};

export default RadarChart;