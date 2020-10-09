import axios from "axios";
import { spotifyToken } from "../../stores.js";

const getToken = async () => {
  await axios
    .get("https://spotify-farizdotdev.herokuapp.com/")
    .then(function (response) {
      spotifyToken.set(response.data);
      // console.log(response.data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

export default getToken;