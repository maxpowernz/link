/** @type {number} */
const { resolve } = require("path");
const baseWidth = 48;
const basePixel = 6;
const widths = Array.from(Array(13).keys())
  .map((num) => `${num * baseWidth + basePixel * (num > 0 ? num - 1 : 0)}px`)
  .map((val, idx) => ({ [`grid-${idx}`]: val }))
  .reduce((acc, val) => ({ ...acc, ...val }), {});

const customSizes = {
  0.75: 3,
  1.5: 3,
  3.75: 15,
  4.5: 18,
  7.5: 30,
  10.5: 42,
  13.5: 54,
  76: 304,
  81: 324,
  90: 360,
  96.5: 396,
  141: 564,
  150: 600,
};

module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    resolve(__dirname, "../../../node_modules/daisyui/dist/**/*.js"),
    resolve(__dirname, "../../../node_modules/react-daisyui/dist/**/*.js"),
    // include packages if not transpiling
    //"../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        1.5: 3,
      },
      colors: {
        "fmg-green": {
          DEFAULT: "#209400",
          5: "rgba(32, 148, 0, 0.05)",
          10: "rgba(32, 148, 0, 0.1)",
          20: "rgba(32, 148, 0, 0.2)",
        },
        incomplete: "hsla(38, 84%, 60%, 1)", // ##EFAE41
        black: {
          DEFAULT: "#000",
          47: "hsla(0, 0%, 47%, 1)", // #787878
          86: "hsla(0, 0%, 86%, 1)", // #DCDCDC
        },
        "multi-value": {
          DEFAULT: "hsla(225, 8%, 90%, 1)", // #E3E4E7
          remove: "hsla(0, 0%, 47%, 1)", // #787878
        },
        light: "#00A8CB",
        "warning-light": "#EFAE41",
        text: {
          DEFAULT: "rgba(25, 30, 38, 1)",
          primary: "rgba(25, 30, 38, 1)",
          secondary: "rgba(25, 30, 38, .75)",
          placeholder: "rgba(25, 30, 38, .5)", //#191e2680
          disabled: "rgba(25, 30, 38, .5)",
        },
        disabled: {
          DEFAULT: "rgba(235, 236, 238, 1)",
          content: "rgba(194, 196, 200, 1)",
        },
        error: {
          DEFAULT: "#A62F1F",
          focus: "#8D281A",
          20: "rgba(166, 47, 31, 0.2)",
        },
        // named by percent of gray
        gray: {
          5: "rgba(0, 0, 0, 0.05)", //#0000000D
          10: "rgba(0, 0, 0, 0.10)", //#0000001A
          15: "rgba(0, 0, 0, 0.15)", //#00000026
          20: "rgba(0, 0, 0, 0.20)",
          25: "rgba(0, 0, 0, 0.25)",
          30: "rgba(0, 0, 0, 0.30)",
          75: "rgba(0, 0, 0, 0.75)",
          100: "rgba(0, 0, 0, 1)",
        },
        blue: {
          216: {
            DEFAULT: "hsla(216, 100%, 50%, 1)",
            active: "hsla(216, 2%, 60%, 1)", // #97999C
          },
          217: {
            DEFAULT: "hsla(217, 100%, 50%, 1)", // #636F82
            content: "hsla(217, 14%, 45%, 1)", // #97999C
          },
          220: {
            DEFAULT: "hsla(220, 100%, 50%, 1)",
            bg: "hsla(220, 3%, 78%, 1)", // #C5C6C8
          },
          225: {
            DEFAULT: "hsla(225, 100%, 50%, 1)",
            active: "hsla(225, 2%, 60%, 1)", // #E3E4E7
          },
          240: {
            DEFAULT: "hsla(240, 100%, 50%, 1)",
            "hover-10": "hsla(240, 6%, 91%, 1)", // #E6E6E9
            "hover-20": "hsla(240, 8%, 95%, 1", // #F1F1F3
            hover: "hsla(240, 8%, 97%, 1)", // #F8F8F9
            pressed: "hsla(240, 2%, 92%, 1)", // #EAEAEB
            active: "hsla(240, 8%, 95%, 1)", // #F1F1F3
          },
        },
        tabs: {
          bg: "#F1F1F3",
          hover: "#E6E6E8",
          light: "#7C7F83",
          dark: "#191E26",
        },
      },
      fontSize: {
        sm: ["12px", "14px"],
        base: ["14px", "18px"],
        md: ["16px", "20px"],
        lg: ["18px", "22px"],
        xl: ["20px", "24px"],
      },
      fontFamily: {
        sans: ["Heebo", "sans-serif"],
        mono: ["Heebo", "sans-serif"],
        serif: ["Heebo", "sans-serif"],
      },
      ringWidth: {
        6: "6px",
      },
      width: {
        ...widths,
        ...customSizes,
      },
      minWidth: {
        ...customSizes,
      },
      borderWidth: {
        1.5: 3,
      },
      height: {
        ...customSizes,
      },
      minHeight: {
        ...customSizes,
      },
      maxHeight: {
        ...customSizes,
      },
      padding: {
        ...customSizes,
      },
      opacity: {
        15: 0.15,
      },
      margin: { ...customSizes },
      gridTemplateColumns: {
        // Simple 16 column grid
        //3: 'repeat(3, minmax(0, 1fr))',
        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
      screens: {
        sm: "360px", // mobile
        md: "1024px", // tablet
        lg: "1366px", // laptop
        xl: "1920px", // desktop
      },
      backgroundPosition: {
        "header-desktop": "right -65px bottom 0",
        "header-mobile": "left -870px bottom 0",
      },
      transitionTimingFunction: {
        "segmented-bounce": "cubic-bezier(.27,.97,.51,1.1)",
        "segmented-bounce-icons": "cubic-bezier(.27,.97,.51,1.2)",
      },
      animation: {
        snackbarIn: "snackbarIn 0.5s both ease-in-out",
        snackbarOut: "snackbarOut 0.4s both",
      },
      keyframes: {
        snackbarIn: {
          "0%": {
            transform: "translateY(200px)",
            opacity: 0.7,
          },
          "80%": { transform: "translate(0px)", opacity: 0.7 },
          "100%": { opacity: 1 },
        },
        snackbarOut: {
          "0%": { opacity: 1 },
          "20%": { opacity: 0.7 },
          "100%": {
            transform: "translateY(200px)",
            opacity: 0.7,
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          // Primary
          primary: "#209400",
          "primary-focus": "#1B7E00",
          ".btn-primary:active": {
            "background-color": "#1A7404",
            "border-color": "#1A7404",
          },
          ".btn-primary:focus-visible": {
            "background-color": "#1B7E00",
            "border-color": "#1B7E00",
            outline: "none",
          },
          "primary-content": "#FFFFFF",
          // Primary Light
          ".btn-primary-light": {
            "background-color": "#45A62B",
            "border-color": "transparent",
          },
          ".btn-primary-light:hover": {
            "background-color": "#59B042",
            "border-color": "transparent",
          },
          ".btn-primary-light:active": {
            "background-color": "#1F8804",
            "border-color": "transparent",
          },
          ".btn-primary-light:focus-visible": {
            "background-color": "#59B042",
            outline: "none",
          },
          // Primary Light
          ".btn-primary-block-light": {
            "background-color": "#E8F4E5",
            color: "#209400",
            "border-color": "transparent",
          },
          ".btn-primary-block-light:hover": {
            "background-color": "#209400",
            color: "#FFFFFF",
            "border-color": "transparent",
          },
          ".btn-primary-block-light:active": {
            "background-color": "#1A7404",
            color: "#FFFFFF",
            "border-color": "transparent",
          },
          ".btn-primary-block-light:focus-visible": {
            "background-color": "#209400",
            color: "#FFFFFF",
            outline: "none",
          },
          // Primary Inline Light
          ".btn-primary-inline-light": {
            "background-color": "#209400",
            "border-color": "transparent",
          },
          ".btn-primary-inline-light:hover": {
            "background-color": "#379F1A",
            "border-color": "transparent",
          },
          ".btn-primary-inline-light:active": {
            "background-color": "#1F8804",
            "border-color": "transparent",
          },
          ".btn-primary-inline-light:focus-visible": {
            "background-color": "#379F1A",
            outline: "none",
          },
          // Secondary
          secondary: "#E5E5E5",
          "secondary-focus": "#CECECE",
          ".btn-secondary:active": {
            "background-color": "#BBBCBD",
          },
          ".btn-secondary:focus-visible": {
            outline: "none",
            "background-color": "#CECECE",
            "border-color": "#CECECE",
          },
          "secondary-content": "#191E26",
          // Error
          error: "#A62F1F",
          ".btn-error:hover": {
            "background-color": "#8D281A",
          },
          ".btn-error:active": {
            "background-color": "#81271B",
          },
          ".btn-error:focus-visible": {
            outline: "none",
            "background-color": "#8D281A",
            "border-color": "#8D281A",
          },
          "error-content": "#FFFFFF",
          // Ghost override for Inline Light
          ".btn-ghost": {
            color: "#00A8CB",
          },
          ".btn-ghost:hover": {
            "background-color": "#F2FBFD",
          },
          ".btn-ghost:active": {
            "background-color": "#E7EFF2",
          },
          ".btn-ghost:focus-visible": {
            outline: "none",
            "background-color": "#F2FBFD",
          },
          "ghost-content": "#00A8CB",
          // Disabled override
          ".btn-disabled": {
            "background-color": "#EBECEE",
            color: "#C2C4C8",
          },
          ".btn-disabled:focus-visible": {
            outline: "none",
            "background-color": "#EBECEE",
            "border-color": "#EBECEE",
          },
        },
      },
    ],
  },
  safelist: [
    {
      pattern: /(w-grid|text|opacity)-.*/,
    },
    {
      pattern: /grid-cols-./,
    },
  ],
  plugins: [require("daisyui")],
};
