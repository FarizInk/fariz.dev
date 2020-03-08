<script>
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
  }
</style>

<svelte:head>
  <title>Home • Fariz</title>
</svelte:head>
<div class="content align-center">
  <div class="intro">
    <div class="hello">Hi, my name is</div>
    <h1 class="name">Nizar Alfarizi Akbar.</h1>
    <h2 class="who-iam">Part of the dark energy of space.</h2>
    <p class="description">
      I'm a software engineer based in Sidoarjo, Indonesia specializing in
      Backend Developer, high-quality websites and applications.
    </p>
    <a
      href="mailto:me@fariz.dev"
      target="_blank"
      rel="nofollow noopener noreferrer"
      class="btn btn-lg">
      Get In Touch
    </a>
  </div>
</div>
