export const mapToCssModules = (classNames = "", cssModule) => {
  if (!cssModule) return classNames;
  return classNames
    .split(" ")
    .map((c) => cssModule[c] || c)
    .join(" ");
};
