import Globe from "./ui/components/globe";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function GlobeDemo() {
  return (
    <div className="relative h-[90vh] flex size-full max-w-full items-center justify-center overflow-hidden px-10 lg:px-40 pb-40 pt-8 md:pb-60 md:shadow-xl">
      <div className="flex flex-col gap-8 w-full lg:w-2/3 z-10">
        <span className="text-shadow pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl lg:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Pass-a-Buy
        </span>
        <p className="mb-2">
          &quot;Pass-a-Buy&quot; is a community-driven platform designed to make
          buying and selling easier between travelers and local communities.
          Users can connect with travelers willing to bring items from other
          locations, facilitating cross-border purchases and bringing
          convenience to international shopping.
        </p>
        <Button className="bg-[#1e1880] mx-auto w-1/2">
          <Link to="/dashboard">Get Started</Link>
        </Button>
      </div>
      <Globe className="bottom-[-50%] -right-[50%] translate-x-1/5 translate-y-[90%] lg:translate-y-[50%] lg:translate-x-[25%]" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}
