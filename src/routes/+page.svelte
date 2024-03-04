<script>
  import Index from '../lib/home/index.svelte'
  import Switch from '../lib/switch.svelte';
  export let data
</script>

<main
  class="relative flex flex-col items-center min-h-screen py-2"
>
  <h1
    class="pt-4 pb-4 dark:from-white from-black text-center text-4xl font-medium"
  >
    Reward
    <Switch />
  </h1>
  <Index users={data?.users} duration={data?.duration} rewards={data?.rewards} />
</main>
