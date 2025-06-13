import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user = { id, username, email, avatarUrl }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const register = async ({ username, email, password }) => {
    try {
      const response = await fetch(
        "https://authservice20250611021355.azurewebsites.net/api/Auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Registration failed");
      }

      const { userId } = await response.json();
      await createUserProfile({ userId, username, email });
      await createWallet(userId);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  const createUserProfile = async ({ userId, username, email }) => {
    const response = await fetch(
      "https://userprofileservice-ventixe-win24-msp.azurewebsites.net/api/UserProfile",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, username, email }),
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error("Profile creation failed: " + message);
    }

    console.log("Profile created for", userId);
  };

  const createWallet = async (userId) => {
    const response = await fetch(
      `https://walletsservice.azurewebsites.net/api/Wallet/${userId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error("Wallet creation failed: " + message);
    }

    console.log("Wallet created for", userId);
  };

  const login = async ({ username, password }) => {
    //login using auth service
    try {
      const response = await fetch(
        "https://authservice20250611021355.azurewebsites.net/api/Auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Login failed");
      }

      const data = await response.json();
      const { userId } = data;

      // Fetch full user profile from profile API
      const profileResponse = await fetch(
        `https://userprofileservice-ventixe-win24-msp.azurewebsites.net/api/UserProfile/${userId}`
      );
      if (!profileResponse.ok) {
        throw new Error("Failed to load user profile");
      }

      const profile = await profileResponse.json();

      const fullUser = {
        id: userId,
        username: profile.username,
        email: profile.email,
        avatar: profile.avatarUrl,
      };
      // Save user data to local storage
      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    await fetch(
      "https://authservice20250611021355.azurewebsites.net/api/auth/signout",
      {
        method: "POST",
        credentials: "include",
      }
    );
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
