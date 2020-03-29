<script>
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import { onMount, onDestroy } from "svelte";

  onMount(() => {
    console.log("Mount: Layout");
  });

  onDestroy(() => {
    console.log("Destroy: Layout");
  });

  export let segment;
</script>

{#if false}
  <!-- SUN MODE -->
  <style>
    :root {
      --bg-primary: #fff;
      --text-primary: #4e4d4d;
      --text-secondary: #4e4d4d;
      --secondary-color: #8f63de;
      --primary-color: #da20a9;
      --primary-color-hover: rgba(218, 32, 169, 0.07);
      --primary-2-color: #ff54af;
      --recessive-color: #f2c87c;
      --bg-secondary: #eee;
    }
  </style>
{:else}
  <!-- DARK MODE -->
  <style>
    :root {
      --bg-primary: #0d1430;
      --text-primary: #ffffff;
      --text-secondary: #a6afd2;
      --secondary-color: #e1475f;
      --primary-color: #00ffda;
      --primary-color-hover: rgba(100, 255, 218, 0.07);
      --primary-2-color: #70eb72;
      --recessive-color: #5b85fa;
      --bg-secondary: #020c1b;
    }
  </style>
{/if}


<div class="main-body">
  <Navbar {segment} />
  <main>
    <slot />
  </main>
  <Footer />
</div>
