// GET /api/user/
export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Store User Recent Searched Cities
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = await req.user;

    // Remove existing city if it exists (case-insensitive)
    user.recentSearchedCities = user.recentSearchedCities.filter(
      city => city.toLowerCase() !== recentSearchedCity.toLowerCase()
    );

    // Add new city to the beginning (most recent first)
    user.recentSearchedCities.unshift(recentSearchedCity);

    // Keep only the 3 most recent cities
    if (user.recentSearchedCities.length > 3) {
      user.recentSearchedCities = user.recentSearchedCities.slice(0, 3);
    }

    await user.save();
    res.json({ success: true, message: "City added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// POST /api/user/become-host
export const becomeHost = async (req, res) => {
  try {
    const user = await req.user;
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.role === "hotelOwner") {
      return res.json({ success: true, message: "Already a hotel owner" });
    }
    user.role = "hotelOwner";
    await user.save();
    res.json({ success: true, message: "Upgraded to hotel owner" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
