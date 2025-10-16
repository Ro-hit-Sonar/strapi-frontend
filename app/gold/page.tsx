"use client";

import { useAuth } from "@/contexts/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock, Sparkles } from "lucide-react";
import { AuthModal } from "@/components/auth/auth-modal";
import { useState } from "react";

export default function GoldPage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950 dark:via-amber-950 dark:to-orange-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950 dark:via-amber-950 dark:to-orange-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Lock className="mx-auto h-24 w-24 text-yellow-600 mb-4" />
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                Gold Access
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                This exclusive content is only available to authenticated users.
              </p>
            </div>

            <Card className="max-w-md mx-auto mb-8">
              <CardHeader className="text-center">
                <Crown className="mx-auto h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle className="text-2xl">Premium Content</CardTitle>
                <CardDescription>
                  Sign in or create an account to access exclusive gold content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✨ Access to premium articles</p>
                  <p>💎 Exclusive investment strategies</p>
                  <p>🚀 Early access to new features</p>
                  <p>📊 Advanced analytics tools</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="flex-1 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAuthModal(true)}
                    className="flex-1 border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950"
                  >
                    Sign Up
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              Please sign in or sign up to get access to gold content
            </p>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="login"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950 dark:via-amber-950 dark:to-orange-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-16 w-16 text-yellow-600 mr-4" />
            <Sparkles className="h-12 w-12 text-amber-500" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            Gold Access
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Welcome to the exclusive gold tier, {user?.username}!
          </p>
          <p className="text-lg text-muted-foreground">
            You now have access to premium content and exclusive features.
          </p>
        </div>

        {/* Premium Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-700 dark:text-yellow-400">
                <Sparkles className="h-5 w-5 mr-2" />
                Premium Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access our exclusive investment strategies that outperform the
                market by 300%.
              </p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                View Strategies
              </Button>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
                <Crown className="h-5 w-5 mr-2" />
                Advanced Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get detailed market analysis and predictive insights not
                available to regular users.
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Access Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700 dark:text-orange-400">
                <Sparkles className="h-5 w-5 mr-2" />
                Early Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Be the first to try new features and get exclusive early access
                to upcoming tools.
              </p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Join Beta
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Exclusive Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-yellow-300 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900 dark:to-amber-900">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-yellow-800 dark:text-yellow-200">
                🏆 Exclusive Gold Content
              </CardTitle>
              <CardDescription className="text-lg">
                This content is only visible to authenticated users
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="text-center space-y-6">
                <div className="p-6 bg-white/50 dark:bg-black/20 rounded-lg">
                  <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
                    Welcome to the Gold Tier!
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Congratulations on accessing our premium content. Here
                    you'll find:
                  </p>
                  <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Advanced investment algorithms</li>
                    <li>• Real-time market predictions</li>
                    <li>• Exclusive portfolio optimization tools</li>
                    <li>• Priority customer support</li>
                    <li>• Access to our private community</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-br from-yellow-200 to-amber-200 dark:from-yellow-800 dark:to-amber-800 rounded-lg">
                    <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">
                      Market Insights
                    </h4>
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                      Get exclusive market analysis and trend predictions from
                      our expert team.
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-800 dark:to-orange-800 rounded-lg">
                    <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
                      Risk Management
                    </h4>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      Advanced risk assessment tools and portfolio protection
                      strategies.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
