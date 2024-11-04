function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            &quot;Pass-a-Buy&quot; is a community-driven platform designed to make buying
            and selling easier between travelers and local communities. Users
            can connect with travelers willing to bring items from other
            locations, facilitating cross-border purchases and bringing
            convenience to international shopping.
          </p>
          <button className="bg-[var(--navy-blue)] p-4 text-white">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
