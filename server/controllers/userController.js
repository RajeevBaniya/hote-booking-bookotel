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
