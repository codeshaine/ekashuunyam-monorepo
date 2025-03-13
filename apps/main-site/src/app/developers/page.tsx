import { Github, Globe, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Developers() {
  const developers = [
    {
      name: "Shainil P S",
      image: "/pfp/luffy.jpeg",
      github: "https://github.com/codeshaine",
      twitter: "https://x.com/code_shaine",
      portfolio: "https://shainilps.netlify.app/",
      phone: "9632348984",
    },
    {
      name: "Swasthik K",
      image: "/pfp/luffy.jpeg",
      github: "https://github.com/SwasthK",
      twitter: "https://x.com/swasthik319",
      portfolio: "https://swasthk.netlify.app/",
      phone: "8123837856",
    },
  ];
  return (
    <div
      className="flex min-h-screen w-screen flex-col items-center justify-center gap-3 px-4 py-4"
      style={{
        background:
          "radial-gradient(circle at 50% 110%, #0055aa 0%, #003366 40%, #000000 80%, #000000 100%)",
        position: "relative",
      }}
    >
      <div className="flex-center w-full py-10">
        <p className="font-mono text-4xl font-bold text-white">
          Developers {"{}"}
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        {[...developers]
          .sort(() => Math.random() - 0.5)
          .map((dev, index) => (
            <div
              key={index}
              className="w-full max-w-sm overflow-hidden rounded-xl border border-[#fffdfd4f]"
            >
              <div className="flex items-center justify-center py-4">
                <Image
                  src={"/pfp/luffy.jpeg"}
                  alt={`${dev.name}`}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="px-4 py-2 text-white">
                <h2 className="font-mono text-xl font-bold">{dev.name}</h2>

                <div className="flex items-center justify-between gap-3 p-4">
                  <Link
                    target="_blank"
                    href={`https://${dev.github}`}
                    className="rounded-full border border-white p-1.5"
                  >
                    <Github
                      size={20}
                      className="transition-colors duration-200 hover:text-indigo-200"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href={`https://${dev.twitter}`}
                    className="rounded-full border border-white p-1.5"
                  >
                    <Twitter
                      size={20}
                      className="transition-colors duration-200 hover:text-indigo-200"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href={`https://${dev.portfolio}`}
                    className="rounded-full border border-white p-1.5"
                  >
                    <Globe
                      size={20}
                      className="transition-colors duration-200 hover:text-indigo-200"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href={`https://wa.me/${dev.phone}`}
                    className="rounded-full border border-white p-1.5"
                  >
                    <Phone
                      size={20}
                      className="transition-colors duration-200 hover:text-indigo-200"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
