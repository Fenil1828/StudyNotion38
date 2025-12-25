// // // // import React, { useState } from 'react'
// // // // import { Pie } from 'react-chartjs-2'
// // // // import { data } from 'react-router-dom'

// // // // const InstructorChart = ({courses}) => {

// // // //     const [currChart , setCurrChart] = useState("students")

// // // //     const generateRandomColors = (numColors) => {
// // // //         const colors =[]

// // // //         for(let i=0;i< numColors; i++){
// // // //             const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
// // // //             Math.random() * 256
// // // //             )}, ${Math.floor(Math.random() * 256)})`
// // // //             colors.push(color)
// // // //         }
// // // //         return colors
// // // //     }

// // // //     const chartDataStudents = {
// // // //         labels: courses.map((course) => course.courseName),
// // // //         datasets: [
// // // //             {
// // // //                 data: courses.map((course) => course.totalStudentsEnrolled),
// // // //                 backgroundColor: generateRandomColors(courses.length),
// // // //             },
// // // //         ],
// // // //     }

// // // //     const chartIncomeData = {
// // // //         labels: courses.map((course) => course.courseName),
// // // //         datasets: [
// // // //             {
// // // //                 data: courses.map((courses) => courses.totalAmountGenerated),
// // // //                 backgroundColor: generateRandomColors(courses.length),
// // // //             },
// // // //         ],
// // // //     }

// // // //     const options = {
// // // //         maintainAspectRatio: false,
// // // //     }


// // // //   return (
// // // //     <div className='flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6'>
// // // //         <p className='text-lg font-bold text-richblack-5'>Visualize</p>

// // // //         <div className='space-x-4 font-semibold'>
// // // //             <button
// // // //              onCanPlay={() => setCurrChart("students")}
// // // //              className={`rounded-sm p-1 px-3 transition-all duration-200 
// // // //                 ${currChart === "students"
// // // //                     ? "bg-richblack-700 text-yellow-50"
// // // //                     : "text-yellow-400"
// // // //                 }
// // // //                 `}
// // // //             >
// // // //                 Income
// // // //             </button>
// // // //         </div>
// // // //         <div className='relative mx-auto aspect-square h-full w-full'>
// // // //                 <Pie
// // // //                  data={currChart === "students" ? chartDataStudents : chartIncomeData}
// // // //                 options={options}
                
// // // //                 />
// // // //         </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default InstructorChart

// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
// // // import { Doughnut } from "react-chartjs-2";

// // // // Register required Chart.js components
// // // Chart.register(ArcElement, Tooltip, Legend);

// // // export default function InstructorChart({ courses }) {
// // //   const [chartData, setChartData] = useState(null);
// // //   const chartRef = useRef(null);
// // //   const canvasRef = useRef(null);

// // //   // Generate random colors for chart segments
// // //   const getRandomColors = (count) => {
// // //     const colors = [];
// // //     for (let i = 0; i < count; i++) {
// // //       const hue = Math.floor(Math.random() * 360);
// // //       colors.push(`hsl(${hue}, 70%, 50%)`);
// // //     }
// // //     return colors;
// // //   };

// // //   // Prepare chart data
// // //   useEffect(() => {
// // //     if (courses && courses.length > 0) {
// // //       const labels = courses.map((course) => course.courseName);
// // //       const totalStudents = courses.map(
// // //         (course) => course.totalStudentsEnrolled
// // //       );
      
// // //       const backgroundColors = getRandomColors(courses.length);
      
// // //       setChartData({
// // //         labels,
// // //         datasets: [
// // //           {
// // //             data: totalStudents,
// // //             backgroundColor: backgroundColors,
// // //             borderColor: backgroundColors.map(color => color.replace('50%', '40%')),
// // //             borderWidth: 2,
// // //           },
// // //         ],
// // //       });
// // //     }
// // //   }, [courses]);

// // //   // Clean up chart on unmount
// // //   useEffect(() => {
// // //     return () => {
// // //       if (chartRef.current) {
// // //         chartRef.current.destroy();
// // //         chartRef.current = null;
// // //       }
// // //     };
// // //   }, []);

// // //   // Initialize chart
// // //   const renderChart = () => {
// // //     if (!chartData || !canvasRef.current) return;
    
// // //     // Destroy previous chart if exists
// // //     if (chartRef.current) {
// // //       chartRef.current.destroy();
// // //     }
    
