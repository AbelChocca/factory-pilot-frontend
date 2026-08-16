"use client";

import { useCinematicStore } from "@/src/stores/cinematic-store";

import { CinematicStep } from "./cinematic-step";
import { CinematicTargetStep } from "./cinematic-target-step";
import { CinematicAnalysisStep } from "./cinematic-analysis-step";
import { CinematicPromptStep } from "./cinematic-prompt-step";
import { CinematicInputStep } from "./cinematic-input-step";
import { CinematicFinalStep } from "./cinematic-final-step";

export function CinematicContent() {
  const stepIndex = useCinematicStore((state) => state.stepIndex);
  const analysisStatus = useCinematicStore((state) => state.analysisStatus);

  const purchasePlanId = useCinematicStore((state) => state.purchasePlanId);

  const setCinematicInputValue = useCinematicStore(
    (state) => state.setCinematicInputValue,
  );

  const complete = useCinematicStore((state) => state.complete);

  const next = useCinematicStore((state) => state.next);

  switch (stepIndex) {
    case 0:
      return (
        <CinematicStep
          eyebrow="NorthWood Manufacturing"
          title="Your factory is growing. But operational decisions are getting harder."
          description="Inventory, suppliers, production and procurement are deeply connected — but the information needed to make decisions is fragmented."
          actionLabel="See how FactoryPilot helps"
          onAction={next}
        />
      );

    case 1:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="production-readiness"]'
          eyebrow="Production readiness"
          placement="bottom"
          title="Can NorthWood fulfill its next production run?"
          description="FactoryPilot connects inventory, material availability and production requirements to assess whether the factory is ready to execute."
          actionLabel="Explore the production risk"
          onAction={next}
        />
      );

    case 2:
      return (
        <CinematicTargetStep
          key="ask-copilot-prod-read"
          targetSelector='[data-cinematic="ask-copilot-production-readiness"]'
          eyebrow="AI Copilot"
          placement="left"
          title="Ask FactoryPilot why."
          description="FactoryPilot can analyze the production risk, identify the products at risk, explain their bottleneck materials, and recommend the most important actions."
          onTargetClick={next}
        />
      );

    case 3:
      return (
        <CinematicTargetStep
          key="copilot-input"
          targetSelector='[data-cinematic="copilot-input"]'
          placement="top"
          eyebrow="AI Copilot"
          tooltipGap={60}
          title="Turn operational data into decisions."
          description="Ask FactoryPilot about production risks, inventory, materials, or suppliers. It combines NorthWood's operational data with manufacturing knowledge to help you understand what is happening and what to do next."
          actionLabel="Continue"
          onAction={next}
        />
      );

    case 4:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="copilot-send"]'
          placement="top"
          eyebrow="Let FactoryPilot work"
          title="See FactoryPilot in action."
          description="Send the analysis request and let FactoryPilot investigate NorthWood's production readiness using operational data and manufacturing knowledge."
          onTargetClick={next}
        />
      );

    case 5:
      return <CinematicAnalysisStep status={analysisStatus} />;

    case 6:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="copilot-response"]'
          placement="left"
          eyebrow="Production insights"
          title="FactoryPilot found the key production risks."
          description="The analysis connected NorthWood's production requirements with inventory and material availability. Now let's turn these insights into concrete actions."
          actionLabel="Ask for recommended actions"
          onAction={next}
        />
      );

    case 7:
      return (
        <CinematicPromptStep
          prompt="What actions should NorthWood take to reduce these production risks?"
          eyebrow="Recommended actions"
          title="Now ask FactoryPilot what to do."
          description="FactoryPilot identified the production risks. Let's turn those findings into concrete actions for NorthWood."
        />
      );

    case 8:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="copilot-send"]'
          placement="top"
          eyebrow="Take action"
          title="Let FactoryPilot recommend the next steps."
          description="Send the request and let FactoryPilot turn its findings into concrete operational recommendations for NorthWood."
          onTargetClick={next}
        />
      );

    case 9:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="copilot-response"]'
          placement="left"
          eyebrow="Operational recommendations"
          title="FactoryPilot turned the risks into actions."
          description="The copilot translated the production risks into concrete recommendations for NorthWood. Now let's turn those recommendations into a purchase plan."
          actionLabel="Create the purchase plan"
          onAction={next}
        />
      );

    case 10:
      return (
        <CinematicPromptStep
          prompt="Create a purchase plan for all materials at risk, purchasing enough of each material to restore its inventory level to its recommended minimum stock (minimum_stock)."
          tooltipGap={90}
          eyebrow="Procurement action"
          title="Turn the recommendation into a purchase plan."
          description="FactoryPilot will use the identified material risks and supplier information to determine the quantities needed to bring each at-risk material back to its recommended minimum stock level."
        />
      );

    case 11:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="copilot-send"]'
          placement="top"
          eyebrow="Procurement"
          title="Let FactoryPilot prepare the plan."
          description="Send the request and let FactoryPilot generate the purchase plan using the materials at risk and their supplier relationships."
          onTargetClick={next}
        />
      );

    case 12:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="copilot-response"]'
          placement="left"
          eyebrow="Purchase plan"
          title="FactoryPilot prepared the purchase plan."
          description="The materials at risk have been translated into a concrete procurement plan, including the items that need to be purchased."
          actionLabel="Approve the purchase plan"
          onAction={next}
        />
      );

    case 13:
      return (
        <CinematicPromptStep
          prompt="Approve this purchase plan."
          eyebrow="Final action"
          title="Now approve the purchase plan."
          description="The plan is ready. Ask FactoryPilot to approve it so NorthWood can move from analysis to execution."
        />
      );

    case 14:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="copilot-send"]'
          placement="top"
          eyebrow="Execute"
          title="Approve the plan."
          description="Send the request to approve the purchase plan and complete the procurement workflow."
          onTargetClick={next}
        />
      );

    case 15:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="copilot-response"]'
          placement="left"
          eyebrow="Confirmation"
          title="FactoryPilot approved the purchase plan."
          description="The Copilot confirms that the purchase plan was successfully approved. Review the result before verifying it in Purchase Plans."
          onTargetClick={next}
        />
      );
    case 16:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="purchase-plans-navigation"]'
          placement="right"
          eyebrow="Purchase plan"
          title="Verify the action was completed."
          description="FactoryPilot created and approved the purchase plan. Navigate to Purchase Plans to verify that the procurement action was successfully executed."
          onTargetClick={next}
        />
      );

    case 17:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="purchase-plans-search"]'
          placement="bottom"
          eyebrow="Purchase plan"
          title="Let's verify the action."
          description="FactoryPilot created and approved a purchase plan. Search for the exact plan to confirm that the action was successfully applied."
          actionLabel="Find the purchase plan"
          onAction={next}
        />
      );

    case 18:
      if (!purchasePlanId) {
        return null;
      }

      return (
        <CinematicInputStep
          targetSelector='[data-cinematic="purchase-plan-search"]'
          targetValue={purchasePlanId}
          onValueChange={setCinematicInputValue}
          onComplete={next}
          eyebrow="VERIFY THE ACTION"
          title="Let's find the purchase plan"
          description="FactoryPilot created the plan. Let's verify it."
          placement="bottom"
        />
      );

    case 19:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="purchase-plans-search-submit"]'
          eyebrow="Verify the result"
          title="Search for the purchase plan"
          description="Click Search to find the purchase plan created by FactoryPilot."
          onTargetClick={next}
          placement="bottom"
        />
      );
    case 20:
      return (
        <CinematicTargetStep
          targetSelector='[data-cinematic="created-purchase-plan"]'
          eyebrow="Action completed"
          title="Purchase plan successfully created"
          description="The purchase plan created by FactoryPilot is now visible here. You can verify its status and details."
          actionLabel="Continue"
          onAction={next}
          placement="bottom"
        />
      );

    case 21:
      return (
        <CinematicFinalStep
          eyebrow="FactoryPilot"
          title="Now it's your turn"
          description="You’ve seen how FactoryPilot can turn operational insights into real actions. Explore the system, analyze your data, and let FactoryPilot help you make the next decision."
          actionLabel="Now it's your turn"
          onAction={complete}
        />
      );

    default:
      return null;
  }
}
