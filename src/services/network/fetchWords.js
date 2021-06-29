import axios from "axios";

export const fetchAllWords = (numberOfWords) => {
  return axios.get(
    `https://random-word-api.herokuapp.com/word?number=${numberOfWords}`
  );
};
