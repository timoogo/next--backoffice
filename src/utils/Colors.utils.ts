export const getContrastingTextColor = (chipColor: string): string => {
    const r = parseInt(chipColor.substr(1, 2), 16);
    const g = parseInt(chipColor.substr(3, 2), 16);
    const b = parseInt(chipColor.substr(5, 2), 16);
    const luminosity = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminosity > 128 ? 'text-black' : 'text-white';
};

export const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};