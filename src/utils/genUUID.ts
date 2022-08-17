export const uuid = (num: number = 16) => {
  const mask = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

  return `${mask}`.replace(/[xy]/g, function (c) {
    var r = (Math.random() * num) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
