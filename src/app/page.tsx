import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-between p-8 md:p-16 relative">
      <Image
        src="/img/background-preview.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      <Image
        src="/img/background.svg"
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="relative z-10 space-y-4">
        <h1 className="text-7xl md:text-9xl font-normal tracking-tight">
          silvana
        </h1>
        <p className="text-2xl md:text-5xl font-light">Grow wild and free</p>
      </div>
      <h2 className="z-10 mt-20 mb-20 text-4xl md:text-6xl lg:text-6xl font-bold leading-tight max-w-3xl">
        Proof of everything engine to scale your business
      </h2>
    </section>
  );
}
