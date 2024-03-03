<script lang="ts">
  import { Calendar } from "$lib/components/ui/calendar";
  import Edit from "./edit.svelte";
  export let id: number;
  let open = false;
</script>

<div class="w-full">
  <div class="flex gap-x-4 mb-4 pt-2">
    <Edit id={id} />
    <Edit id={id} isAdd={false} />
  </div>
  <Calendar class="rounded-md border shadow w-full" />
</div>
