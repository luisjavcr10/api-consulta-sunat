const parseDate = (date) => {
    if (!date || date === '-') return null;
    const [month, day, year] = date.split('/');
    const newDate = new Date(year, month - 1, day);
    return newDate;
};

// Usa module.exports en lugar de export
module.exports = { parseDate };