// // //     const ctx = canvasRef.current.getContext('2d');
// // //     chartRef.current = new Chart(ctx, {
// // //       type: 'doughnut',
// // //       data: chartData,
// // //       options: {
// // //         responsive: true,
// // //         maintainAspectRatio: false,
// // //         plugins: {
// // //           legend: {
// // //             position: "right",
// // //             labels: {
// // //               color: "#E2E8F0",
// // //               font: {
// // //                 size: 12,
// // //               },
// // //               padding: 20,
// // //               usePointStyle: true,
// // //             },
// // //           },
// // //           tooltip: {
// // //             callbacks: {
// // //               label: function(context) {
// // //                 const label = context.label || '';
// // //                 const value = context.raw || 0;
// // //                 return `${label}: ${value} students`;
// // //               }
// // //             }
// // //           }
// // //         },
// // //         cutout: "60%",
// // //         animation: {
// // //           animateRotate: true,
// // //           animateScale: true,
// // //           duration: 2000,
// // //         },
// // //       }
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     renderChart();
    
// // //     return () => {
// // //       if (chartRef.current) {
// // //         chartRef.current.destroy();
// // //         chartRef.current = null;
// // //       }
// // //     };
// // //   }, [chartData]);

// // //   if (!chartData) {
// // //     return (
// // //       <div className="flex items-center justify-center h-full">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="w-full h-full">
// // //       <canvas ref={canvasRef} />
// // //     </div>
// // //   );
// // // }


// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// // // // Register required Chart.js components
// // // Chart.register(ArcElement, Tooltip, Legend);

// // // export default function InstructorChart({ courses }) {
// // //   const [chartData, setChartData] = useState(null);
// // //   const chartRef = useRef(null);
// // //   const canvasRef = useRef(null);

// // //   // Generate random colors for chart segments
// // //   const getRandomColors = (count) => {
// // //     const colors = [];
// // //     for (let i = 0; i < count; i++) {
// // //       const hue = Math.floor(Math.random() * 360);
// // //       colors.push(`hsl(${hue}, 70%, 50%)`);
// // //     }
// // //     return colors;
// // //   };

// // //   // Prepare chart data
// // //   useEffect(() => {
// // //     if (courses && courses.length > 0) {
// // //       const labels = courses.map((course) => course.courseName);
// // //       const totalStudents = courses.map(
// // //         (course) => course.totalStudentsEnrolled
// // //       );
      
// // //       const backgroundColors = getRandomColors(courses.length);
      
// // //       setChartData({
// // //         labels,
// // //         datasets: [
// // //           {
// // //             data: totalStudents,
// // //             backgroundColor: backgroundColors,
// // //             borderColor: backgroundColors.map(color => color.replace('50%', '40%')),
// // //             borderWidth: 2,
// // //           },
// // //         ],
// // //       });
// // //     } else {
// // //       setChartData(null);
// // //     }
// // //   }, [courses]);

// // //   // Initialize and cleanup chart
// // //   useEffect(() => {
// // //     if (!chartData || !canvasRef.current) return;
    
// // //     const ctx = canvasRef.current.getContext('2d');
    
// // //     // Destroy previous chart if exists
// // //     if (chartRef.current) {
// // //       chartRef.current.destroy();
// // //     }
    
// // //     // Create new chart
// // //     chartRef.current = new Chart(ctx, {
// // //       type: 'doughnut',
// // //       data: chartData,
// // //       options: {
// // //         responsive: true,
// // //         maintainAspectRatio: false,
// // //         plugins: {
// // //           legend: {
// // //             position: "right",
// // //             labels: {
// // //               color: "#E2E8F0",
// // //               font: {
// // //                 size: 12,
// // //               },
// // //               padding: 20,
// // //               usePointStyle: true,
// // //             },
// // //           },
// // //           tooltip: {
// // //             callbacks: {
// // //               label: function(context) {
// // //                 const label = context.label || '';
// // //                 const value = context.raw || 0;
// // //                 return `${label}: ${value} students`;
// // //               }
// // //             }
// // //           }
// // //         },
// // //         cutout: "60%",
// // //         animation: {
// // //           animateRotate: true,
// // //           animateScale: true,
// // //           duration: 2000,
// // //         },
// // //       }
// // //     });
    
// // //     // Cleanup on unmount
// // //     return () => {
// // //       if (chartRef.current) {
// // //         chartRef.current.destroy();
// // //         chartRef.current = null;
// // //       }
// // //     };
// // //   }, [chartData]);

// // //   if (!chartData) {
// // //     return (
// // //       <div className="flex items-center justify-center h-full">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="w-full h-full">
// // //       <canvas ref={canvasRef} />
// // //     </div>
// // //   );
// // // }



// import React, { useEffect, useRef, useState } from "react";
// import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";

