import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { currency, user, getToken, toast, axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/bookings/hotel', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })
      if(data.success) {
        setDashboardData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  },[user])

  return (
    <div className="px-2 sm:px-4 md:px-8 py-4 sm:py-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Total Bookings */}
        <div className="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 rounded-xl sm:rounded-2xl shadow-xl transition-colors duration-300 p-4 sm:p-6 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-6 sm:-mr-8 -mt-6 sm:-mt-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full -ml-4 sm:-ml-6 -mb-4 sm:-mb-6"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="bg-white/20 backdrop-blur-lg p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <img
                  src={assets.totalBookingIcon}
                  alt="Total Bookings"
                  className="h-6 w-6 sm:h-8 sm:w-8 brightness-0 invert"
                />
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold mb-1">
                  {dashboardData.totalBookings}
                </div>
                <div className="text-blue-100 text-xs sm:text-sm font-medium">
                  TOTAL BOOKINGS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="group relative bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 rounded-xl sm:rounded-2xl shadow-xl transition-colors duration-300 p-4 sm:p-6 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-6 sm:-mr-8 -mt-6 sm:-mt-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full -ml-4 sm:-ml-6 -mb-4 sm:-mb-6"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="bg-white/20 backdrop-blur-lg p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <img
                  src={assets.totalRevenueIcon}
                  alt="Total Revenue"
                  className="h-6 w-6 sm:h-8 sm:w-8 brightness-0 invert"
                />
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold mb-1">
                  {currency} {dashboardData.totalRevenue}
                </div>
                <div className="text-green-100 text-xs sm:text-sm font-medium">
                  TOTAL REVENUE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
            Recent Bookings
          </h2>
          <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-colors duration-300 text-sm sm:text-base self-start sm:self-auto">
            View All
          </button>
        </div>

        <div className="bg-white/60 backdrop-blur-lg rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                    Room Name
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-right text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dashboardData.bookings.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white/60 transition-colors duration-300"
                  >
                    <td className="py-3 sm:py-4 px-3 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                          {item.user.username.charAt(0)}
                        </div>
                        <div className="ml-2 sm:ml-4">
                          <p className="text-xs sm:text-sm font-semibold text-gray-900">
                            {item.user.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 whitespace-nowrap hidden md:table-cell">
                      <div className="bg-blue-50 px-2 sm:px-3 py-1 rounded-full inline-block">
                        <p className="text-xs sm:text-sm font-medium text-blue-700">
                          {item.room.roomType}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 whitespace-nowrap text-right">
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        {currency} {item.totalPrice}
                      </p>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 whitespace-nowrap text-center">
                      <span
                        className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold rounded-full ${
                          item.isPaid
                            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                        }`}
                      >
                        {item.isPaid ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
