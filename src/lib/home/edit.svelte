<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import Star from "lucide-svelte/icons/star";
  import Use from "lucide-svelte/icons/star-off";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { toast } from "svelte-sonner";

  export let isAdd = true;
  export let id: number;

  let score = 1;
  let reason = isAdd ? "Eating well" : "";
  let open = false;

  const handleSubmit = () => {
    fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        score: isAdd ? +score : -score,
        reason,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success(`Score ${isAdd ? "added" : "used"} successfully`);
          open = false;
        }
      });
  };
</script>

<Dialog.Root {open}>
  <Dialog.Trigger
    class={buttonVariants({ variant: "outline", class: isAdd ? "flex-1" : "" })}
    on:click={() => (open = true)}
  >
    {#if isAdd}
      Add<Star class="ml-2 h-4 w-4" />
    {:else}
      Use
      <Use class="ml-2 h-4 w-4" />
    {/if}
  </Dialog.Trigger>
  <Dialog.Content class="mx-auto w-5/6">
    <Dialog.Header>
      <Dialog.Title>{isAdd ? "Add" : "Use"} Stars</Dialog.Title>
    </Dialog.Header>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="score" class="text-right">Stars</Label>
          <Input
            id="score"
            name="score"
            bind:value={score}
            class="col-span-3"
            type="number"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="reason" class="text-right">Reason</Label>
          <Input
            id="reason"
            name="reason"
            bind:value={reason}
            class="col-span-3"
            placeholder="Please input"
          />
        </div>
      </div>
      <Dialog.Footer class="items-end">
        <Button type="submit" class="w-1/3" variant="outline">Save</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
