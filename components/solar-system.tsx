import Image from "next/image";

export default function SolarSystem() {
  return (
    <div className="absolute -z-50">
      <div className="container">
        <div className="sun">
          <Image
            src="/planets/sun.png"
            alt="Sun"
            width={160}
            height={160}
            priority
          />
        </div>
        <div className="mercury" />
        <div className="venus" />
        <div className="earth">
          <div className="moon" />
        </div>
        <div className="mars" />
        <div className="jupiter" />
        <div className="saturn" />
        <div className="uranus" />
        <div className="neptune" />
        <div className="pluto" />
      </div>
    </div>
  );
}
