<script>
  import { fade, fly } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import Profile from '../components/spotify/Profile'
  import MyPlaylist from '../components/spotify/MyPlaylist'
  import CurrentPlaying from '../components/spotify/CurrentPlaying'
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
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
    <Profile/>
    <CurrentPlaying/>

    <!-- Playlist Here -->
    <MyPlaylist/>
  </div>
</main>
