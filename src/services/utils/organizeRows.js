export const organizeRows = (words) => {
  let res = [];

  for (let i = 0; i < 5; i++) {
    let row = [];
    for (let j = i * 8; j < (i + 1) * 8; j++) {
      row.push(words[j]);
    }
    res.push(row);
  }

  return res;
};
