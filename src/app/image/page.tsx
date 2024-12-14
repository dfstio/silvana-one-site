import Image from "next/image";

export default function Home() {
  return (
    <div className="fixed inset-0">
      <Image
        src="/img/silvana.png"
        alt="Silvana"
        layout="fixed"
        width={1600}
        height={900}
        objectFit="cover"
        priority
      />
    </div>
  );
}
