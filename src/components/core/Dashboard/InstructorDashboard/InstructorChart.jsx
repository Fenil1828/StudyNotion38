import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

// Register required Chart.js components
Chart.register(...registerables);

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
            label: "Students Enrolled",
            data: filteredStudents,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace("60%", "40%")),
            borderWidth: 2,
            hoverBackgroundColor: backgroundColors.map(color => color.replace("60%", "70%")),
            hoverBorderColor: backgroundColors.map(color => color.replace("60%", "30%")),
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

    const ctx = canvasRef.current.getContext("2d");

    // Destroy previous chart if exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    try {
      // Create new chart
      chartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: "#E2E8F0",
                font: {
                  size: 12,
                  family: "Inter, system-ui, sans-serif"
                },
                padding: 20,
                usePointStyle: true,
                pointStyle: "circle",
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
                        index: i
                      };
                    });
                  }
                  return [];
                }
              },
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "#E2E8F0",
              bodyColor: "#E2E8F0",
              borderColor: "#4A5568",
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  const label = context.label || "";
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
            easing: "easeInOutQuart"
          },
          interaction: {
            intersect: false,
            mode: "index"
          }
        }
      });
    } catch (error) {
      console.error("Error creating chart:", error);
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

  // No data state
  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="bg-richblack-700 rounded-full p-4 mb-4 mx-auto w-fit">
            <svg className="w-8 h-8 text-richblack-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-richblack-300">No enrollment data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative text-white">
      <canvas ref={canvasRef} className="max-w-full max-h-full text-white" />
    </div>
  );
}
