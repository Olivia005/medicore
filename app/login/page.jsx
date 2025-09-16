'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity, ArrowLeft, Mail, Lock, Shield, Users, Stethoscope, Pill } from 'lucide-react';

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    selectedRole: ''
  });
  const router = useRouter();

  const roles = [
    { id: 'admin', name: 'Administrator', icon: Shield, description: 'System management', route: '/dashboard/admin' },
    { id: 'patient', name: 'Patient', icon: Users, description: 'Access your records', route: '/dashboard/patient' },
    { id: 'labtech', name: 'Lab Technician', icon: Stethoscope, description: 'Manage lab tests', route: '/dashboard/labtech' },
    { id: 'dispensary', name: 'Dispensary Worker', icon: Pill, description: 'Pharmacy operations', route: '/dashboard/dispensary' }
  ];


  const handleRoleSelect = (roleId) => {
    setLoginData(prev => ({ ...prev, selectedRole: roleId }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', loginData);
    // Find the selected role and navigate to its dashboard
    const selectedRole = roles.find(role => role.id === loginData.selectedRole);
    if (selectedRole) {
      router.push(selectedRole.route);
    }
  };


  const handleInputChange = (field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MediLab & Drug Store</h1>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
            {/* Info Banner */}
            <div className="mb-8 bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-center text-sm">
              <p className="mb-1 font-semibold">Welcome to MediLab & Drug Store Portal</p>
              <p>Access is role-based. Please select your role and use your registered email and password to sign in.</p>
            </div>

            {/* Security Tip */}
            <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-center text-xs">
              <span className="font-medium">Security Tip:</span> Never share your password. For support, contact your administrator only through official channels.
            </div>
          {!loginData.selectedRole ? (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
                <p className="text-gray-600">Select how you want to access the system</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {roles.map((role) => (
                  <Card
                    key={role.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border-blue-100 hover:border-blue-300 hover:scale-105"
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <role.icon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md border-blue-100 shadow-lg">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {(() => {
                      const SelectedIcon = roles.find(r => r.id === loginData.selectedRole)?.icon || Shield;
                      return <SelectedIcon className="h-12 w-12 text-blue-600" />;
                    })()}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {roles.find(r => r.id === loginData.selectedRole)?.name} Login
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                Enter your credentials to access your dashboard. If you forgot your password, contact your system administrator.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 border-blue-200 focus:border-blue-500"
                          value={loginData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 border-blue-200 focus:border-blue-500"
                          value={loginData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
                      Sign In
                    </Button>
                  </form>

                  <div className="mt-6 space-y-4">
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => handleRoleSelect('')}
                    >
                      Choose Different Role
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline">
                          Register here
                        </Link>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}