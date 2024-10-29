import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <form className="flex max-w-md flex-col gap-4 border p-2 m-auto translate-y-1/2 shadow-md shadow-[#ccc] rounded-md">
      <div>
        <div className="mb-2 block">
          <Label className="text-[#fff]" htmlFor="email2" value="Your email" />
        </div>
        <TextInput
          id="email2"
          type="email"
          placeholder="name@flowbite.com"
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            className="text-[#fff]"
            htmlFor="password2"
            value="Your password"
          />
        </div>
        <TextInput id="password2" type="password" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            className="text-[#fff]"
            htmlFor="repeat-password"
            value="Repeat password"
          />
        </div>
        <TextInput id="repeat-password" type="password" required shadow />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="flex text-[#fff]">
          I agree with the&nbsp;
          <Link
            to={"/"}
            className="text-cyan-600 underline dark:text-cyan-500"
          >
            terms and conditions.
          </Link>
        </Label>
      </div>
      <Button type="submit">Register new account</Button>
    </form>
  );
}
