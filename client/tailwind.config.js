/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Background Colors
        bgMain: "#252525", // Dark Gray (Main Background)
        bgNavbar: "#1E1E1E", // Slightly Darker Gray (Navbar)
        bgFooter: "#1E1E1E", // Slightly Darker Gray (Footer)
        bgCard: "#2C2C2C", // Slightly Lighter Dark Gray (Card Background)

        // Buttons
        btnPrimary: "#28A428", // Darker Neon Green (Primary Button)
        btnPrimaryHover: "#1E7D1E", // Even Darker Neon Green (Primary Hover)
        btnPrimaryText: "#000000", // Black (Primary Button Text)

        btnSecondary: "#3A3A3A", // Slightly Lighter Gray (Secondary Button)
        btnSecondaryHover: "#4A4A4A", // Even Lighter Gray (Secondary Hover)
        btnSecondaryText: "#FFFFFF", // White (Secondary Button Text)

        btnDisabled: "#444444", // Dimmed Gray (Disabled Button)
        btnDisabledText: "#888888", // Darker Gray (Disabled Text)

        // Borders
        borderCard: "#FFFFFF", // White (10-20% Opacity for Borders)
        borderWarning: "#FF3B30", // Red (Warning Border)

        // Text Colors
        textHeading: "#EAEAEA", // White (Headings)
        textBody: "#B0B0B0", // Light Gray (Body Text)

        // Navbar & Menu
        menuText: "#B0B0B0", // Light Gray (Menu Default)
        menuTextHover: "#EAEAEA", // White (Menu Hover)
        menuTextActive: "#28A428", // Darker Neon Green (Active Menu Item)

        // Alerts
        textError: "#FF3B30", // Red (Errors)
        textWarning: "#FFD700", // Yellow (Warnings)
        textSuccess: "#28A428", // Darker Neon Green (Success Messages)
      },

      fontFamily: {
        worksans: ["Work Sans", "serif"],
        gelasio: ["'Gelasio'", "serif"],
      },
    },
  },
  plugins: [],
};
