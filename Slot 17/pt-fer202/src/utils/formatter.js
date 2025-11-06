/**
 * Format a number as currency (VND)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted amount with VND currency symbol
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};