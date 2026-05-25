"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import {
  checkDomain,
  deletePortfolio,
  updatePortfolio,
} from "@/app/actions/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2,
  Globe,
  Loader2,
  Save,
  Trash2,
  XCircle,
} from "lucide-react";
import { Portfolio } from "../builder/BuilderClient";

type DomainStatus = "idle" | "checking" | "available" | "taken" | "error";

export default function PortfolioSettingsPage({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const [isPending, startTransition] = useTransition();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [portfolioName, setPortfolioName] = useState("Kasim's Portfolio");
  const [domain, setDomain] = useState("kasim");
  const [domainStatus, setDomainStatus] = useState<DomainStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPortfolioName(portfolio.portfolioName);
    setDomain(portfolio.portfolioDomain);
  }, []);

  useEffect(() => {
    if (domain === portfolio.portfolioDomain) {
      setDomainStatus("idle");
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!domain || domain.length < 3) {
      setDomainStatus("idle");
      return;
    }
    setDomainStatus("checking");
    timerRef.current = setTimeout(async () => {
      const result = await checkDomain(domain);
      if ("error" in result) setDomainStatus("error");
      else setDomainStatus(result.available ? "available" : "taken");
    }, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [domain]);

  function handleSave() {
    startTransition(async () => {
      const result = await updatePortfolio({
        portfolioName,
        portfolioDomain: domain,
      });
      setSaveSuccess(result.status);
    });
  }
  function handleDelete() {
    startTransition(async () => {
      const result = await deletePortfolio();
    });
  }

  const isDisabled =
    isPending || domainStatus === "taken" || domainStatus === "checking";

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Portfolio settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your portfolio name and domain.
        </p>
      </div>

      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Settings saved successfully.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
          <CardDescription>
            Update your portfolio name and public URL.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="portfolioName">Portfolio name</Label>
            <Input
              id="portfolioName"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              placeholder="Kasim's Portfolio"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-3 h-9 rounded-l-md border border-r-0 bg-muted text-muted-foreground text-sm">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div className="relative flex-1">
                <Input
                  id="domain"
                  value={domain}
                  onChange={(e) =>
                    setDomain(
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    )
                  }
                  placeholder="kasim"
                  disabled={isPending}
                  className="rounded-none border-x-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-8"
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
                .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
              </div>
            </div>
            {domainStatus === "available" && (
              <p className="text-xs text-green-500">Domain available</p>
            )}

            {domainStatus === "taken" && (
              <p className="text-xs text-destructive">Domain already taken</p>
            )}
            {domainStatus === "error" && (
              <p className="text-xs text-muted-foreground">
                Could not verify domain
              </p>
            )}
            {domainStatus === "idle" && (
              <p className="text-xs text-muted-foreground">
                Live at{" "}
                <span className="font-medium text-foreground">
                  {domain || "yourname"}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                </span>
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isDisabled}
              className="gap-2"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-base text-destructive">
            Danger zone
          </CardTitle>
          <CardDescription>
            Permanently delete your portfolio and all its content.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Delete portfolio</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              This action cannot be undone.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="gap-2 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete portfolio?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete{" "}
                  <span className="font-medium text-foreground">
                    {domain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                  </span>{" "}
                  and all its content. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, delete portfolio
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
