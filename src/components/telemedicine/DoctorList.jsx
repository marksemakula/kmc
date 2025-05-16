import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setCurrentChat } from '../../store/slices/telemedicineSlice';
import { FaCircle } from 'react-icons/fa';

export default function DoctorList({ setIsConnecting }) {
  const dispatch = useDispatch();
  const doctors = useSelector(state => state.telemedicine.doctors);
  const currentChat = useSelector(state => state.telemedicine.currentChat);

  const handleDoctorSelect = (doctorId) => {
    setIsConnecting(true);
    setTimeout(() => {
      dispatch(setCurrentChat(doctorId));
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-primary text-white">
        <h2 className="text-lg font-semibold">Available Doctors</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              currentChat === doctor.id ? 'bg-gray-50' : ''
            }`}
            onClick={() => handleDoctorSelect(doctor.id)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
              </div>
              <div className="flex items-center">
                <FaCircle
                  className={`${
                    doctor.status === 'online' ? 'text-green-500' : 'text-gray-400'
                  } text-xs mr-2`}
                />
                <span className="text-sm text-gray-500 capitalize">
                  {doctor.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}