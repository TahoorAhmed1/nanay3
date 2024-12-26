// import React from "react";
// import { TEChart } from "tw-elements-react";

// export default function ChartBar() {
//   return (
//     <TEChart
//       type="bar"
//       data={{
//         labels: ["January", "February", "March", "April", "May", "June"],
//         datasets: [
//           {
//             label: "Traffic",
//             data: [30, 15, 62, 65, 61, 6],
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(54, 162, 235, 0.2)",
//               "rgba(255, 206, 86, 0.2)",
//               "rgba(75, 192, 192, 0.2)",
//               "rgba(153, 102, 255, 0.2)",
//               "rgba(255, 159, 64, 0.2)",
//             ],
//             borderColor: [
//               "rgba(255,99,132,1)",
//               "rgba(54, 162, 235, 1)",
//               "rgba(255, 206, 86, 1)",
//               "rgba(75, 192, 192, 1)",
//               "rgba(153, 102, 255, 1)",
//               "rgba(255, 159, 64, 1)",
//             ],
//             borderWidth: 1,
//           },
//         ],
//       }}
//       options={{
//         plugins: {
//           legend: {
//             position: "top",
//             labels: {
//               color: "green",
//             },
//           },
//         },
//         scales: {
//           x: {
//             ticks: {
//               color: "#4285F4",
//             },
//           },
//           y: {
//             ticks: {
//               color: "#f44242",
//             },
//           },
//         },
//       }}
//     />
//   );
// }

import React, { useState, useEffect } from "react";
import { TEChart } from "tw-elements-react";
import { Get } from "../../config/api-method"; // Replace with your actual API utility function

export default function ChartBar() {
  const [chartData, setChartData] = useState({
    labels: ["3 Days", "1 Week", "1 Month", "3 Months", "6 Months", "1 Year"],
    datasets: [
      {
        label: "User Creation Percentage",
        data: [], // Will be filled dynamically
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const calculateTimeframeData = (users) => {
    const now = new Date();
    const timeframes = [
      { label: "3 Days", days: 3 },
      { label: "1 Week", days: 7 },
      { label: "1 Month", days: 30 },
      { label: "3 Months", days: 90 },
      { label: "6 Months", days: 180 },
      { label: "1 Year", days: 365 },
    ];

    // Calculate counts for each timeframe
    const counts = timeframes.map(({ days }) => {
      const timeframeDate = new Date();
      timeframeDate.setDate(now.getDate() - days);
      return users.filter((user) => new Date(user.createdAt) >= timeframeDate)
        .length;
    });

    // Calculate total users and percentages
    const totalUsers = users.length;
    const percentages = counts.map((count) =>
      ((count / totalUsers) * 100).toFixed(2)
    );

    // Update chart data
    setChartData((prevState) => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: percentages,
        },
      ],
    }));
  };

  const getData = () => {
    Get("/auth")
      .then((res) => {
        const users = res?.data || [];
        calculateTimeframeData(users); // Process the data for the chart
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TEChart
      type="bar"
      data={chartData}
      options={{
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "green",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#4285F4",
            },
          },
          y: {
            ticks: {
              color: "#f44242",
            },
          },
        },
      }}
    />
  );
}
