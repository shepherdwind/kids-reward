<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import SunMoon from "lucide-svelte/icons/sun-moon";

  import { toggleMode, resetMode } from "mode-watcher";
  let count = 1;

  const handleChange = () => {
    count = count % 3;
    if (count < 2) {
      toggleMode();
      count++;
      return;
    }
    resetMode();
    count = 3;
  };
</script>

<div class="text-xs inline-flex justify-center" on:click={handleChange}>
  {#if count === 3}
    <SunMoon />
  {:else}
    <Sun
      class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
  {/if}
  <span class="sr-only">Toggle theme</span>
</div>
