import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData, doctors, getAllDoctors, backendUrl } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  // State for filtered appointments
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch filtered appointments
  const fetchFilteredAppointments = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(backendUrl + '/api/admin/filtered-appointments', {
        headers: { aToken },
        params: {
          page: currentPage,
          doctor: selectedDoctor
        }
      })
      
      if (data.success) {
        setFilteredAppointments(data.appointments)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching filtered appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (aToken) {
      getDashData()
      getAllDoctors()
    }
  }, [aToken])

  useEffect(() => {
    if (aToken) {
      fetchFilteredAppointments()
    }
  }, [aToken, currentPage, selectedDoctor])

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }
  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p></div>
        </div>
      </div>

      <div className='bg-white mt-10'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings (Today & Future)</p>
        </div>

        {/* Filter Controls */}
        <div className='px-4 py-3 border-b bg-gray-50'>
          <div className='flex items-center gap-4'>
            <label className='text-sm font-medium text-gray-700'>Filter by Doctor:</label>
            <select
              value={selectedDoctor}
              onChange={handleDoctorChange}
              className='px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary'
            >
              <option value="">All Doctors</option>
              {doctors.map(doctor => (
                <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
              ))}
            </select>
            {loading && <span className='text-sm text-gray-500'>Loading...</span>}
          </div>
        </div>

        <div className='pt-4 border border-t-0'>
          {filteredAppointments.length > 0 ? filteredAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              <div className='text-sm text-gray-600'>
                <p className='font-medium'>{item.userData.name}</p>
                <p>{item.slotTime}</p>
              </div>
              {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
            </div>
          )) : (
            <div className='px-6 py-8 text-center text-gray-500'>
              {loading ? 'Loading appointments...' : 'No appointments found for the selected criteria.'}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className='flex items-center justify-between px-6 py-4 border-t bg-gray-50'>
            <div className='text-sm text-gray-700'>
              Page {currentPage} of {totalPages}
            </div>
            <div className='flex gap-2'>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Next
              </button>
            </div>
          </div>
        )}
        </div>

    </div>
  )
}

export default Dashboard