import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-7">
      <Image
        src="/licet.png"
        alt="LICET logo"
        width={180}
        height={59}
        priority
      />
      <main className="absolute inset-0 flex items-center justify-center">
        <h1 className="flair-title">flair2k26</h1>
      </main>
    </div>
  );
}
