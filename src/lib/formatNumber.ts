const formatNumber = (num: string) => {
  const number = Number(num);

  if (isNaN(number) && number < 0) {
    const absNum = Math.abs(number);
    return "-" + absNum.toString().padStart(3, "0");
  }

  return num.toString().padStart(3, "0");
};

export default formatNumber;
