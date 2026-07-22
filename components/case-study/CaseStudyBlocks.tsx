import type { CaseStudyBlock } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { ProblemSection } from "@/components/case-study/ProblemSection";
import { BenchmarkingSection } from "@/components/case-study/BenchmarkingSection";
import { SolutionSection } from "@/components/case-study/SolutionSection";
import { FlowComparisonSection } from "@/components/case-study/FlowComparisonSection";
import { StepGuideSection } from "@/components/case-study/StepGuideSection";
import { ImpactSection } from "@/components/case-study/ImpactSection";
import { NextStepsSection } from "@/components/case-study/NextStepsSection";

export function CaseStudyBlocks({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <div className="flex flex-col divide-y divide-white/10">
      {blocks.map((block, i) => {
        if (block.type === "hero") {
          return (
            <div key={i} className="pb-10">
              <CaseStudyHero
                title={block.title}
                subtitle={block.subtitle}
                meta={block.meta}
                tags={block.tags}
              />
            </div>
          );
        }

        if (block.type === "disclaimer") {
          return (
            <p key={i} className="py-8 text-xs leading-relaxed text-fg-secondary/70">
              {block.text}
            </p>
          );
        }

        return (
          <Reveal key={i} className="py-12">
            {block.type === "problem" && (
              <ProblemSection
                heading={block.heading}
                subheading={block.subheading}
                quotes={block.quotes}
                stats={block.stats}
                note={block.note}
              />
            )}
            {block.type === "benchmarking" && (
              <BenchmarkingSection
                heading={block.heading}
                subheading={block.subheading}
                note={block.note}
                rows={block.rows}
              />
            )}
            {block.type === "solution" && (
              <SolutionSection
                heading={block.heading}
                subheading={block.subheading}
                points={block.points}
                annotations={block.annotations}
                image={block.image}
                phoneDemo={block.phoneDemo}
              />
            )}
            {block.type === "flow-comparison" && (
              <FlowComparisonSection
                heading={block.heading}
                subheading={block.subheading}
                before={block.before}
                after={block.after}
                afterLabel={block.afterLabel}
                reductionLabel={block.reductionLabel}
                highlights={block.highlights}
              />
            )}
            {block.type === "step-guide" && (
              <StepGuideSection
                heading={block.heading}
                subheading={block.subheading}
                steps={block.steps}
              />
            )}
            {block.type === "impact" && (
              <ImpactSection heading={block.heading} cards={block.cards} />
            )}
            {block.type === "next-steps" && (
              <NextStepsSection
                heading={block.heading}
                subheading={block.subheading}
                phases={block.phases}
              />
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
