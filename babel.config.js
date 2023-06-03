module.exports = {
    presets: ['next/babel'],
    plugins: [
        ['module-resolver', {
            root: ['.'],
            alias: {
                '@': './', // o la ruta que sea apropiada en tu caso
            },
        }],
    ],
};
