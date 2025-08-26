import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountains View": false,
      "Pool Access": false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // to check if all inputs are filled
    if (
      !input.roomType ||
      !input.pricePerNight ||
      !input.amenities ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please fill in all the details");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", input.roomType);
      formData.append("pricePerNight", input.pricePerNight);
      // Comverting amenities to array and keeping only enabled amenities
      const amenities = Object.keys(input.amenities).filter(
        (key) => input.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));

      // Adding images to FormData
      Object.keys(images).forEach((key) => {
        images[key] && formData.append("images", images[key]);
      });

      const { data } = await axios.post("/api/rooms/", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        toast.success(data.message);
        setInput({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free Wifi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountains View": false,
            "Pool Access": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 sm:px-4 md:px-8 py-4 sm:py-6 ml-2 sm:ml-4 md:ml-8 lg:ml-12">

      <div className="max-w-7xl">
        <form onSubmit={onSubmitHandler} className="max-w-6xl">
          {/* Main Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 lg:mb-10">
            {/* Images Section */}
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                Images
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {Object.keys(images).map((key) => (
                  <label
                    htmlFor={`roomImages${key}`}
                    key={key}
                    className="group bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors duration-300 rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center h-24 sm:h-32 lg:h-36 border-2 border-dashed border-blue-200 hover:border-blue-400 cursor-pointer shadow-lg"
                  >
                    <img
                      className={`max-h-24 sm:max-h-32 lg:max-h-36 transition-all duration-300 ${
                        !images[key]
                          ? "p-3 sm:p-4 lg:p-6 opacity-60 group-hover:opacity-80"
                          : "object-cover w-full h-full"
                      }`}
                      src={
                        images[key]
                          ? URL.createObjectURL(images[key])
                          : assets.uploadArea
                      }
                      alt=""
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id={`roomImages${key}`}
                      hidden
                      onChange={(e) =>
                        setImages({ ...images, [key]: e.target.files[0] })
                      }
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Room Type and Price Section */}
            <div className="space-y-6 sm:space-y-8">
              {/* Room Type Section */}
              <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Room Type
                </h3>
                <select
                  value={input.roomType}
                  onChange={(e) =>
                    setInput({ ...input, roomType: e.target.value })
                  }
                  className="border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 lg:py-5 px-3 sm:px-4 lg:px-6 w-full bg-white/90 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 shadow-lg text-gray-700 font-medium text-sm sm:text-base lg:text-lg"
                >
                  <option value="">Select Room Type</option>
                  <option value="Single Bed">Single Bed</option>
                  <option value="Double Bed">Double Bed</option>
                  <option value="Luxury Room">Luxury Room</option>
                  <option value="Family Suite">Family Suite</option>
                </select>
              </div>

              {/* Price per Night Section */}
              <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Price per Night
                </h3>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-base sm:text-lg lg:text-xl">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    className="border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 lg:py-5 pl-8 sm:pl-10 lg:pl-14 pr-3 sm:pr-4 lg:pr-6 w-full bg-white/90 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300 shadow-lg text-gray-700 font-medium text-sm sm:text-base lg:text-lg"
                    value={input.pricePerNight}
                    onChange={(e) =>
                      setInput({ ...input, pricePerNight: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 xl:p-10 mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8">
              Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* First row - 3 amenities */}
              <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg sm:rounded-xl border border-teal-100 transition-colors duration-300">
                <input
                  type="checkbox"
                  id="amenitiesWifi"
                  checked={input.amenities["Free Wifi"]}
                  onChange={() =>
                    setInput({
                      ...input,
                      amenities: {
                        ...input.amenities,
                        "Free Wifi": !input.amenities["Free Wifi"],
                      },
                    })
                  }
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 border-2 border-blue-300 rounded focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                />
                <label
                  htmlFor="amenitiesWifi"
                  className="ml-3 sm:ml-4 text-sm sm:text-base font-semibold text-gray-700 cursor-pointer"
                >
                  Free Wifi
                </label>
              </div>

              <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border border-green-100 transition-colors duration-300">
                <input
                  type="checkbox"
                  id="amenitiesBreakfast"
                  checked={input.amenities["Free Breakfast"]}
                  onChange={() =>
                    setInput({
                      ...input,
                      amenities: {
                        ...input.amenities,
                        "Free Breakfast": !input.amenities["Free Breakfast"],
                      },
                    })
                  }
                  className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 border-2 border-green-300 rounded focus:ring-2 focus:ring-green-500 transition-colors duration-300"
                />
                <label
                  htmlFor="amenitiesBreakfast"
                  className="ml-3 sm:ml-4 text-sm sm:text-base font-semibold text-gray-700 cursor-pointer"
                >
                  Free Breakfast
                </label>
              </div>

              <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl border border-purple-100 transition-colors duration-300">
                <input
                  type="checkbox"
                  id="amenitiesService"
                  checked={input.amenities["Room Service"]}
                  onChange={() =>
                    setInput({
                      ...input,
                      amenities: {
                        ...input.amenities,
                        "Room Service": !input.amenities["Room Service"],
                      },
                    })
                  }
                  className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 border-2 border-purple-300 rounded focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
                />
                <label
                  htmlFor="amenitiesService"
                  className="ml-3 sm:ml-4 text-sm sm:text-base font-semibold text-gray-700 cursor-pointer"
                >
                  Room Service
                </label>
              </div>

              {/* Second row - 2 amenities */}
              <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg sm:rounded-xl border border-orange-100 transition-colors duration-300">
                <input
                  type="checkbox"
                  id="amenitiesMountains"
                  checked={input.amenities["Mountains View"]}
                  onChange={() =>
                    setInput({
                      ...input,
                      amenities: {
                        ...input.amenities,
                        "Mountains View": !input.amenities["Mountains View"],
                      },
                    })
                  }
                  className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 border-2 border-orange-300 rounded focus:ring-2 focus:ring-orange-500 transition-colors duration-300"
                />
                <label
                  htmlFor="amenitiesMountains"
                  className="ml-3 sm:ml-4 text-sm sm:text-base font-semibold text-gray-700 cursor-pointer"
                >
                  Mountains View
                </label>
              </div>

              <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg sm:rounded-xl border border-teal-100 transition-colors duration-300">
                <input
                  type="checkbox"
                  id="amenitiesPool"
                  checked={input.amenities["Pool Access"]}
                  onChange={() =>
                    setInput({
                      ...input,
                      amenities: {
                        ...input.amenities,
                        "Pool Access": !input.amenities["Pool Access"],
                      },
                    })
                  }
                  className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 border-2 border-teal-300 rounded focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                />
                <label
                  htmlFor="amenitiesPool"
                  className="ml-3 sm:ml-4 text-sm sm:text-base font-semibold text-gray-700 cursor-pointer"
                >
                  Pool Access
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              className="bg-gradient-to-r from-teal-500 via-cyan-600 to-teal-700 hover:from-teal-600 hover:via-cyan-700 hover:to-teal-800 text-white font-bold px-8 sm:px-12 lg:px-16 py-3 sm:py-4 lg:py-5 text-base sm:text-lg rounded-xl sm:rounded-2xl transition-colors duration-300 shadow-2xl w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
