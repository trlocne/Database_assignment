/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorblack: "var(--colorblack)",
        colorgrey: "var(--colorgrey)",
        "colorlight-grey": "var(--colorlight-grey)",
        colormain: "var(--colormain)",
        colorsecondary: "var(--colorsecondary)",
        colorwhite: "var(--colorwhite)",
        "variable-collection-black": "var(--variable-collection-black)",
        "variable-collection-grey": "var(--variable-collection-grey)",
        "variable-collection-light-grey": "var(--variable-collection-light-grey)",
        "variable-collection-primary": "var(--variable-collection-primary)",
        "variable-collection-white": "var(--variable-collection-white)",
        "variable-collection-white-grey": "var(--variable-collection-white-grey)",
        primary: '#030391',
        green: '#55BE24',
        grey: '#9D9D9D',
        lightGrey: "#F5F5F5",
        red: "#F51A1A",
        yellow: "#FFAB2D"
      },
      fontFamily: {
        a: "var(--a-font-family)",
        h5: "var(--h5-font-family)",
        "heading-h5": "var(--heading-h5-font-family)",
        p: "var(--p-font-family)",
      },
    },
  },
  plugins: [],
};