// // Register required Chart.js components
// Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

// export default function InstructorChart({ courses }) {
//   const [chartData, setChartData] = useState(null);
//   const chartRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Generate consistent colors for chart segments
//   const getConsistentColors = (count) => {
//     const colors = [];
//     const hueStep = 360 / count;
    
//     for (let i = 0; i < count; i++) {
//       const hue = Math.floor(i * hueStep);
//       colors.push(`hsl(${hue}, 70%, 60%)`);
//     }
//     return colors;
//   };

//   // Prepare chart data
//   useEffect(() => {
//     if (courses && courses.length > 0) {
//       const labels = courses.map((course) => course.courseName);
//       const totalStudents = courses.map(
//         (course) => course.totalStudentsEnrolled
//       );
      
//       // Filter out courses with 0 students for better visualization
//       const filteredData = courses.filter(course => course.totalStudentsEnrolled > 0);
      
//       if (filteredData.length === 0) {
//         setChartData(null);
//         return;
//       }
      
//       const filteredLabels = filteredData.map(course => course.courseName);
//       const filteredStudents = filteredData.map(course => course.totalStudentsEnrolled);
//       const backgroundColors = getConsistentColors(filteredData.length);
      
//       setChartData({
//         labels: filteredLabels,
//         datasets: [
//           {
//             label: 'Students Enrolled',
//             data: filteredStudents,
//             backgroundColor: backgroundColors,
//             borderColor: backgroundColors.map(color => color.replace('60%', '40%')),
//             borderWidth: 2,
//             hoverBackgroundColor: backgroundColors.map(color => color.replace('60%', '70%')),
//             hoverBorderColor: backgroundColors.map(color => color.replace('60%', '30%')),
//             hoverBorderWidth: 3,
//           },
//         ],
//       });
//     } else {
//       setChartData(null);
//     }
//   }, [courses]);

//   // Initialize and cleanup chart
//   useEffect(() => {
//     if (!chartData || !canvasRef.current) return;

//     const ctx = canvasRef.current.getContext('2d');

//     // Destroy previous chart if exists
//     if (chartRef.current) {
//       chartRef.current.destroy();
//     }

//     try {
//       // Create new chart
//       chartRef.current = new Chart(ctx, {
//         type: 'doughnut',
//         data: chartData,
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               position: "right",
//               labels: {
//                 color: "#E2E8F0",
//                 font: {
//                   size: 12,
//                   family: 'Inter, system-ui, sans-serif'
//                 },
//                 padding: 20,
//                 usePointStyle: true,
//                 pointStyle: 'circle',
//                 generateLabels: function(chart) {
//                   const data = chart.data;
//                   if (data.labels.length && data.datasets.length) {
//                     return data.labels.map((label, i) => {
//                       const dataset = data.datasets[0];
//                       const value = dataset.data[i];
//                       return {
//                         text: `${label} (${value})`,
//                         fillStyle: dataset.backgroundColor[i],
//                         strokeStyle: dataset.borderColor[i],
//                         lineWidth: dataset.borderWidth,
//                         hidden: false,
//                         index: i
//                       };
//                     });
//                   }
//                   return [];
//                 }
//               },
//             },
//             tooltip: {
//               enabled: true,
//               backgroundColor: 'rgba(0, 0, 0, 0.8)',
//               titleColor: '#E2E8F0',
//               bodyColor: '#E2E8F0',
//               borderColor: '#4A5568',
//               borderWidth: 1,
//               callbacks: {
//                 label: function(context) {
//                   const label = context.label || '';
//                   const value = context.raw || 0;
//                   const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
//                   const percentage = ((value / total) * 100).toFixed(1);
//                   return `${label}: ${value} students (${percentage}%)`;
//                 }
//               }
//             }
//           },
//           cutout: "60%",
//           animation: {
//             animateRotate: true,
//             animateScale: true,
//             duration: 1500,
//             easing: 'easeInOutQuart'
//           },
//           interaction: {
//             intersect: false,
//             mode: 'index'
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Error creating chart:', error);
//       setChartData(null);
//     }

//     // Cleanup on unmount
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//         chartRef.current = null;
//       }
//     };
//   }, [chartData]);

//   // Loading state
//   if (!courses || courses.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500 mx-auto mb-4"></div>
//           <p className="text-white">Loading chart data...</p>
//         </div>
//       </div>
//     );
//   }

