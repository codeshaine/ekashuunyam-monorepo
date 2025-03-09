export const MapSection = () => {
  return (
    <div
    id="map"
      className="relative h-screen w-full bg-red-500"
      style={{
        backgroundImage: `url('/images/map.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src="/images/top-left-split.png"
        alt=""
        className="absolute left-0 top-0 h-[35vh] w-full xl:h-[40vh] xl:w-[75vw]"
        style={
          {
            //   maskImage: 'url(/images/top-left-split.png)',
            //   WebkitMaskImage: 'url(/images/top-left-split.png)',
            //   maskSize: 'contain',
            //   WebkitMaskSize: 'contain',
            //   maskRepeat: 'no-repeat',
            //   WebkitMaskRepeat: 'no-repeat',
          }
        }
      />
      <div className="absolute left-0 top-0 h-[25vh] w-full px-16 py-8 xl:h-[40vh] xl:w-[75vw] ">
        <p className="text-4xl font-semibold lg:text-7xl font-sayyeda tracking-widest">Land Ahoy!</p>
        <p className="text-sm font-light">
          The Island of <span className="font-semibold">Ekashunyam</span>
        </p>
      </div>
      <div className="flex-center h-full w-full">
        <div className="h-[20rem] w-[35rem] px-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7775.414267571165!2d75.32318809357908!3d12.990574200000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4b62e58f1b1c9%3A0x4fb9655c47cf1289!2sSDM%20Degree%20College!5e0!3m2!1sen!2sin!4v1740942765052!5m2!1sen!2sin"
            className="h-full w-full"
            allowFullScreen
            loading="lazy"
            style={{
              borderRadius: "15px",
            }}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <img
        src="/images/bottom-right-split.png"
        alt=""
        className="absolute bottom-0 right-0 h-[25vh] w-full xl:h-[25vh] xl:w-[95vw]"
        style={
          {
            //   maskImage: 'url(/images/top-left-split.png)',
            //   WebkitMaskImage: 'url(/images/top-left-split.png)',
            //   maskSize: 'contain',
            //   WebkitMaskSize: 'contain',
            //   maskRepeat: 'no-repeat',
            //   WebkitMaskRepeat: 'no-repeat',
          }
        }
      />
    </div>
  );
};
