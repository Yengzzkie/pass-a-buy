"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Form() {
  return (
    <form className="flex text-white max-w-md flex-col gap-4 border w-full m-auto">
      <div>
        <div className="mb-2 block">
          <Label className="text-white" htmlFor="email1" value="email" />
        </div>
        <TextInput id="email" type="email" placeholder="name@flowbite.com" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label className="text-white" htmlFor="password" value="password" />
        </div>
        <TextInput id="password" type="password" required />
      </div>
      <div className="flex items-center gap-2 ">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-white">Remember me</Label>
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}
