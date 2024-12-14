export default function Hero() {
  return (
    <section
      className="min-h-screen bg-black text-white flex flex-col justify-between p-8 md:p-16"
      style={{
        backgroundImage: "url(/img/background.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="space-y-4">
        <h1 className="text-7xl md:text-9xl font-normal tracking-tight">
          silvana
        </h1>
        <p className="text-2xl md:text-5xl font-light">Grow wild and free</p>
      </div>
      <h2 className="mt-40 text-4xl md:text-6xl lg:text-6xl font-bold leading-tight max-w-3xl">
        Proof of everything engine to scale your business
      </h2>
    </section>
  );
}
