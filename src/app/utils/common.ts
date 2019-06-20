const deepCopy = data => {
  return JSON.parse(JSON.stringify(data));
};

export { deepCopy };
