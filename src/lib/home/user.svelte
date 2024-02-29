<script>
  import { Calendar } from "$lib/components/ui/calendar";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import Star from "lucide-svelte/icons/star";
  import Use from "lucide-svelte/icons/star-off";
  import Edit from "./edit.svelte";
  import * as Dialog from "$lib/components/ui/dialog";
</script>

<div class="w-full">
  <div class="flex gap-x-4 mb-4 pt-2">
    <Dialog.Root>
      <Dialog.Trigger class={buttonVariants({ variant: "outline", class: "flex-1" })}>
        Add
        <Star class="ml-2 h-4 w-4" variant="outline" />
      </Dialog.Trigger>
      <Edit />
    </Dialog.Root>
    <Dialog.Root>
      <Dialog.Trigger class={buttonVariants({ variant: "outline", class: "text-lg" })}>
        <Use class="h-4 w-4" variant="outline" />
      </Dialog.Trigger>
      <Edit isAdd={false} />
    </Dialog.Root>
  </div>
  <Calendar class="rounded-md border shadow w-full" mode="single" />
</div>
