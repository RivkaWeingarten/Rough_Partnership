function formatNumberCommas(number) {
    return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  export default formatNumberCommas