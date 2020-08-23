<script>
  import { onMount, onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";

  onMount(() => {
    console.log("Mount: Contact");
  });

  onDestroy(() => {
    setTimeout(() => {
      console.log("Destroy: Contact");
    }, 500);
  });

  const APP_NAME = process.env.APP_NAME;
</script>

<style>
  .contact {
    width: 100%;
    display: flex; /* establish flex container */
    flex-direction: column; /* make main axis vertical */
    justify-content: center; /* center items vertically, in this case */
    align-items: center;
  }
  .contact .wht-nxt {
    font-size: 16px;
    margin-bottom: 20px;
    font-family: "Fira Mono", monospace;
    color: var(--primary-color);
  }

  .contact .git {
    font-size: 50px;
    line-height: 1.1;
    color: var(--text-primary);
    font-weight: bold;
  }

  .contact .description {
    padding: 20px 0px 50px 0px;
    max-width: 600px;
    line-height: 1.7;
    text-align: center;
    color: var(--text-secondary);
  }

  /* Responsive */
  @media screen and (max-width: 1000px) {
    .contact .git {
      font-size: 50px;
    }
  }

  @media screen and (max-width: 700px) {
    .contact .git {
      font-size: 30px;
    }
  }

  @media screen and (max-width: 500px) {
    .contact .git {
      font-size: 20px;
    }
  }
</style>

<svelte:head>
  <title>Contact • Fariz</title>
</svelte:head>

<main>
  <div class="content align-center">
    <div class="contact">
      <div class="wht-nxt" in:fly={{ y:50, duration: 400 }}>04. What's Next?</div>
      <h2 class="git" in:fly={{ delay: 100, y:50, duration: 400 }}>Get In Touch</h2>
      <p class="description" in:fade={{ delay: 300, duration: 400 }}>
        Although I'm not currently looking for freelance opportunities, my inbox
        <br />
        is always open. Whether for a potential project or just to say hi, I'll
        try my best to
        <br />
        answer your email!
      </p>
      <a
        href="mailto:me@fariz.dev"
        target="_blank"
        rel="nofollow noopener noreferrer"
        class="btn btn-lg"
        in:fade={{ delay: 600, duration: 400 }}>
        Say Hello
      </a>
    </div>
  </div>
</main>