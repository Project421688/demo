import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'

const AllAppointments = () => {

  const { aToken, cancelAppointment, backendUrl, doctors, getAllDoctors } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  // State for filtering and pagination
  const [appointments, setAppointments] = useState([])
  const [filterType, setFilterType] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  // Fetch filtered appointments
  const fetchFilteredAppointments = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        filterType,
        doctorName,
        fromDate,
        toDate
      }

      const { data } = await axios.get(backendUrl + '/api/admin/filtered-appointments-page', {
        headers: { aToken },
        params
      })
      
      if (data.success) {
        setAppointments(data.appointments)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  // Reset filters
  const resetFilters = () => {
    setFilterType('')
    setDoctorName('')
    setFromDate('')
    setToDate('')
    setCurrentPage(1)
  }

  // Apply filters
  const applyFilters = () => {
    setCurrentPage(1)
    fetchFilteredAppointments()
  }

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
      fetchFilteredAppointments()
    }
  }, [aToken])

  useEffect(() => {
    if (aToken && (filterType || doctorName || fromDate || toDate)) {
      fetchFilteredAppointments()
    }
  }, [currentPage])

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      {/* Filter Section */}
      <div className='bg-white border rounded p-4 mb-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <label className='text-sm font-medium text-gray-700'>Filter by:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary'
            >
              <option value="">Select Filter Type</option>
              <option value="date">Date</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Date Filter Card */}
          {filterType === 'date' && (
            <div className='border rounded p-4 bg-gray-50'>
              <h4 className='text-sm font-medium text-gray-700 mb-3'>Date Filter</h4>
              <div className='flex items-center gap-4'>
                <div>
                  <label className='text-xs text-gray-600'>From Date:</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className='block px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                </div>
                <div>
                  <label className='text-xs text-gray-600'>To Date:</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className='block px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                </div>
              </div>
            </div>
          )}

          {/* Doctor Filter Card */}
          {filterType === 'doctor' && (
            <div className='border rounded p-4 bg-gray-50'>
              <h4 className='text-sm font-medium text-gray-700 mb-3'>Doctor Filter</h4>
              <div className='flex flex-col gap-3'>
                <div>
                  <label className='text-xs text-gray-600'>Select Doctor:</label>
                  <select
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className='block w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
                    ))}
                  </select>
                </div>
                <div className='flex items-center gap-4'>
                  <div>
                    <label className='text-xs text-gray-600'>From Date:</label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className='block px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='text-xs text-gray-600'>To Date:</label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className='block px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filter Action Buttons */}
          {filterType && (
            <div className='flex items-center gap-2'>
              <button
                onClick={applyFilters}
                className='px-4 py-2 bg-primary text-white rounded text-sm hover:bg-primary/90'
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Apply Filter'}
              </button>
              <button
                onClick={resetFilters}
                className='px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50'
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        
        {loading ? (
          <div className='py-8 text-center text-gray-500'>Loading appointments...</div>
        ) : appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{(currentPage - 1) * 20 + index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{item.userData.dob !== 'Not Selected' ? calculateAge(item.userData.dob) : 'N/A'}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
            </div>
          ))
        ) : (
          <div className='py-8 text-center text-gray-500'>
            No appointments found for the selected criteria.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between mt-4 px-4 py-3 bg-white border rounded'>
          <div className='text-sm text-gray-700'>
            Page {currentPage} of {totalPages}
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default AllAppointments
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments