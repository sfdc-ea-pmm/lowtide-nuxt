module.exports = {
    variants: {
        opacity: ({ after }) => after(['disabled'])
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}