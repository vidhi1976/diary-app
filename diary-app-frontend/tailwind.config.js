export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            'cream': '#FFF7D4',
            'coffee': '#6C3428',
            'sunset': '#FFB000',
            'peach': '#FFDBAA',
          },
          fontFamily: {
            'sans': ['Mate', 'serif'],
            'display': ['Pacifico', 'cursive'],
          }
        },
      },
      plugins: [],
    }