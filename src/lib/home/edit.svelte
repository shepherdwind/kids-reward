<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  export let isAdd = true;
</script>

<Dialog.Content class="mx-auto w-5/6">
  <Dialog.Header>
    <Dialog.Title>{isAdd ? "Add" : "Use"} Stars</Dialog.Title>
  </Dialog.Header>
  <div class="grid gap-4 py-4">
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="name" class="text-right">Stars</Label>
      <Input id="name" value="1" class="col-span-3" type="number" />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="username" class="text-right">Reason</Label>
      <Input
        id="username"
        value={isAdd ? "Eating well" : ""}
        class="col-span-3"
        placeholder="Please input"
      />
    </div>
  </div>
  <Dialog.Footer class="items-end">
    <Button type="submit" class="w-1/3" variant="outline">Save</Button>
  </Dialog.Footer>
</Dialog.Content>
