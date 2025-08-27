import axios from "axios";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";


// In development, use relative paths so Vite proxy can forward to backend.
// In production (Vercel), use the absolute backend URL from env.
axios.defaults.baseURL = import.meta.env.DEV ? "" : import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [roleIntent, setRoleIntent] = useState(undefined);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [showIntentPrompt, setShowIntentPrompt] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms')
      if (data.success) {
        setRooms(data.rooms)
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setRoleIntent(data.roleIntent);
        if (!data.roleIntent) setShowIntentPrompt(true);
        setSearchedCities(data.recentSearchedCities);
      } else {
        // Retry fetching user details after 5 seconds
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [getToken, setIsOwner, setSearchedCities]);

  const saveRoleIntent = useCallback(async (intent) => {
    try {
      const { data } = await axios.post(
        "/api/user/intent",
        { roleIntent: intent },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setRoleIntent(data.roleIntent);
        setShowIntentPrompt(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios, getToken]);

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  useEffect(()=>{
    fetchRooms();
  },[])

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    roleIntent,
    setRoleIntent,
    saveRoleIntent,
    axios,
    showHotelReg,
    setShowHotelReg,
    showIntentPrompt,
    setShowIntentPrompt,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
