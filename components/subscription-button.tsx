"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={onClick}
      size="sm"
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Mange subscription" : "Upgrade"}
      {!isPro && <Sparkles className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
