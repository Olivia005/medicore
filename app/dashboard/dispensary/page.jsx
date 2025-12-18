'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Pill, Package, ShoppingCart, AlertTriangle, CheckCircle, Clock, Search } from 'lucide-react';
import Link from 'next/link';
import DispensarySidebar from '@/components/dashboard/DispensarySidebar';
import OrdersPage from '@/components/dispensaryComponents/OrdersPage';
import BuyOrderPage from '@/components/dispensaryComponents/BuyOrderPage';
import InventoryPage from '@/components/dispensaryComponents/InventoryPage';
import BillingPage from '@/components/dispensaryComponents/BillingPage';
import ReportsPage from '@/components/dispensaryComponents/ReportsPage';
import ProfilePage from '@/components/dispensaryComponents/ProfilePage';

export default function DispensaryDashboard() {
  const [activeView, setActiveView] = useState('dashboard');

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardContent />;
      case 'orders':
        return <OrdersPage />;
      case 'buy-order':
        return <BuyOrderPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'billing':
        return <BillingPage />;
      case 'reports':
        return <ReportsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      {/* Fixed Sidebar */}
      <DispensarySidebar activeView={activeView} setActiveView={setActiveView} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">{renderContent()}</main>
    </div>
  );
}

// Dashboard Content Component
function DashboardContent() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-blue-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">MediLab & Drug Store</h1>
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium ml-4">
            Dispensary Worker
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
            <Package className="w-4 h-4 mr-2" />
            Inventory
          </Button>
          <Link href="/login">
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              Logout
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Pill className="h-10 w-10 text-orange-500" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome to the Dispensary Dashboard</h2>
              <p className="text-gray-600">Efficiently manage prescriptions, orders, and pharmacy inventory. Stay updated on low stock and process orders with ease!</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 via-orange-300 to-yellow-500 p-6 rounded-xl text-white shadow flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">Hello, Dispensary Team!</h3>
              <p className="text-sm text-orange-100">You have <span className='font-bold'>18</span> pending orders and <span className='font-bold'>7</span> low stock items today. Let's keep the pharmacy running smoothly.</p>
            </div>
            <div className="hidden md:block">
              <ShoppingCart className="h-16 w-16 text-white opacity-30" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mx-auto">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-orange-600">18</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Filled Today</p>
                  <p className="text-2xl font-bold text-green-600">45</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-red-600">7</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-blue-600">1,247</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prescription Queue */}
          <div className="lg:col-span-2">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  <span>Prescription Queue</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Prescription #PRX-001</p>
                        <p className="text-sm text-red-600">URGENT - John Smith - Antibiotics</p>
                        <p className="text-xs text-gray-500">Prescribed by Dr. Johnson</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Fill Now
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">Prescription #PRX-002</p>
                        <p className="text-sm text-gray-600">Sarah Davis - Insulin</p>
                        <p className="text-xs text-gray-500">Prescribed by Dr. Wilson</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                      Process
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Pill className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Prescription #PRX-003</p>
                        <p className="text-sm text-gray-600">Mike Johnson - Blood Pressure Medication</p>
                        <p className="text-xs text-gray-500">Prescribed by Dr. Brown</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      Process
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Prescription #PRX-004</p>
                        <p className="text-sm text-gray-600">Emily Clark - Pain Relief</p>
                        <p className="text-xs text-gray-500">Ready for pickup</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                      Complete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Inventory Alerts */}
          <div className="space-y-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search Medication
                </Button>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Package className="w-4 h-4 mr-2" />
                  Inventory Check
                </Button>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  New Prescription
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span>Inventory Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="font-medium text-red-800">Amoxicillin 500mg</p>
                    <p className="text-sm text-red-600">Only 5 units left</p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="font-medium text-red-800">Insulin Pens</p>
                    <p className="text-sm text-red-600">Only 8 units left</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="font-medium text-yellow-800">Acetaminophen</p>
                    <p className="text-sm text-yellow-600">Running low - 25 units</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="font-medium text-yellow-800">Vitamin D3</p>
                    <p className="text-sm text-yellow-600">Running low - 30 units</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}