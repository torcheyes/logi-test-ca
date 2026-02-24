function formatUSD(amount) {
    let parts = amount.toString().split(".");
    if (parts.length === 1) {
        parts.push("00")
    } else if (parts[1].length === 1) {
        parts[1] += "0"
    } else if (parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2)
    }

    let formattedNumber = parseFloat(parts.join('.')).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    return formattedNumber;
}


module.exports = {
    handleWinReport,
    formatUSD
}