//   // No data state
//   if (!chartData) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="text-center">
//           <div className="bg-richblack-700 rounded-full p-4 mb-4 mx-auto w-fit">
//             <svg className="w-8 h-8 text-richblack-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//             </svg>
//           </div>
//           <p className="text-richblack-300">No enrollment data available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-full relative text-white">
//       <canvas ref={canvasRef} className="max-w-full max-h-full  text-white " />
//     </div>
//   );
// }


// // import React, { useEffect, useRef, useState } from "react";
// // import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";

// // // Register required Chart.js components
// // Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

// // export default function InstructorChart({ courses }) {
// //   const [chartData, setChartData] = useState(null);
// //   const chartRef = useRef(null);
// //   const canvasRef = useRef(null);

// //   // Generate consistent colors for chart segments
// //   const getConsistentColors = (count) => {
// //     const colors = [];
// //     const hueStep = 360 / count;
    
// //     for (let i = 0; i < count; i++) {
// //       const hue = Math.floor(i * hueStep);
// //       colors.push(`hsl(${hue}, 70%, 60%)`);
// //     }
// //     return colors;
// //   };

// //   // Prepare chart data
// //   useEffect(() => {
// //     if (courses && courses.length > 0) {
// //       const labels = courses.map((course) => course.courseName);
// //       const totalStudents = courses.map(
// //         (course) => course.totalStudentsEnrolled
// //       );
      
// //       // Filter out courses with 0 students for better visualization
// //       const filteredData = courses.filter(course => course.totalStudentsEnrolled > 0);
      
// //       if (filteredData.length === 0) {
// //         setChartData(null);
// //         return;
// //       }
      
// //       const filteredLabels = filteredData.map(course => course.courseName);
// //       const filteredStudents = filteredData.map(course => course.totalStudentsEnrolled);
// //       const backgroundColors = getConsistentColors(filteredData.length);
      
// //       setChartData({
// //         labels: filteredLabels,
// //         datasets: [
// //           {
// //             label: 'Students Enrolled',
// //             data: filteredStudents,
// //             backgroundColor: backgroundColors,
// //             borderColor: backgroundColors.map(color => color.replace('60%', '40%')),
// //             borderWidth: 2,
// //             hoverBackgroundColor: backgroundColors.map(color => color.replace('60%', '70%')),
// //             hoverBorderColor: backgroundColors.map(color => color.replace('60%', '30%')),
// //             hoverBorderWidth: 3,
// //           },
// //         ],
// //       });
// //     } else {
// //       setChartData(null);
// //     }
// //   }, [courses]);

// //   // Initialize and cleanup chart
// //   useEffect(() => {
// //     if (!chartData || !canvasRef.current) return;

// //     const ctx = canvasRef.current.getContext('2d');

// //     // Destroy previous chart if exists
// //     if (chartRef.current) {
// //       chartRef.current.destroy();
// //     }

// //     try {
// //       // Create new chart
// //       chartRef.current = new Chart(ctx, {
// //         type: 'doughnut',
// //         data: chartData,
// //         options: {
// //           responsive: true,
// //           maintainAspectRatio: false,
// //           plugins: {
// //             legend: {
// //               display: false, // Hide default legend since we're showing course names above
// //             },
// //             tooltip: {
// //               enabled: true,
// //               backgroundColor: 'rgba(0, 0, 0, 0.8)',
// //               titleColor: '#E2E8F0',
// //               bodyColor: '#E2E8F0',
// //               borderColor: '#4A5568',
// //               borderWidth: 1,
// //               callbacks: {
// //                 label: function(context) {
// //                   const label = context.label || '';
// //                   const value = context.raw || 0;
// //                   const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
// //                   const percentage = ((value / total) * 100).toFixed(1);
// //                   return `${label}: ${value} students (${percentage}%)`;
// //                 }
// //               }
// //             }
// //           },
// //           cutout: "60%",
// //           animation: {
// //             animateRotate: true,
// //             animateScale: true,
// //             duration: 1500,
// //             easing: 'easeInOutQuart'
// //           },
// //           interaction: {
// //             intersect: false,
// //             mode: 'index'
// //           }
// //         }
// //       });
// //     } catch (error) {
// //       console.error('Error creating chart:', error);
// //       setChartData(null);
// //     }

// //     // Cleanup on unmount
// //     return () => {
// //       if (chartRef.current) {
// //         chartRef.current.destroy();
// //         chartRef.current = null;
// //       }
// //     };
// //   }, [chartData]);

