'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Pill,
  AlertTriangle,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  FileSpreadsheet,
  Filter,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Award,
  ShoppingCart,
  Activity,
  Archive
} from 'lucide-react'

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('month')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reportType, setReportType] = useState('sales')

  // Sample data for reports
  const reportData = {
    dailySales: {
      today: 12450.75,
      yesterday: 10230.50,
      change: 21.7,
      transactions: 45
    },
    monthlyRevenue: {
      current: 285670.25,
      previous: 245890.00,
      change: 16.2,
      target: 300000,
      progress: 95.2
    },
    topSellingMedicines: [
      { id: 1, name: 'Paracetamol 500mg', category: 'General', units: 850, revenue: 4675.00, trend: 'up', growth: 12.5 },
      { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', units: 620, revenue: 7440.00, trend: 'up', growth: 8.3 },
      { id: 3, name: 'Cough Syrup', category: 'Syrup', units: 480, revenue: 21600.00, trend: 'down', growth: -5.2 },
      { id: 4, name: 'Vitamin D3', category: 'Supplement', units: 425, revenue: 10625.00, trend: 'up', growth: 15.8 },
      { id: 5, name: 'Ibuprofen 400mg', category: 'Pain Relief', units: 380, revenue: 3325.00, trend: 'up', growth: 3.4 }
    ],
    expiredStockLoss: {
      value: 8450.00,
      items: 12,
      lastMonth: 5230.00,
      change: 61.5,
      preventable: 6780.00
    },
    salesTrend: [
      { date: 'Dec 13', sales: 8450, orders: 32 },
      { date: 'Dec 14', sales: 9230, orders: 38 },
      { date: 'Dec 15', sales: 7890, orders: 29 },
      { date: 'Dec 16', sales: 10450, orders: 42 },
      { date: 'Dec 17', sales: 11230, orders: 45 },
      { date: 'Dec 18', sales: 10230, orders: 40 },
      { date: 'Dec 19', sales: 12450, orders: 48 }
    ],
    stockUsage: [
      { category: 'General', percentage: 35, value: 52340 },
      { category: 'Antibiotic', percentage: 25, value: 37420 },
      { category: 'Syrup', percentage: 15, value: 22450 },
      { category: 'Supplement', percentage: 12, value: 17940 },
      { category: 'Pain Relief', percentage: 8, value: 11960 },
      { category: 'Others', percentage: 5, value: 7480 }
    ],
    categoryRevenue: [
      { category: 'General', revenue: 85670, percentage: 30, color: 'bg-blue-500' },
      { category: 'Antibiotic', revenue: 71420, percentage: 25, color: 'bg-purple-500' },
      { category: 'Syrup', revenue: 57134, percentage: 20, color: 'bg-green-500' },
      { category: 'Supplement', revenue: 42850, percentage: 15, color: 'bg-orange-500' },
      { category: 'Pain Relief', revenue: 28567, percentage: 10, color: 'bg-red-500' }
    ]
  }

  // Export functions
  const exportToCSV = () => {
    alert('CSV export functionality would be implemented here\n\nWould include:\n- Selected report data\n- Date range applied\n- All relevant metrics')
  }

  const exportToPDF = () => {
    alert('PDF export functionality would be implemented here\n\nWould include:\n- Formatted report with charts\n- Company branding\n- Summary and insights')
  }

  // Get max value for chart scaling
  const maxSales = Math.max(...reportData.salesTrend.map(d => d.sales))

  return (
    <div className='p-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3'>
          <BarChart3 className='h-10 w-10 text-purple-600' />
          Reports & Analytics
        </h1>
        <p className='text-gray-600'>Sales & inventory analytics dashboard</p>
      </div>

      {/* Date Range Filter */}
      <div className='bg-white border-2 border-gray-200 rounded-xl p-6 mb-8 shadow-md'>
        <div className='flex flex-col md:flex-row gap-4 items-end'>
          <div className='flex-1'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Quick Select</label>
            <div className='flex gap-2'>
              <button
                onClick={() => setDateRange('today')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  dateRange === 'today'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setDateRange('week')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  dateRange === 'week'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setDateRange('month')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  dateRange === 'month'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setDateRange('custom')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  dateRange === 'custom'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Custom Range
              </button>
            </div>
          </div>

          {dateRange === 'custom' && (
            <>
              <div className='w-full md:w-48'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Start Date</label>
                <Input
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className='h-11'
                />
              </div>
              <div className='w-full md:w-48'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>End Date</label>
                <Input
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className='h-11'
                />
              </div>
            </>
          )}

          <Button className='h-11 bg-purple-600 hover:bg-purple-700 text-white px-6'>
            <Filter className='h-4 w-4 mr-2' />
            Apply Filter
          </Button>
        </div>
      </div>

      {/* Report Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        {/* Daily Sales */}
        <div className='bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <DollarSign className='h-10 w-10 text-blue-600' />
            <div className={`flex items-center gap-1 text-sm font-bold ${
              reportData.dailySales.change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {reportData.dailySales.change > 0 ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
              {Math.abs(reportData.dailySales.change)}%
            </div>
          </div>
          <p className='text-blue-700 font-semibold mb-1'>Daily Sales</p>
          <p className='text-4xl font-bold text-blue-900 mb-2'>₹{reportData.dailySales.today.toFixed(2)}</p>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-blue-600'>vs yesterday</span>
            <span className='text-blue-700 font-semibold'>{reportData.dailySales.transactions} transactions</span>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className='bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <TrendingUp className='h-10 w-10 text-green-600' />
            <div className='flex items-center gap-1 text-sm font-bold text-green-600'>
              <ChevronUp className='h-4 w-4' />
              {reportData.monthlyRevenue.change}%
            </div>
          </div>
          <p className='text-green-700 font-semibold mb-1'>Monthly Revenue</p>
          <p className='text-4xl font-bold text-green-900 mb-2'>₹{(reportData.monthlyRevenue.current / 1000).toFixed(1)}K</p>
          <div className='w-full bg-green-200 rounded-full h-2 mb-1'>
            <div 
              className='bg-green-600 h-2 rounded-full transition-all duration-500'
              style={{ width: `${reportData.monthlyRevenue.progress}%` }}
            ></div>
          </div>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-green-600'>{reportData.monthlyRevenue.progress}% of target</span>
            <span className='text-green-700 font-semibold'>₹{(reportData.monthlyRevenue.target / 1000)}K goal</span>
          </div>
        </div>

        {/* Top Selling Medicines */}
        <div className='bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <Award className='h-10 w-10 text-purple-600' />
            <Pill className='h-6 w-6 text-purple-400' />
          </div>
          <p className='text-purple-700 font-semibold mb-1'>Top Seller</p>
          <p className='text-2xl font-bold text-purple-900 mb-1'>{reportData.topSellingMedicines[0].name}</p>
          <p className='text-lg font-bold text-purple-800 mb-2'>₹{reportData.topSellingMedicines[0].revenue.toFixed(2)}</p>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-purple-600'>{reportData.topSellingMedicines[0].units} units sold</span>
            <span className='text-green-700 font-semibold flex items-center gap-1'>
              <TrendingUp className='h-3 w-3' />
              +{reportData.topSellingMedicines[0].growth}%
            </span>
          </div>
        </div>

        {/* Expired Stock Loss */}
        <div className='bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <AlertTriangle className='h-10 w-10 text-red-600' />
            <div className='flex items-center gap-1 text-sm font-bold text-red-600'>
              <ChevronUp className='h-4 w-4' />
              {reportData.expiredStockLoss.change}%
            </div>
          </div>
          <p className='text-red-700 font-semibold mb-1'>Expired Stock Loss</p>
          <p className='text-4xl font-bold text-red-900 mb-2'>₹{reportData.expiredStockLoss.value.toFixed(2)}</p>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-red-600'>{reportData.expiredStockLoss.items} items expired</span>
            <span className='text-red-700 font-semibold'>vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Sales Trend Chart */}
        <div className='bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <LineChart className='h-6 w-6 text-blue-600' />
              <h3 className='text-xl font-bold text-gray-900'>Sales Trend</h3>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <Activity className='h-4 w-4 text-blue-600' />
              <span className='font-semibold text-gray-700'>Last 7 Days</span>
            </div>
          </div>

          {/* Chart */}
          <div className='space-y-4'>
            {reportData.salesTrend.map((day, index) => {
              const percentage = (day.sales / maxSales) * 100
              return (
                <div key={index}>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm font-semibold text-gray-700 w-20'>{day.date}</span>
                    <div className='flex-1 mx-4'>
                      <div className='w-full bg-gray-200 rounded-full h-8 relative overflow-hidden'>
                        <div 
                          className='bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-3'
                          style={{ width: `${percentage}%` }}
                        >
                          <span className='text-white text-xs font-bold'>₹{day.sales.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className='text-xs text-gray-500 w-16 text-right'>{day.orders} orders</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='mt-6 pt-4 border-t-2 border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Sales (7 days)</p>
                <p className='text-2xl font-bold text-blue-600'>
                  ₹{reportData.salesTrend.reduce((sum, day) => sum + day.sales, 0).toLocaleString()}
                </p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-gray-600'>Avg per Day</p>
                <p className='text-2xl font-bold text-green-600'>
                  ₹{(reportData.salesTrend.reduce((sum, day) => sum + day.sales, 0) / 7).toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Usage Chart */}
        <div className='bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <PieChart className='h-6 w-6 text-purple-600' />
              <h3 className='text-xl font-bold text-gray-900'>Stock Usage</h3>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <Package className='h-4 w-4 text-purple-600' />
              <span className='font-semibold text-gray-700'>By Category</span>
            </div>
          </div>

          <div className='space-y-4'>
            {reportData.stockUsage.map((item, index) => (
              <div key={index}>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-semibold text-gray-700'>{item.category}</span>
                  <span className='text-sm font-bold text-purple-600'>{item.percentage}%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-6 relative overflow-hidden'>
                  <div 
                    className='bg-gradient-to-r from-purple-500 to-purple-600 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3'
                    style={{ width: `${item.percentage}%` }}
                  >
                    {item.percentage > 15 && (
                      <span className='text-white text-xs font-bold'>₹{item.value.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                {item.percentage <= 15 && (
                  <p className='text-xs text-gray-600 mt-1'>₹{item.value.toLocaleString()}</p>
                )}
              </div>
            ))}
          </div>

          <div className='mt-6 pt-4 border-t-2 border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Stock Value</p>
                <p className='text-2xl font-bold text-purple-600'>
                  ₹{reportData.stockUsage.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-gray-600'>Categories</p>
                <p className='text-2xl font-bold text-gray-900'>{reportData.stockUsage.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Revenue & Top Medicines */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Category-wise Revenue */}
        <div className='bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <BarChart3 className='h-6 w-6 text-green-600' />
              <h3 className='text-xl font-bold text-gray-900'>Category-wise Revenue</h3>
            </div>
          </div>

          <div className='space-y-4'>
            {reportData.categoryRevenue.map((item, index) => (
              <div key={index} className='p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow'>
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center gap-3'>
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className='font-bold text-gray-900'>{item.category}</span>
                  </div>
                  <span className='text-xl font-bold text-green-600'>₹{item.revenue.toLocaleString()}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex-1 bg-gray-200 rounded-full h-3'>
                    <div 
                      className={`${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className='text-sm font-bold text-gray-700 w-12 text-right'>{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 pt-4 border-t-2 border-gray-200'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-gray-600'>Total Revenue</p>
              <p className='text-3xl font-bold text-green-600'>
                ₹{reportData.categoryRevenue.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Top Selling Medicines Table */}
        <div className='bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <Award className='h-6 w-6 text-orange-600' />
              <h3 className='text-xl font-bold text-gray-900'>Top Selling Medicines</h3>
            </div>
          </div>

          <div className='space-y-3'>
            {reportData.topSellingMedicines.map((medicine, index) => (
              <div key={medicine.id} className='p-4 bg-gradient-to-r from-orange-50 to-white border-2 border-orange-200 rounded-lg hover:shadow-md transition-all'>
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex items-start gap-3'>
                    <div className='flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-full font-bold text-sm'>
                      #{index + 1}
                    </div>
                    <div>
                      <p className='font-bold text-gray-900'>{medicine.name}</p>
                      <p className='text-xs text-gray-600 flex items-center gap-1 mt-1'>
                        <Package className='h-3 w-3' />
                        {medicine.category}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-bold ${
                    medicine.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {medicine.trend === 'up' ? <TrendingUp className='h-4 w-4' /> : <TrendingDown className='h-4 w-4' />}
                    {Math.abs(medicine.growth)}%
                  </div>
                </div>
                <div className='flex items-center justify-between mt-3'>
                  <span className='text-sm text-gray-600'>{medicine.units} units sold</span>
                  <span className='text-lg font-bold text-orange-600'>₹{medicine.revenue.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className='bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-8 shadow-lg'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='flex items-center gap-4'>
            <div className='p-4 bg-purple-600 rounded-xl'>
              <Download className='h-8 w-8 text-white' />
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-900 mb-1'>Export Reports</h3>
              <p className='text-gray-600'>Download reports in your preferred format</p>
            </div>
          </div>
          
          <div className='flex gap-4'>
            <Button
              onClick={exportToCSV}
              className='h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 text-lg shadow-lg'
            >
              <FileSpreadsheet className='h-6 w-6 mr-2' />
              Export CSV
            </Button>
            <Button
              onClick={exportToPDF}
              className='h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 text-lg shadow-lg'
            >
              <FileText className='h-6 w-6 mr-2' />
              Export PDF
            </Button>
          </div>
        </div>

        <div className='mt-6 pt-6 border-t-2 border-purple-200'>
          <div className='grid grid-cols-3 gap-4 text-center'>
            <div className='p-4 bg-white rounded-lg border border-purple-200'>
              <Calendar className='h-6 w-6 text-purple-600 mx-auto mb-2' />
              <p className='text-sm text-gray-600'>Date Range</p>
              <p className='font-bold text-gray-900 capitalize'>{dateRange}</p>
            </div>
            <div className='p-4 bg-white rounded-lg border border-purple-200'>
              <FileText className='h-6 w-6 text-purple-600 mx-auto mb-2' />
              <p className='text-sm text-gray-600'>Report Type</p>
              <p className='font-bold text-gray-900'>Complete Analytics</p>
            </div>
            <div className='p-4 bg-white rounded-lg border border-purple-200'>
              <Archive className='h-6 w-6 text-purple-600 mx-auto mb-2' />
              <p className='text-sm text-gray-600'>Data Points</p>
              <p className='font-bold text-gray-900'>All Metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
