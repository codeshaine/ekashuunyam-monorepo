

export const RulesSection = () => {
  return (
    <>
      <div className="flex-center relative h-screen bg-c-250 p-10">
        <div className="capitalize text-black">
          <div className="lg:24 relative flex flex-col items-center justify-center gap-4 md:mx-32 xl:mx-80">
            <h1 className="py-4 text-center font-playfair text-4xl sm:text-6xl">
              General Rules
            </h1>

            <div className="relative p-6">
              <ul className="flex flex-col gap-4 font-heart text-sm">
                <li>
                  - “EKASHUNYAM” is open to BCA,BSC [Computer Science] and BVOC
                  [Software] students.
                </li>
                <li>- A maximum of 16 students are allowed per team.</li>
                <li>- Two teams can participate from each college.</li>
                <li>- The registration fees stands at 500 per team.</li>
                <li>
                  - Teams must confirm their participation through website.
                </li>
                <li>- All participants must be present at 9.00 am.</li>
                <li>
                  - Participants are advised to carry their college id card and
                  permission letter on the day of the event.
                </li>
                <li>
                  - For the overall championship a team must participate in all
                  events.
                </li>
                <li>- Breakfast and lunch will be provided.</li>
              </ul>
            </div>
          </div>
        </div>
        <img
          src="/svg/scars.svg"
          alt=""
          className="absolute left-40 top-10 h-44 w-44 text-red-700"
        />
      </div>
    </>
  );
};
