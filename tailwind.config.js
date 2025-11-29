import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./resources/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                primary: ['"Roboto Mono"', "monospace"],
                headline: ['"Stack Sans Headline"', "sans-serif"],
            },

            colors: {
                background: "#000000",
                foreground: "#ffffff",
                brand: "#22c55e",
                selectionBg: "#22c55e",
                selectionText: "#000000",
            },
        },
    },
    plugins: [],
};
