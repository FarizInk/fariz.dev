<script>
  import axios from "axios";
  import { spotifyToken, spotifyPlaylist } from "../../stores.js";
  import { onMount } from "svelte";
  import getToken from './getToken.js';

  const getPlaylist = async () => {
    if ($spotifyToken === null) await getToken();

    await axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + $spotifyToken.access_token,
        },
      })
      .then(function (response) {
        const data = response.data;
        spotifyPlaylist.set(data.items);
      })
      .catch(async function (err) {
        console.log(err.response);
        if (err.response.data.error.message === "The access token expired") {
          await getToken();
          await getPlaylist();
        }
      });
  };

  onMount(async () => {
    await getPlaylist();
  });
</script>

<style>
  .playlist {
    flex-grow: 1;
  }
  .widget-playlist {
    display: flex;
    flex-wrap: wrap;
    margin: 12px;
    width: calc(100% - 24px);
    background-color: black;
    border-radius: 12px;
  }

  .playlist-card {
    text-align: center;
    width: calc(50% - 24px);
    margin: 12px;
    background-color: #282828;
    border-radius: 12px;
    overflow: hidden;
  }
  .card-image {
    width: 100%;
  }

  .card-title {
    margin: 15px 0px;
    font-size: 20px;
    font-weight: bold;
  }
</style>

<div class="playlist">
  <div class="widget-playlist">
    {#each $spotifyPlaylist as { external_urls, images, name }, i}
      <div class="playlist-card">
        <div class="card-image-container">
          <img class="card-image" src={images[0].url} alt="" />
        </div>

        <div class="card-title">{name}</div>
      </div>
    {/each}
  </div>
</div>
