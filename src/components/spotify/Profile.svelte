<script>
  import axios from "axios";
  import {
    spotifyToken,
    spotifyPhoto,
    spotifyName,
    spotifyDevices,
  } from "../../stores.js";
  import { onMount, onDestroy } from "svelte";
  import getToken from "./getToken.js";
  import MdSmartphone from "svelte-icons/md/MdSmartphone.svelte";
  import MdDesktopMac from "svelte-icons/md/MdDesktopMac.svelte";
  import MdHelp from "svelte-icons/md/MdHelp.svelte";

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
        spotifyName.set({
          name: data.display_name,
          url: data.external_urls.spotify,
        });
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

  const getDevices = async () => {
    if ($spotifyToken === null) await getToken();

    await axios
      .get("https://api.spotify.com/v1/me/player/devices", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + $spotifyToken.access_token,
        },
      })
      .then(function (response) {
        const data = response.data.devices;
        spotifyDevices.set(data);
      })
      .catch(async function (err) {
        console.log(err.response);
        if (err.response.data.error.message === "The access token expired") {
          await getToken();
          await getDevices();
        }
      });
  };


  const loopDevices = setInterval(async () => await getDevices(), 1000);

  onMount(async () => {
    await getProfile();
    await getDevices();
  });

  onDestroy(() => {
    clearInterval(loopDevices);
  });
</script>

<style>
  .profile {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .widget-cp {
    position: fixed;
    background-color: black;
    border-radius: 99px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin-top: 20px;
    -webkit-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.75);
  }

  .photo {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-left: 9px;
  }

  .name a {
    color: white;
    text-decoration: none;
  }

  .name a:hover {
    text-decoration: underline;
  }

  .devices {
    margin-left: 15px;
    display: flex;
  }

  .device-icon {
    color: #282828;
    width: 20px;
    height: 20px;
    margin: 0px 4px;
  }

  .device-icon.active {
    color: #1db954;
    width: 20px;
    height: 20px;
  }
</style>

<div class="profile">
  <div class="widget-cp">
    <img
      class="photo"
      src={$spotifyPhoto === null ? '' : $spotifyPhoto}
      style={'background-color: ' + ($spotifyPhoto === null ? 'white' : 'transparent')}
      alt="" />

    <div class="name">
      {#if $spotifyName.name === null}
        Loading...
      {:else}
        <a target="_blank" href={$spotifyName.url}>{$spotifyName.name}</a>
      {/if}
      <div class="devices">
        {#each $spotifyDevices as { is_active, type }, i}
          <div class="device-icon {is_active ? "active" : ""}">
            {#if type === 'Smartphone'}
            <MdSmartphone />
            {:else if type === 'Computer'}
            <MdDesktopMac />
            {:else}
            <MdHelp />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
