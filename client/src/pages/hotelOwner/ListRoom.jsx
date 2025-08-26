import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user, currency } = useAppContext();

  // to fetch rooms of hotel owner
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // to toggle room availability
  const toggleAvailability = async (roomId) => {
    const { data } = await axios.post('/api/rooms/toggle-availability', {roomId}, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    })
    if (data.success) {
      toast.success(data.message);
      fetchRooms();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div className="px-2 sm:px-4 md:px-8 py-4 sm:py-6">

      <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th className="py-3 sm:py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                  Name
                </th>
                <th className="py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider w-2/5">
                  Facility
                </th>
                <th className="py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                  Price / Night
                </th>
                <th className="py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rooms.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/60 transition-colors duration-300"
                >
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-semibold text-gray-900 align-middle">
                    {item.roomType}
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-sm text-gray-600 align-middle">
                    <div className="flex flex-wrap gap-1.5 justify-center items-center">
                      {item.amenities.map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 text-xs rounded-full font-medium whitespace-nowrap"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-bold text-gray-900 text-center align-middle">
                    {currency} {item.pricePerNight}
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 align-middle">
                    <div className="flex items-center justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          onChange={() => toggleAvailability(item._id)}
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.isAvailable}
                        />
                        <div className="w-11 h-6 sm:w-14 sm:h-7 bg-gray-200 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-600 transition-colors duration-200 shadow-lg"></div>
                        <span className="dot absolute left-1 top-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5 sm:peer-checked:translate-x-7 shadow-md"></span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListRoom;
