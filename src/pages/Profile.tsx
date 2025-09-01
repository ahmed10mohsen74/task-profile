import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  User,
  Package,
  Settings,
  Eye,
  AlertCircle,
} from "lucide-react";
import { ChatBot } from "@/components/ChatBot";
import { useToast } from "@/hooks/use-toast";
import proImage from "../assets/1748257140914.jpg";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [profile, setProfile] = useState({
    name: "Ahmed Ahmed",
    email: "ahmed.mohsen@example.com",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const { toast } = useToast();

  const purchasedProducts = [
    {
      id: 1,
      name: "Premium Analytics Suite",
      purchaseDate: "2024-01-15",
      status: "Active",
      description: "Advanced analytics and reporting tools",
    },
    {
      id: 2,
      name: "Cloud Storage Pro",
      purchaseDate: "2024-02-10",
      status: "Active",
      description: "100GB secure cloud storage solution",
    },
    {
      id: 3,
      name: "AI Assistant License",
      purchaseDate: "2024-01-30",
      status: "Pending",
      description: "AI-powered productivity assistant",
    },
    {
      id: 4,
      name: "Security Shield",
      purchaseDate: "2023-12-05",
      status: "Expired",
      description: "Enhanced security and protection tools",
    },
  ];

  const handleProfileUpdate = () => {
    // Validation
    if (profile.name.length < 3 || profile.name.length > 50) {
      toast({
        title: "Invalid Name",
        description: "Name must be between 3-50 characters",
        variant: "destructive",
      });
      return;
    }

    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handlePasswordChange = () => {
    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(passwords.new)) {
      toast({
        title: "Invalid Password",
        description:
          "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
        variant: "destructive",
      });
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setPasswords({ current: "", new: "", confirm: "" });
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Expired: "bg-red-100 text-red-800 border-red-200",
    };
    return variants[status as keyof typeof variants] || "";
  };

  const getActionButton = (status: string, productId: number) => {
    if (status === "Active") {
      return (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => (window.location.href = `/product/${productId}`)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      );
    } else if (status === "Pending") {
      return (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => (window.location.href = `/product/${productId}`)}
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Check Status
        </Button>
      );
    } else {
      return (
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => (window.location.href = `/product/${productId}`)}
        >
          Request Support
        </Button>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <img src={proImage} alt="" className="w-12 h-12 rounded-full" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Profile Dashboard
              </h1>
              <p className="text-blue-100">
                Manage your account and view your products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Management */}
          <div className="lg:col-span-1">
            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-primary" />
                  Profile Management
                </CardTitle>
                <CardDescription>
                  Update your personal information and password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm bg-muted px-3 py-2 rounded-md">
                        {profile.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <p className="mt-1 text-sm bg-muted px-3 py-2 rounded-md">
                      {profile.email}
                    </p>
                  </div>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="w-full"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button onClick={handleProfileUpdate} className="flex-1">
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                {/* Password Change */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={passwords.current}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            current: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwords.new}
                        onChange={(e) =>
                          setPasswords({ ...passwords, new: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            confirm: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handlePasswordChange} className="w-full">
                      Update Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchased Products */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-primary" />
                  Purchased Products
                </CardTitle>
                <CardDescription>
                  View and manage your purchased products and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {purchasedProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="border shadow-sm hover:shadow-card transition-smooth"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">
                            {product.name}
                          </CardTitle>
                          <Badge className={getStatusBadge(product.status)}>
                            {product.status}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Purchased:{" "}
                            {new Date(
                              product.purchaseDate
                            ).toLocaleDateString()}
                          </p>
                          {getActionButton(product.status, product.id)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <Button
        onClick={() => setShowChatBot(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-hover bg-gradient-primary hover:scale-105 transition-smooth z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* ChatBot Component */}
      {showChatBot && (
        <ChatBot isOpen={showChatBot} onClose={() => setShowChatBot(false)} />
      )}
    </div>
  );
};

export default Profile;
