// import React from "react";
// import { TEChart } from "tw-elements-react";

// export default function ChartPie() {
//   return (
//     <TEChart
//       type="pie"
//       data={{
//         labels: [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday ",
//         ],
//         datasets: [
//           {
//             label: "Traffic",
//             data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
//             backgroundColor: [
//               "rgba(63, 81, 181, 0.5)",
//               "rgba(77, 182, 172, 0.5)",
//               "rgba(66, 133, 244, 0.5)",
//               "rgba(156, 39, 176, 0.5)",
//               "rgba(233, 30, 99, 0.5)",
//               "rgba(66, 73, 244, 0.4)",
//               "rgba(66, 133, 244, 0.2)",
//             ],
//           },
//         ],
//       }}
//     />
//   );
// }

import React, { useState, useEffect } from "react";
import { TEChart } from "tw-elements-react";
import { Get } from "../../config/api-method"; // Replace with your actual API utility function

export default function ChartPie() {
  const [chartData, setChartData] = useState({
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        label: "Booking Status",
        data: [], // Data will be set dynamically
        backgroundColor: [
          "rgba(255, 193, 7, 0.5)", // Yellow for Pending
          "rgba(40, 167, 69, 0.5)", // Green for Approved
          "rgba(220, 53, 69, 0.5)", // Red for Rejected
        ],
      },
    ],
  });

  const getBookingData = () => {
    Get("/booking")
      .then((res) => {
        const bookings = res?.data || [];
        // Count the occurrences of each status
        const statusCounts = {
          Pending: bookings.filter((b) => b.status.toLowerCase() === "pending")
            .length,
          Approved: bookings.filter(
            (b) => b.status.toLowerCase() === "approved"
          ).length,
          Rejected: bookings.filter((b) => b.status.toLowerCase() === "reject")
            .length,
        };

        // Update the chart data
        setChartData((prevState) => ({
          ...prevState,
          datasets: [
            {
              ...prevState.datasets[0],
              data: [
                statusCounts.Pending,
                statusCounts.Approved,
                statusCounts.Rejected,
              ],
            },
          ],
        }));
      })
      .catch((err) => {
        console.error("Error fetching booking data:", err);
      });
  };

  useEffect(() => {
    getBookingData();
  }, []);

  return (
    <TEChart
      type="pie"
      data={chartData}
      options={{
        plugins: {
          legend: {
            position: "top",
          },
        },
      }}
    />
  );
}
