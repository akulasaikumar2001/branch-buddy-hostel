import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  const [emailReports, setEmailReports] = useState(true);
  const [notifyPayments, setNotifyPayments] = useState(true);
  const [currency, setCurrency] = useState("INR");

  useEffect(() => {
    const title = "Settings | HostelPro";
    const description = "Application settings for HostelPro: preferences and notifications.";
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/settings");
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Email weekly reports</Label>
                <p className="text-sm text-muted-foreground">Receive occupancy and revenue summary</p>
              </div>
              <Switch checked={emailReports} onCheckedChange={setEmailReports} aria-label="Toggle email reports" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Payment reminders</Label>
                <p className="text-sm text-muted-foreground">Notify when rent is due or pending</p>
              </div>
              <Switch checked={notifyPayments} onCheckedChange={setNotifyPayments} aria-label="Toggle payment reminders" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-foreground">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" className="w-[200px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Used across revenue and rent displays</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
