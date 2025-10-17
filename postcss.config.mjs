// postcss.config.js
const config = {
  plugins: {
    // 1. Tailwind CSS ka plugin jo @tailwind directives ko process karta hai
    'tailwindcss': {},
    
    // 2. Autoprefixer plugin, jo purane browsers (like kuch TV browsers)
    // ke liye zaroori vendor prefixes (-webkit-, -moz- etc.) add karta hai.
    'autoprefixer': {},
  },
};

export default config;

// Note: Agar tum .js file use kar rahe ho, toh "export default config"
// ki jagah "module.exports = config;" use karna zyada common hai.