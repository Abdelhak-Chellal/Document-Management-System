import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { Button } from "../components/ui/button"
import { useToast } from "../components/ui/use-toast"

function SettingsPage() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email notifications when important events occur</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="document-updates">Document Updates</Label>
              <p className="text-sm text-muted-foreground">Get notified when documents are updated or modified</p>
            </div>
            <Switch id="document-updates" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="user-activity">User Activity</Label>
              <p className="text-sm text-muted-foreground">Receive notifications about user activity in the system</p>
            </div>
            <Switch id="user-activity" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Preferences</CardTitle>
          <CardDescription>Configure system-wide preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-save">Auto-save Documents</Label>
              <p className="text-sm text-muted-foreground">Automatically save document changes every 5 minutes</p>
            </div>
            <Switch id="auto-save" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics">Usage Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Allow collection of anonymous usage data to improve the system
              </p>
            </div>
            <Switch id="analytics" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  )
}

export default SettingsPage

