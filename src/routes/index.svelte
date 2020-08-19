<script>
  import { onMount, onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";

  onMount(() => {
    console.log("Mount: Home");
  });

  onDestroy(() => {
    setTimeout(() => {
      console.log("Destroy: Home");
    }, 500);
  });

  const APP_NAME = process.env.APP_NAME;
</script>

<style>
  .intro .hello {
    font-size: 16px;
    font-family: "Fira Mono", monospace;
    color: var(--primary-color);
  }

  .intro .name {
    font-size: 80px;
    line-height: 1.1;
    color: var(--text-primary);
    font-weight: bold;
    margin: 20px 0px;
  }

  .intro .who-iam {
    font-size: 70px;
    line-height: 1.1;
    color: var(--recessive-color);
    font-weight: bold;
  }

  .intro .description {
    padding: 20px 0px 50px 0px;
    max-width: 500px;
    line-height: 1.7;
  }

  /* Responsive */
  @media screen and (max-width: 1000px) {
    .intro .name {
      font-size: 60px;
    }
    .intro .who-iam {
      font-size: 50px;
    }
  }

  @media screen and (max-width: 700px) {
    .intro .name {
      font-size: 40px;
    }
    .intro .who-iam {
      font-size: 30px;
    }
  }

  @media screen and (max-width: 500px) {
    .intro .name {
      font-size: 30px;
    }
    .intro .who-iam {
      font-size: 20px;
    }
  }
</style>

<svelte:head>
  <title>Home • Fariz</title>
</svelte:head>

<div class="content align-center">
  <div class="intro">
    <div class="hello" in:fly={{ y:50, duration: 400 }}>
      Hi, my name is
    </div>
    <h1 class="name" in:fly={{ delay: 100, y:50, duration: 400 }}>Nizar Alfarizi Akbar.</h1>
    <h2 class="who-iam" in:fly={{ delay: 200, y:50, duration: 400 }}>Part of the dark energy of space.</h2>
    <p class="description" in:fade={{ delay: 400, duration: 400 }}>
      I'm a software engineer based in Sidoarjo, Indonesia specializing in
      Backend Developer, high-quality websites and applications.
    </p>
    <a
      href="mailto:me@fariz.dev"
      target="_blank"
      rel="nofollow noopener noreferrer"
      class="btn btn-lg"
      in:fade={{ delay: 700, duration: 400 }}>
      Get In Touch
    </a>
  </div>
</div>
