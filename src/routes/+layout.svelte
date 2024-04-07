<script>
  import "../app.css";

  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<ModeWatcher />
<Toaster position="top-center" />
<slot />
