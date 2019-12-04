// function to handle page number for offset
const trueOffset = (pagenumber) => {
  const page = pagenumber;
  if (page >= 2) {
    const tOffset = (page - 1) * 10;
    return tOffset;
  }
  return page;
};

export default trueOffset;
