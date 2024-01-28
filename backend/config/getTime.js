const getTime = function () {
  const now = new Date();
  const gmtOffset = 330 * 60 * 1000; // GMT offset in milliseconds (5 hours 30 minutes)
  const gmtPlus5_30 = new Date(now.getTime() + gmtOffset);
  const formattedTime = gmtPlus5_30.toISOString();
  return formattedTime;
};

module.exports = getTime;
