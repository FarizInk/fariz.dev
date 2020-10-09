<script>
  import axios from "axios";
  import getToken from "./getToken.js";
  import { onMount, onDestroy } from "svelte";
  import {
    spotifyToken,
    spotifySongPhoto,
    spotifySongTitle,
    spotifySongArtist,
    spotifySongStatus,
    spotifyNowPlaying,
  } from "../../stores.js";

  const currentPaying = async () => {
    if ($spotifyToken === null) await getToken();

    await axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + $spotifyToken.access_token,
        },
      })
      .then(function (response) {
        const data = response.data;
        // console.log(data);
        if (data === "") {
          spotifyNowPlaying.set(false);
        } else {
          spotifyNowPlaying.set(true);
          spotifySongStatus.set(data.is_playing === true ? 1 : 0);
          spotifySongTitle.set({
            name: data.item.name,
            url: data.item.external_urls.spotify,
          });
          spotifySongArtist.set(data.item.artists);
          spotifySongPhoto.set(data.item.album.images[1].url);
        }
      })
      .catch(async function (err) {
        console.log(err.response);
        if (err.response.data.error.message === "The access token expired") {
          await getToken();
          await currentPaying();
        }
      });
  };

  const loopCP = setInterval(async () => await currentPaying(), 1000);

  onDestroy(() => {
    clearInterval(loopCP);
  });
</script>

<style>
  .song-playing {
    margin-top: 40px;
    background-color: #1db954;
    width: 100%;
    height: 90px;
    display: flex;
    border-radius: 12px;
    overflow: hidden;
  }

  .song-photo-container {
    width: 90px;
    height: 90px;
    overflow: hidden;
  }

  .song-photo {
    width: 90px;
    height: 90px;
  }

  .play-detail {
    width: calc(100% - 240px);
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  .status-playing {
    color: black;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .song-title {
    font-size: 25px;
    font-weight: bold;
    white-space: nowrap;
  }

  .song-artist {
    font-size: 17px;
    white-space: nowrap;
  }

  .song-artist a,
  .song-title a {
    color: white;
    text-decoration: none;
  }

  .song-artist a:hover,
  .song-title a:hover {
    text-decoration: underline;
  }

  .sample {
    border-bottom: 150px solid #181818;
    border-left: 50px solid transparent;
    height: 0;
    width: 150px;
  }
</style>

{#if $spotifyNowPlaying}
  <div class="song-playing">

    <div class="song-photo-container">
      <img
        class="song-photo"
        src={$spotifySongPhoto === null ? '' : $spotifySongPhoto}
        style={'background-color: ' + ($spotifySongPhoto === null ? 'white' : 'transparent')}
        alt="" />
    </div>

    <div class="play-detail">
      <div class="status-playing">
        {$spotifySongStatus === 0 ? 'Paused' : 'Now Listening'}
      </div>
      <div class="song-title">
        {#if $spotifySongTitle.name === null}
          Loading...
        {:else}
          <a
            target="_blank"
            href={$spotifySongTitle.url}>{$spotifySongTitle.name}</a>
        {/if}
      </div>
      <div class="song-artist">
        {#if $spotifySongArtist.length === 0}
          Loading...
        {:else}
          {#each $spotifySongArtist as { name, external_urls }, i}
            {#if i !== 0},{/if}
            <a target="_blank" href={external_urls.spotify}>{name}</a>
          {/each}
        {/if}
      </div>
    </div>

    <!-- <div class="sample">
      <div class="try-container">
        Try
      </div>
    </div> -->
  </div>
{:else}
  <div class="song-playing" style="background: #181818">
    <div class="song-photo-container" style="background: #282828" />

    <div class="play-detail">
      <div class="song-title">Offline</div>
    </div>
  </div>
{/if}
