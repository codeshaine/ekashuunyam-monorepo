import { Github, Globe, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Developers() {
  const developers = [
    {
      name: "Shainil P S",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGRSXA2S3RGOg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727230853415?e=1747872000&v=beta&t=UxzfO7pG6FHg1x4sfmXVhxgv4ef6y_GR424lYfxohJE",
      github: "github.com/codeshaine",
      twitter: "x.com/code_shaine",
      portfolio: "shainilps.netlify.app/",
      phone: "9632348984",
    },
    {
      name: "Swasthik K",
      image: "https://res.cloudinary.com/dvpaztqr9/image/upload/v1742498061/20241222_145056_dwfz9a.jpg",
      github: "github.com/SwasthK",
      twitter: "x.com/swasthik319",
      portfolio: "swasthk.netlify.app/",
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
              className="w-full max-w-sm overflow-hidden rounded-xl border border-[#fffdfd4f] p-4"
            >
              <div className="flex justify-center items-center w-full">
                <div className="relative  h-52 w-full sm:h-96 sm:w-96 py-4">
                  <Image
                    src={dev.image}
                    alt={`${dev.name}`}
                    fill
                    className="rounded object-cover"
                  />
                </div>
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
