import { useSelector } from 'react-redux';
import ReactECharts from 'echarts-for-react';
import { format, subDays } from 'date-fns';

export default function Analytics() {
  const applications = useSelector(state => state.hr.applications);
  const doctors = useSelector(state => state.telemedicine.doctors);
  const activeChats = useSelector(state => state.telemedicine.activeChats);

  // Generate last 7 days for x-axis
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    return format(subDays(new Date(), i), 'MMM dd');
  }).reverse();

  // Mock data for consultations
  const consultationData = last7Days.map(() => Math.floor(Math.random() * 20 + 5));

  const consultationOption = {
    title: {
      text: 'Daily Consultations',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: last7Days
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: consultationData,
      type: 'line',
      smooth: true,
      areaStyle: {
        opacity: 0.3
      },
      lineStyle: {
        width: 3
      }
    }]
  };

  const statusDistributionOption = {
    title: {
      text: 'Application Status Distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: applications.filter(a => a.status === 'pending').length, name: 'Pending' },
        { value: applications.filter(a => a.status === 'interviewing').length, name: 'Interviewing' },
        { value: applications.filter(a => a.status === 'accepted').length, name: 'Accepted' },
        { value: applications.filter(a => a.status === 'rejected').length, name: 'Rejected' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Total Doctors</h3>
          <p className="text-3xl font-bold text-primary">{doctors.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Active Chats</h3>
          <p className="text-3xl font-bold text-primary">{Object.keys(activeChats).length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-primary">{applications.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ReactECharts option={consultationOption} style={{ height: '400px' }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ReactECharts option={statusDistributionOption} style={{ height: '400px' }} />
        </div>
      </div>
    </div>
  );
}