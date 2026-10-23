import { uiCopy } from "../data/ui";
import { site } from "../data/site";
import { container, Eyebrow, heading, Reveal } from "./Shared";

export function VisionMission() {
  return (
    <section
      aria-labelledby="purpose-heading"
      className="bg-paper text-background"
    >
      <h2 id="purpose-heading" className="sr-only">
        {uiCopy.ourVisionAndMission}
      </h2>
      <div className="grid lg:grid-cols-2">
        <Reveal>
          <img
            src="/assets/pic4.png"
            alt={
              uiCopy.pmcUndergroundMinersOperatingDrillingEquipmentWithProtective
            }
            width={852}
            height={608}
            loading="lazy"
            className="h-full min-h-80 w-full object-cover lg:min-h-[620px]"
          />
        </Reveal>
        <Reveal className="flex flex-col justify-center px-6 py-24 md:px-16 lg:px-20">
          <Eyebrow light>{uiCopy.ourVision}</Eyebrow>
          <h3 className={heading}>
            {uiCopy.lookingBeyond}
            <br />
            {uiCopy.theHorizon}
          </h3>
          <p className="mt-7 max-w-lg text-lg leading-[1.8] text-background/70">
            {site.vision}
          </p>
        </Reveal>
      </div>
      <div className="grid lg:grid-cols-2">
        <Reveal className="order-2 flex flex-col justify-center px-6 py-24 md:px-16 lg:order-1 lg:px-20">
          <Eyebrow light>{uiCopy.ourMission}</Eyebrow>
          <h3 className={heading}>
            {uiCopy.purposeIn}
            <br />
            {uiCopy.everyOperation}
          </h3>
          <p className="mt-7 max-w-lg text-lg leading-[1.8] text-background/70">
            {site.mission}
          </p>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <img
            src="/assets/pic3.png"
            alt={
              uiCopy.pmcInternalAuditorsReviewingEnvironmentalManagementStandards
            }
            width={1282}
            height={904}
            loading="lazy"
            className="h-full min-h-80 w-full object-cover lg:min-h-[620px]"
          />
        </Reveal>
      </div>
      <div className={`${container} h-px`} />
    </section>
  );
}
