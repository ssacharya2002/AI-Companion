import SubscriptionButton from "@/components/subscription-button";
import { Button } from "@/components/ui/button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="h-full p-4 space-y-2">
      <h3 className="text-lg font-medium">Settings</h3>
      <div className="text-muted-foreground text-sm">
        {isPro ? "You are currently in a Pro plan." : "Your are on a free plan"}
      </div>
    <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
