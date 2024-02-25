<script>
  import Table from '../lib/Table.svelte'
  import { Calendar } from "$lib/components/ui/calendar";

  export let data
</script>

<main
  class="relative flex flex-col items-center justify-center min-h-screen py-10"
>
  <h1
    class="pt-4 pb-8 dark:from-white from-black text-center text-4xl font-medium"
  >
    Reward
  </h1>
  <Table users={data?.users} duration={data?.duration} />
  <Calendar class="rounded-md border shadow" mode="single" />
</main>
