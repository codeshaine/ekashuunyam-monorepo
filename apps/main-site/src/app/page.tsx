import { RulesSection } from "./_components/rules/rules-section";
import { FirstSection } from "./_components/section-split/first-section";
import { SecondSection } from "./_components/section-split/second-section";
import { ThirdSection } from "./_components/section-split/third-section";
import { FourthSection } from "./_components/section-split/fourth-section";
import { SixthSection } from "./_components/section-split/sixth-section";
import { EightSection } from "./_components/section-split/eight-section";
import { NinthSection } from "./_components/section-split/ninth-section";

export default async function Home() {
  return (
    <main className="">
      <FirstSection />
      <NinthSection/>
      <EightSection />
      <SixthSection />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <RulesSection />
    </main>
  );
}
