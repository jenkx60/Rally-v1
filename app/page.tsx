'use client'

import { useAuthStore } from '../lib/auth-store'
import Link from 'next/link'

export default function Home() {
  const { user, logout } = useAuthStore()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center">
              <span className="text-4xl font-bold text-white">R</span>
            </div>
          </div>

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">Welcome to Rally</h1>
            <p className="text-xl text-muted-foreground">
              Turn group chats into real plans
            </p>
          </div>

          {/* Status */}
          {user ? (
            <div className="space-y-6 bg-card p-8 rounded-2xl border border-border">
              <div>
                <p className="text-muted-foreground mb-2">Logged in as</p>
                <p className="text-2xl font-semibold text-foreground">{user.email}</p>
                {user.name && <p className="text-muted-foreground">{user.name}</p>}
              </div>
              <button
                onClick={logout}
                className="w-full py-3 px-4 rounded-lg bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="space-y-4 bg-card p-8 rounded-2xl border border-border">
              <p className="text-muted-foreground">Get started with your account</p>
              <div className="flex gap-4 flex-col sm:flex-row">
                <Link
                  href="/signup"
                  className="flex-1 py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-center"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="flex-1 py-3 px-4 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/5 transition-colors text-center"
                >
                  Log in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
