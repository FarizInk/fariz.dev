<script>
  import { onMount } from "svelte";
  export let segment;

  onMount(() => {
    let mainNav = document.getElementById("js-menu");
    let navBarToggle = document.getElementById("js-navbar-toggle");

    navBarToggle.addEventListener("click", function() {
      mainNav.classList.toggle("active");
    });
  });
</script>

<nav class="navbar">
  <span class="navbar-toggle" id="js-navbar-toggle">
    <!-- <i class="fas fa-bars" /> -->
    Toggle
  </span>
  <a href="." class="logo">Fariz</a>
  <ul class="main-nav" id="js-menu">
    <li>
      <a href="/about" class="nav-links {segment === 'about' ? 'active' : ''}">
        <span>01.</span>
        About
      </a>
    </li>
    <li>
      <a
        href="/experience"
        class="nav-links {segment === 'experience' ? 'active' : ''}">
        <span>02.</span>
        Experience
      </a>
    </li>
    <li>
      <a href="/work" class="nav-links {segment === 'work' ? 'active' : ''}">
        <span>03.</span>
        Work
      </a>
    </li>
    <li>
      <a
        href="/contact"
        class="nav-links {segment === 'contact' ? 'active' : ''}">
        <span>04.</span>
        Contact
      </a>
    </li>
    <li>
      <a href="javascript:void(0)" class="btn">Resume</a>
    </li>
  </ul>
</nav>
