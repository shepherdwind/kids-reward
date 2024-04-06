<script>
  import Index from "../lib/home/index.svelte";
  import Switch from "../lib/switch.svelte";
  import Menu from "../lib/menu.svelte";
  export let data;
</script>

<main class="relative flex flex-col items-center min-h-screen">
  <div class="w-full max-w-xl p-4 flex justify-between border-b">
    <Menu />
    <div class="font-bold">Kids Reward</div>
    <Switch />
  </div>
  <Index
    users={data?.users}
    duration={data?.duration}
    rewards={data?.rewards}
  />
</main>