// //   // Loading state
// //   if (!courses || courses.length === 0) {
// //     return (
// //       <div className="flex items-center justify-center h-full">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500 mx-auto mb-4"></div>
// //           <p className="text-richblack-300">Loading chart data...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // No data state
// //   if (!chartData) {
// //     return (
// //       <div className="flex items-center justify-center h-full">
// //         <div className="text-center">
// //           <div className="bg-richblack-700 rounded-full p-4 mb-4 mx-auto w-fit">
// //             <svg className="w-8 h-8 text-richblack-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// //             </svg>
// //           </div>
// //           <p className="text-richblack-300">No enrollment data available</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-full h-full relative">
// //       {/* Course Names Display - White Text */}
// //       <div className="mb-6">
// //         <h3 className="text-white text-lg font-semibold mb-3">Your Courses</h3>
// //         <div className="flex flex-wrap gap-3">
// //           {chartData.labels.map((courseName, index) => (
// //             <div
// //               key={index}
// //               className="flex items-center gap-2 px-3 py-2 rounded-lg bg-richblack-700/50 border border-richblack-600"
// //             >
// //               <span
// //                 className="w-3 h-3 rounded-full"
// //                 style={{
// //                   backgroundColor: chartData.datasets[0].backgroundColor[index]
// //                 }}
// //               ></span>
// //               <span className="text-white font-medium text-sm">
// //                 {courseName}
// //               </span>
// //               <span className="text-richblack-300 text-xs">
// //                 ({chartData.datasets[0].data[index]} students)
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
      
// //       {/* Chart Canvas */}
// //       <div className="h-64">
// //         <canvas ref={canvasRef} className="max-w-full max-h-full" />
// //       </div>
// //     </div>
// //   );
// // }






import React, { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function InstructorChart({ courses }) {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Generate consistent colors for chart segments
  const getConsistentColors = (count) => {
    const colors = [];
    const hueStep = 360 / count;
    
    for (let i = 0; i < count; i++) {
      const hue = Math.floor(i * hueStep);
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  };

  // Prepare chart data
  useEffect(() => {
    if (courses && courses.length > 0) {
      const labels = courses.map((course) => course.courseName);
      const totalStudents = courses.map(
        (course) => course.totalStudentsEnrolled
      );
      
      // Filter out courses with 0 students for better visualization
      const filteredData = courses.filter(course => course.totalStudentsEnrolled > 0);
      
      if (filteredData.length === 0) {
        setChartData(null);
        return;
      }
      
      const filteredLabels = filteredData.map(course => course.courseName);
      const filteredStudents = filteredData.map(course => course.totalStudentsEnrolled);
      const backgroundColors = getConsistentColors(filteredData.length);
      
      setChartData({
        labels: filteredLabels,
        datasets: [
          {
            label: 'Students Enrolled',
            data: filteredStudents,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('60%', '40%')),
            borderWidth: 2,
            hoverBackgroundColor: backgroundColors.map(color => color.replace('60%', '70%')),
            hoverBorderColor: backgroundColors.map(color => color.replace('60%', '30%')),
            hoverBorderWidth: 3,
          },
        ],
      });
    } else {
      setChartData(null);
    }
  }, [courses]);

  // Initialize and cleanup chart
  useEffect(() => {
    if (!chartData || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    // Destroy previous chart if exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    try {
      // Create new chart
      chartRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: "#FFFFFF", // Changed to white
                font: {
                  size: 12,
                  family: 'Inter, system-ui, sans-serif'
                },
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle',
                generateLabels: function(chart) {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    return data.labels.map((label, i) => {
                      const dataset = data.datasets[0];
                      const value = dataset.data[i];
                      return {
                        text: `${label} (${value})`,
                        fillStyle: dataset.backgroundColor[i],
                        strokeStyle: dataset.borderColor[i],
                        lineWidth: dataset.borderWidth,
                        hidden: false,
                        index: i,
                        fontColor: "#FFFFFF" // Ensure white text
                      };
                    });
                  }
                  return [];
                }
              },
            },
            tooltip: {
              enabled: true,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#FFFFFF', // Changed to white
              bodyColor: '#FFFFFF', // Changed to white
              borderColor: '#4A5568',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} students (${percentage}%)`;
                }
              }
            }
          },
          cutout: "60%",
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: 'easeInOutQuart'
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
    } catch (error) {
      console.error('Error creating chart:', error);
      setChartData(null);
    }

    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [chartData]);

  // Loading state
  if (!courses || courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white"> {/* Added text-white */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p>Loading chart data...</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-full text-white"> {/* Added text-white */}
        <div className="text-center">
          <div className="bg-richblack-700 rounded-full p-4 mb-4 mx-auto w-fit">
            <svg className="w-8 h-8 text-richblack-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p>No enrollment data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative text-white"> {/* Added text-white */}
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
    </div>
  );
}