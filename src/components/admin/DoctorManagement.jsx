import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import { updateDoctor, addDoctor, removeDoctor } from '../../store/slices/telemedicineSlice';

export default function DoctorManagement() {
  const dispatch = useDispatch();
  const doctors = useSelector(state => state.telemedicine.doctors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    status: 'online',
    avatar: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDoctor) {
      dispatch(updateDoctor({ ...formData, id: editingDoctor.id }));
    } else {
      dispatch(addDoctor({ ...formData, id: Date.now() }));
    }
    setShowAddModal(false);
    setEditingDoctor(null);
    setFormData({ name: '', specialty: '', status: 'online', avatar: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Doctor Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <FaUserPlus />
          <span>Add Doctor</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-4 shadow"
          >
            <div className="flex items-start justify-between">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingDoctor(doctor);
                    setFormData(doctor);
                    setShowAddModal(true);
                  }}
                  className="text-primary hover:text-primary-dark"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => dispatch(removeDoctor(doctor.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold mt-4">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
            <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm ${
              doctor.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {doctor.status}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialty</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                <input
                  type="url"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingDoctor(null);
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  {editingDoctor ? 'Update' : 'Add'} Doctor
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}