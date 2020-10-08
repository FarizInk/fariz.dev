<script>
  import { fade, fly } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import axios from "axios";
  import {
    spotifyToken,
    spotifyPhoto,
    spotifyName,
    spotifySongPhoto,
    spotifySongTitle,
    spotifySongArtist,
    spotifySongStatus,
    spotifyNowPlaying,
  } from "../../stores.js";

  const getToken = async () => {
    await axios
      .get("https://spotify-farizdotdev.herokuapp.com/")
      .then(function (response) {
        spotifyToken.set(response.data);
        // console.log($spotifyToken);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getProfile = async () => {
    if ($spotifyToken === null) await getToken();

    await axios
      .get("https://api.spotify.com/v1/me/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + $spotifyToken.access_token,
        },
      })
      .then(function (response) {
        const data = response.data;
        spotifyName.set(data.display_name);
        spotifyPhoto.set(data.images[0].url);
      })
      .catch(async function (err) {
        console.log(err.response);
        if (err.response.data.error.message === "The access token expired") {
          await getToken();
          await getProfile();
        }
      });
  };

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

  onMount(async () => {
    await getProfile();
    loopCP;
  });

  onDestroy(() => {
    clearInterval(loopCP);
  });
</script>

<style>
  .content {
    padding-top: 40px;
  }

  .current-playing {
    flex-grow: 1;
  }

  .widget-cp {
    max-width: 300px;
    margin: 12px;
    background-color: black;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  .photo-container {
    margin-top: 40px;
  }

  .photo {
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }

  .name {
    margin-top: 12px;
    font-size: 30px;
  }

  .song-playing {
    margin-top: 40px;
    background-color: #1db954;
    width: 100%;
    height: 90px;
    display: flex;
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
    width: calc(100% - 90px);
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

  .song-title:hover,
  .song-artist:hover {
    animation: marquee 10s linear infinite;
  }

  .song-artist {
    font-size: 17px;
    white-space: nowrap;
  }

  @keyframes marquee {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-200%);
    }
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

  .playlist {
    flex-grow: 4;
  }
  .widget-playlist {
    margin: 12px;
    width: 100%;
    background-color: black;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Responsive */
  @media screen and (max-width: 1000px) {
  }

  @media screen and (max-width: 700px) {
  }

  @media screen and (max-width: 500px) {
  }
</style>

<svelte:head>
  <title>Spotify • Fariz</title>
</svelte:head>
<main>
  <div class="content">
    <div class="current-playing">
      <div class="widget-cp">
        <div class="photo-container">
          <img
            class="photo"
            src={$spotifyPhoto === null ? '' : $spotifyPhoto}
            style={'background-color: ' + ($spotifyPhoto === null ? 'white' : 'transparent')}
            alt="" />
        </div>

        <div class="name">
          {$spotifyName === null ? 'Loading...' : $spotifyName}
        </div>

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
          </div>
        {:else}
          <div class="song-playing" style="background: #181818">
            <div class="song-photo-container" style="background: #282828" />

            <div class="play-detail">
              <div class="song-title">Offline</div>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <div class="playlist">
      <div class="widget-playlist">ini playlist</div>
    </div>
  </div>
</main>
