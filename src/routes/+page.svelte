<script>
  import Table from '../lib/Table.svelte'
  import { Calendar } from "$lib/components/ui/calendar";

  export let data
</script>

<main
  class="relative flex flex-col items-center min-h-screen py-2"
>
  <h1
    class="pt-4 pb-4 dark:from-white from-black text-center text-4xl font-medium"
  >
    Reward
  </h1>
  <Table users={data?.users} duration={data?.duration} />
  <div class="p-2 w-full">
    <Calendar class="rounded-md border shadow w-full" mode="single" />
  </div>
</main>
