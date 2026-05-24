"use client";

import { createPortfolio, checkDomain } from "@/app/actions/portfolio";
import { useActionState, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  Globe,
  Loader2,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type DomainStatus = "idle" | "checking" | "available" | "taken" | "error";

const CreatePortfolioForm = () => {
  const [state, action, isPending] = useActionState(createPortfolio, null);

  const [domain, setDomain] = useState("");
  const [domainStatus, setDomainStatus] = useState<DomainStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!domain || domain.length < 3) {
      setDomainStatus("idle");
      return;
    }

    setDomainStatus("checking");

    timerRef.current = setTimeout(async () => {
      const result = await checkDomain(domain);
      if ("error" in result) {
        setDomainStatus("error");
      } else {
        setDomainStatus(result.available ? "available" : "taken");
      }
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [domain]);

  const isSubmitDisabled =
    isPending || domainStatus === "taken" || domainStatus === "checking";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mx-auto">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your portfolio
          </h1>
          <p className="text-sm text-muted-foreground">
            Set up your personal portfolio site in seconds
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Portfolio details</CardTitle>
            <CardDescription>
              Choose a name and domain for your portfolio
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <form action={action} className="space-y-5">
              {state?.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="portfolioName">Portfolio name</Label>
                <Input
                  id="portfolioName"
                  name="portfolioName"
                  type="text"
                  placeholder="Kasim's Portfolio"
                  required
                  disabled={isPending}
                />
                <p className="text-xs text-muted-foreground">
                  This will be displayed as your portfolio title
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolioDomain">Domain</Label>
                <div className="flex items-center gap-0">
                  <div className="flex items-center gap-2 px-3 h-9 rounded-l-md border border-r-0 bg-muted text-muted-foreground text-sm">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div className="relative flex-1">
                    <Input
                      id="portfolioDomain"
                      name="portfolioDomain"
                      type="text"
                      placeholder="kasim"
                      required
                      disabled={isPending}
                      value={domain}
                      onChange={(e) =>
                        setDomain(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, ""),
                        )
                      }
                      className="rounded-l-none rounded-r-none border-x-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-8"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      {domainStatus === "checking" && (
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      )}
                      {domainStatus === "available" && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                      {domainStatus === "taken" && (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center px-3 h-9 rounded-r-md border border-l-0 bg-muted text-muted-foreground text-sm whitespace-nowrap">
                    .portfolio.com
                  </div>
                </div>

                {domainStatus === "available" && (
                  <p className="text-xs text-green-500">Domain available</p>
                )}
                {domainStatus === "taken" && (
                  <p className="text-xs text-destructive">
                    Domain already taken
                  </p>
                )}
                {domainStatus === "error" && (
                  <p className="text-xs text-muted-foreground">
                    Could not verify domain
                  </p>
                )}
                {domainStatus === "idle" && (
                  <p className="text-xs text-muted-foreground">
                    Your portfolio will be live at this address
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitDisabled}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create portfolio"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          You can change these details later from your settings
        </p>
      </div>
    </div>
  );
};

export default CreatePortfolioForm;
