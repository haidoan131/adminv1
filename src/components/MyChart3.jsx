import { Bar } from 'react-chartjs-2';

// Dữ liệu cho biểu đồ
const data = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

// Tùy chọn cho biểu đồ
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales Data',
    },
  },
};

const MyBarChart1 = () => {
  return <Bar data={data} options={options} />;
};

export default MyBarChart1;
