'use client'
import { useState } from 'react'
import {
  Search,
  Filter,
  Plus,
  CreditCard,
  TrendingUp,
  Clock,
  RefreshCw,
  Eye,
  X,
  Download,
  Mail,
  CheckCircle,
  DollarSign,
  FileText,
  Calendar,
  User,
  Building,
  Phone,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Printer,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Billing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showMarkPaidModal, setShowMarkPaidModal] = useState(false)
  const [showActionMenu, setShowActionMenu] = useState(null)
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false)
  
  // New Invoice Form State
  const [newInvoiceForm, setNewInvoiceForm] = useState({
    patientName: '',
    patientId: '',
    patientPhone: '',
    patientEmail: '',
    patientAddress: '',
    paymentMode: 'Cash',
    services: [{ name: '', quantity: 1, price: 0 }],
    discount: 0
  })

  // Sample billing data
  const [bills, setBills] = useState([
    {
      id: 'INV-2024-001',
      patientId: 'P-001',
      patientName: 'Rajesh Kumar',
      patientPhone: '+91 98765 43210',
      patientAddress: '123 MG Road, Bangalore, Karnataka 560001',
      services: [
        { name: 'General Consultation', quantity: 1, price: 500 },
        { name: 'Blood Test - Complete', quantity: 1, price: 800 },
        { name: 'X-Ray Chest', quantity: 1, price: 600 }
      ],
      subtotal: 1900,
      tax: 342,
      discount: 100,
      amount: 2142,
      paymentMode: 'Credit Card',
      status: 'paid',
      date: '2024-12-15',
      time: '10:30 AM'
    },
    {
      id: 'INV-2024-002',
      patientId: 'P-002',
      patientName: 'Priya Sharma',
      patientPhone: '+91 87654 32109',
      patientAddress: '456 Park Street, Mumbai, Maharashtra 400001',
      services: [
        { name: 'Dental Checkup', quantity: 1, price: 800 },
        { name: 'Teeth Cleaning', quantity: 1, price: 1200 }
      ],
      subtotal: 2000,
      tax: 360,
      discount: 0,
      amount: 2360,
      paymentMode: 'Cash',
      status: 'pending',
      date: '2024-12-18',
      time: '02:15 PM'
    },
    {
      id: 'INV-2024-003',
      patientId: 'P-003',
      patientName: 'Amit Patel',
      patientPhone: '+91 76543 21098',
      patientAddress: '789 Nehru Street, Delhi, Delhi 110001',
      services: [
        { name: 'Eye Examination', quantity: 1, price: 700 },
        { name: 'Vision Test', quantity: 1, price: 500 },
        { name: 'Prescription Glasses', quantity: 1, price: 3500 }
      ],
      subtotal: 4700,
      tax: 846,
      discount: 200,
      amount: 5346,
      paymentMode: 'UPI',
      status: 'paid',
      date: '2024-12-17',
      time: '11:00 AM'
    },
    {
      id: 'INV-2024-004',
      patientId: 'P-004',
      patientName: 'Sneha Reddy',
      patientPhone: '+91 65432 10987',
      patientAddress: '321 Beach Road, Chennai, Tamil Nadu 600001',
      services: [
        { name: 'Physiotherapy Session', quantity: 3, price: 600 },
        { name: 'Massage Therapy', quantity: 2, price: 800 }
      ],
      subtotal: 3400,
      tax: 612,
      discount: 150,
      amount: 3862,
      paymentMode: 'Debit Card',
      status: 'pending',
      date: '2024-12-18',
      time: '04:30 PM'
    },
    {
      id: 'INV-2024-005',
      patientId: 'P-005',
      patientName: 'Vikram Singh',
      patientPhone: '+91 54321 09876',
      patientAddress: '654 Lake View, Kolkata, West Bengal 700001',
      services: [
        { name: 'MRI Scan', quantity: 1, price: 6500 },
        { name: 'Consultation - Specialist', quantity: 1, price: 1000 }
      ],
      subtotal: 7500,
      tax: 1350,
      discount: 500,
      amount: 8350,
      paymentMode: 'Insurance',
      status: 'paid',
      date: '2024-12-16',
      time: '09:00 AM'
    }
  ])

  const hospitalInfo = {
    name: 'MediCore Hospital',
    address: '789 Health Plaza, Medical District',
    city: 'Bangalore, Karnataka 560078',
    phone: '+91 80 1234 5678',
    email: 'billing@medicore.com',
    gst: 'GST29ABCDE1234F1Z5'
  }

  const getStatusInfo = (status) => {
    switch(status) {
      case 'paid':
        return {
          color: 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200',
          dotColor: 'bg-emerald-500',
          label: 'Paid'
        }
      case 'pending':
        return {
          color: 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-200',
          dotColor: 'bg-orange-500',
          label: 'Pending'
        }
      case 'refunded':
        return {
          color: 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200',
          dotColor: 'bg-blue-500',
          label: 'Refunded'
        }
      default:
        return {
          color: 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200',
          dotColor: 'bg-gray-500',
          label: 'Unknown'
        }
    }
  }

  // Action handlers
  const handleViewInvoice = (bill) => {
    setSelectedBill(bill)
    setShowInvoiceModal(true)
  }

  const handleMarkAsPaid = (bill) => {
    setSelectedBill(bill)
    setShowMarkPaidModal(true)
  }

  const confirmMarkPaid = () => {
    if (selectedBill) {
      setBills(bills.map(bill => 
        bill.id === selectedBill.id ? { ...bill, status: 'paid' } : bill
      ))
      setShowMarkPaidModal(false)
    }
  }

  // Add service to new invoice
  const addService = () => {
    setNewInvoiceForm({
      ...newInvoiceForm,
      services: [...newInvoiceForm.services, { name: '', quantity: 1, price: 0 }]
    })
  }

  // Remove service from new invoice
  const removeService = (index) => {
    const updatedServices = newInvoiceForm.services.filter((_, i) => i !== index)
    setNewInvoiceForm({
      ...newInvoiceForm,
      services: updatedServices.length > 0 ? updatedServices : [{ name: '', quantity: 1, price: 0 }]
    })
  }

  // Update service field
  const updateService = (index, field, value) => {
    const updatedServices = newInvoiceForm.services.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    )
    setNewInvoiceForm({
      ...newInvoiceForm,
      services: updatedServices
    })
  }

  // Calculate totals for new invoice
  const calculateNewInvoiceTotals = () => {
    const subtotal = newInvoiceForm.services.reduce((sum, service) => 
      sum + (service.quantity * service.price), 0
    )
    const tax = Math.round(subtotal * 0.18)
    const amount = subtotal + tax - newInvoiceForm.discount
    return { subtotal, tax, amount }
  }

  // Create new invoice
  const handleCreateInvoice = () => {
    const totals = calculateNewInvoiceTotals()
    const newBill = {
      id: `INV-2024-${String(bills.length + 1).padStart(3, '0')}`,
      patientId: newInvoiceForm.patientId,
      patientName: newInvoiceForm.patientName,
      patientPhone: newInvoiceForm.patientPhone,
      patientEmail: newInvoiceForm.patientEmail,
      patientAddress: newInvoiceForm.patientAddress,
      services: newInvoiceForm.services.filter(s => s.name && s.price > 0),
      subtotal: totals.subtotal,
      tax: totals.tax,
      discount: newInvoiceForm.discount,
      amount: totals.amount,
      paymentMode: newInvoiceForm.paymentMode,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    
    setBills([newBill, ...bills])
    setShowNewInvoiceModal(false)
    // Reset form
    setNewInvoiceForm({
      patientName: '',
      patientId: '',
      patientPhone: '',
      patientEmail: '',
      patientAddress: '',
      paymentMode: 'Cash',
      services: [{ name: '', quantity: 1, price: 0 }],
      discount: 0
    })
  }

  const handleSendEmail = (bill) => {
    // Simulate sending email
    alert(`Invoice ${bill.id} sent to patient email`)
  }

  const handleDownloadReceipt = (bill) => {
    // Simulate downloading receipt
    alert(`Downloading receipt for ${bill.id}`)
  }

  // Calculate stats
  const totalRevenue = bills.reduce((sum, bill) => sum + bill.amount, 0)
  const pendingPayments = bills.filter(b => b.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0)
  const todayCollection = bills.filter(b => b.date === '2024-12-18' && b.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0)
  const refunds = bills.filter(b => b.status === 'refunded').reduce((sum, bill) => sum + bill.amount, 0)

  // Filter bills
  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      filterStatus === 'all' ||
      bill.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const clearFilters = () => {
    setSearchTerm('')
    setFilterStatus('all')
  }

  const hasActiveFilters = searchTerm || filterStatus !== 'all'

  return (
    <div className='flex-1 h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30'>
      <div className='h-full flex flex-col'>
        {/* Header */}
        <div className='bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-6 shadow-sm'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-4'>
                <CreditCard className='h-10 w-10 font-bold text-blue-600' />
                <div>
                  <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                    Billing & Payments
                  </h2>
                  <p className='text-gray-500 mt-0.5 text-sm'>
                    Manage invoices and payment transactions
                  </p>
                </div>
              </div>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-6 rounded-lg'
                onClick={() => setShowNewInvoiceModal(true)}
              >
                <Plus className='h-5 w-5 mr-2' />
                New Invoice
              </Button>
            </div>

            {/* Search and Filters */}
            <div className='flex flex-col md:flex-row gap-3'>
              <div className='flex-1'>
                <div className='relative'>
                  <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    placeholder='Search by Bill ID or Patient Name...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='pl-12 h-11 border-gray-200 focus:ring-2 focus:ring-blue-400 bg-white shadow-sm rounded-lg'
                  />
                </div>
              </div>

              <div className='flex gap-2'>
                {/* Status Filter */}
                <div className='relative'>
                  <Button
                    variant='outline'
                    className={`h-11 rounded-lg shadow-sm transition-all duration-300 ${
                      filterStatus !== 'all'
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-300 hover:border-blue-400'
                        : 'text-gray-600 bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  >
                    <Filter className='h-4 w-4 mr-2' />
                    {filterStatus === 'all' ? 'All Status' : filterStatus === 'paid' ? 'Paid' : 'Pending'}
                  </Button>
                  {showStatusDropdown && (
                    <div className='absolute top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 min-w-[180px] overflow-hidden'>
                      <button
                        className='w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors'
                        onClick={() => {
                          setFilterStatus('all')
                          setShowStatusDropdown(false)
                        }}
                      >
                        All Status
                      </button>
                      <button
                        className='w-full text-left px-4 py-3 text-sm hover:bg-emerald-50 transition-colors flex items-center gap-2'
                        onClick={() => {
                          setFilterStatus('paid')
                          setShowStatusDropdown(false)
                        }}
                      >
                        <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
                        Paid
                      </button>
                      <button
                        className='w-full text-left px-4 py-3 text-sm hover:bg-orange-50 transition-colors flex items-center gap-2'
                        onClick={() => {
                          setFilterStatus('pending')
                          setShowStatusDropdown(false)
                        }}
                      >
                        <span className='w-2 h-2 rounded-full bg-orange-500'></span>
                        Pending
                      </button>
                    </div>
                  )}
                </div>

                {hasActiveFilters && (
                  <Button
                    variant='outline'
                    className='h-11 border-gray-200 text-gray-600 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-300 shadow-sm rounded-lg transition-all duration-300'
                    onClick={clearFilters}
                  >
                    <X className='h-4 w-4 mr-2' />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className='mt-4 flex flex-wrap gap-2 items-center'>
                <span className='text-sm text-gray-500'>Active filters:</span>
                {searchTerm && (
                  <span className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm border border-blue-200'>
                    <Search className='h-3 w-3' />
                    {searchTerm}
                    <X className='h-3.5 w-3.5 cursor-pointer hover:text-blue-900' onClick={() => setSearchTerm('')} />
                  </span>
                )}
                {filterStatus !== 'all' && (
                  <span className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm border border-blue-200'>
                    <Filter className='h-3 w-3' />
                    {filterStatus === 'paid' ? 'Paid' : 'Pending'}
                    <X className='h-3.5 w-3.5 cursor-pointer hover:text-blue-900' onClick={() => setFilterStatus('all')} />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className='px-8 py-6 bg-gradient-to-r from-white to-gray-50/50'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
              <Card className='border border-gray-200 hover:border-blue-300 transition-all duration-300 bg-white'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm text-gray-500 mb-1'>Total Revenue</p>
                      <p className='text-3xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                        ₹{totalRevenue.toLocaleString()}
                      </p>
                      <p className='text-xs text-gray-400 mt-1'>All time</p>
                    </div>
                    <div className='bg-gradient-to-br from-blue-100 to-indigo-100 p-3.5 rounded-xl'>
                      <TrendingUp className='h-7 w-7 text-blue-600' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='border border-gray-200 hover:border-orange-300 transition-all duration-300 bg-white'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm text-gray-500 mb-1'>Pending Payments</p>
                      <p className='text-3xl font-semibold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent'>
                        ₹{pendingPayments.toLocaleString()}
                      </p>
                      <p className='text-xs text-orange-500 mt-1'>
                        {bills.filter(b => b.status === 'pending').length} invoices
                      </p>
                    </div>
                    <div className='bg-gradient-to-br from-orange-100 to-amber-100 p-3.5 rounded-xl'>
                      <Clock className='h-7 w-7 text-orange-600' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='border border-gray-200 hover:border-emerald-300 transition-all duration-300 bg-white'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm text-gray-500 mb-1'>Today's Collection</p>
                      <p className='text-3xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                        ₹{todayCollection.toLocaleString()}
                      </p>
                      <p className='text-xs text-emerald-600 mt-1'>Dec 18, 2024</p>
                    </div>
                    <div className='bg-gradient-to-br from-emerald-100 to-teal-100 p-3.5 rounded-xl'>
                      <DollarSign className='h-7 w-7 text-emerald-600' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='border border-gray-200 hover:border-purple-300 transition-all duration-300 bg-white'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm text-gray-500 mb-1'>Refunds</p>
                      <p className='text-3xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                        ₹{refunds.toLocaleString()}
                      </p>
                      <p className='text-xs text-purple-500 mt-1'>This month</p>
                    </div>
                    <div className='bg-gradient-to-br from-purple-100 to-pink-100 p-3.5 rounded-xl'>
                      <RefreshCw className='h-7 w-7 text-purple-600' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Billing Table */}
        <div className='flex-1 overflow-auto px-8 py-4'>
          <div className='max-w-7xl mx-auto'>
            <Card className='border-0 shadow-lg overflow-hidden bg-white'>
              <CardContent className='p-0'>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-gray-200'>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>Bill ID</th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>Patient</th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>Services</th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>Amount</th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>Payment Mode</th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>Status</th>
                        <th className='px-6 py-4 text-center text-sm text-gray-600'>Actions</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {filteredBills.map((bill, index) => {
                        const statusInfo = getStatusInfo(bill.status)
                        return (
                          <tr
                            key={bill.id}
                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/20 transition-colors duration-150`}
                          >
                            <td className='px-6 py-4'>
                              <div className='flex items-center gap-2'>
                                <FileText className='h-4 w-4 text-blue-600' />
                                <p className='text-sm font-mono font-semibold text-gray-900'>{bill.id}</p>
                              </div>
                              <p className='text-xs text-gray-500 mt-0.5'>{bill.date} • {bill.time}</p>
                            </td>
                            <td className='px-6 py-4'>
                              <div className='flex items-center gap-2'>
                                <div className='bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg'>
                                  <User className='h-4 w-4 text-blue-600' />
                                </div>
                                <div>
                                  <p className='text-sm font-medium text-gray-900'>{bill.patientName}</p>
                                  <p className='text-xs text-gray-500'>{bill.patientId}</p>
                                </div>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <p className='text-sm text-gray-900'>{bill.services.length} service(s)</p>
                              <p className='text-xs text-gray-500'>{bill.services[0].name}</p>
                            </td>
                            <td className='px-6 py-4'>
                              <p className='text-lg font-bold text-blue-600'>₹{bill.amount.toLocaleString()}</p>
                            </td>
                            <td className='px-6 py-4'>
                              <span className='inline-flex items-center gap-1.5 bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs border border-gray-200'>
                                <CreditCard className='h-3 w-3' />
                                {bill.paymentMode}
                              </span>
                            </td>
                            <td className='px-6 py-4'>
                              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border ${statusInfo.color}`}>
                                <span className={`w-2 h-2 rounded-full ${statusInfo.dotColor}`}></span>
                                {statusInfo.label}
                              </span>
                            </td>
                            <td className='px-6 py-4'>
                              <div className='flex items-center justify-center gap-1.5'>
                                <button
                                  onClick={() => handleViewInvoice(bill)}
                                  className='inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow'
                                  title='View Invoice'
                                >
                                  <Eye className='h-4 w-4' />
                                </button>
                                {bill.status === 'pending' && (
                                  <button
                                    onClick={() => handleMarkAsPaid(bill)}
                                    className='inline-flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow'
                                    title='Mark as Paid'
                                  >
                                    <CheckCircle className='h-4 w-4' />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleSendEmail(bill)}
                                  className='inline-flex items-center justify-center h-9 w-9 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow'
                                  title='Send Email'
                                >
                                  <Mail className='h-4 w-4' />
                                </button>
                                <button
                                  onClick={() => handleDownloadReceipt(bill)}
                                  className='inline-flex items-center justify-center h-9 w-9 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200 hover:border-amber-300 transition-all duration-200 shadow-sm hover:shadow'
                                  title='Download Receipt'
                                >
                                  <Download className='h-4 w-4' />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredBills.length === 0 && (
                  <div className='text-center py-16'>
                    <div className='bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl inline-block mb-4'>
                      <FileText className='h-16 w-16 text-blue-600' />
                    </div>
                    <p className='text-lg font-medium text-gray-700'>No bills found</p>
                    <p className='text-sm text-gray-500 mt-1'>Try adjusting your search or filters</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && selectedBill && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto'>
            {/* Invoice Header */}
            <div className='flex items-start justify-between mb-8'>
              <div>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>{hospitalInfo.name}</h2>
                <div className='space-y-1 text-sm text-gray-600'>
                  <p className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4' />
                    {hospitalInfo.address}
                  </p>
                  <p className='flex items-center gap-2'>
                    <Building className='h-4 w-4' />
                    {hospitalInfo.city}
                  </p>
                  <p className='flex items-center gap-2'>
                    <Phone className='h-4 w-4' />
                    {hospitalInfo.phone}
                  </p>
                  <p className='text-xs text-gray-500 mt-2'>{hospitalInfo.gst}</p>
                </div>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className='text-gray-400 hover:text-gray-600'>
                <X className='h-6 w-6' />
              </button>
            </div>

            {/* Invoice Details */}
            <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-200'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <p className='text-xs text-blue-600 font-semibold mb-2'>INVOICE TO</p>
                  <p className='text-lg font-bold text-gray-900'>{selectedBill.patientName}</p>
                  <p className='text-sm text-gray-600 mt-1'>{selectedBill.patientId}</p>
                  <p className='text-sm text-gray-600'>{selectedBill.patientPhone}</p>
                  <p className='text-sm text-gray-500 mt-2'>{selectedBill.patientAddress}</p>
                </div>
                <div className='text-right'>
                  <p className='text-xs text-blue-600 font-semibold mb-2'>INVOICE DETAILS</p>
                  <p className='text-2xl font-bold text-blue-600 mb-2'>{selectedBill.id}</p>
                  <div className='space-y-1 text-sm text-gray-600'>
                    <p className='flex items-center justify-end gap-2'>
                      <Calendar className='h-4 w-4' />
                      {selectedBill.date}
                    </p>
                    <p className='flex items-center justify-end gap-2'>
                      <Clock className='h-4 w-4' />
                      {selectedBill.time}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border mt-3 ${getStatusInfo(selectedBill.status).color}`}>
                    <span className={`w-2 h-2 rounded-full ${getStatusInfo(selectedBill.status).dotColor}`}></span>
                    {getStatusInfo(selectedBill.status).label}
                  </span>
                </div>
              </div>
            </div>

            {/* Services Table */}
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Services Provided</h3>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gray-100 border-b-2 border-gray-200'>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Service</th>
                    <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>Qty</th>
                    <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>Rate</th>
                    <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>Amount</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {selectedBill.services.map((service, index) => (
                    <tr key={index}>
                      <td className='px-4 py-3 text-sm text-gray-900'>{service.name}</td>
                      <td className='px-4 py-3 text-sm text-center text-gray-700'>{service.quantity}</td>
                      <td className='px-4 py-3 text-sm text-right text-gray-700'>₹{service.price}</td>
                      <td className='px-4 py-3 text-sm text-right font-medium text-gray-900'>
                        ₹{(service.quantity * service.price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className='border-t-2 border-gray-200 pt-4'>
              <div className='flex justify-end'>
                <div className='w-80 space-y-3'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Subtotal:</span>
                    <span className='font-medium text-gray-900'>₹{selectedBill.subtotal.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Tax (18%):</span>
                    <span className='font-medium text-gray-900'>₹{selectedBill.tax.toLocaleString()}</span>
                  </div>
                  {selectedBill.discount > 0 && (
                    <div className='flex justify-between text-sm text-emerald-600'>
                      <span>Discount:</span>
                      <span className='font-medium'>-₹{selectedBill.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className='h-px bg-gray-300'></div>
                  <div className='flex justify-between text-lg'>
                    <span className='font-bold text-gray-900'>Total Payable:</span>
                    <span className='font-bold text-blue-600'>₹{selectedBill.amount.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Payment Mode:</span>
                    <span className='font-medium text-gray-900'>{selectedBill.paymentMode}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className='mt-8 pt-6 border-t border-gray-200'>
              <p className='text-xs text-gray-500 text-center'>
                This is a computer generated invoice and does not require signature.
              </p>
              <p className='text-xs text-gray-400 text-center mt-1'>
                For queries, contact us at {hospitalInfo.email} or {hospitalInfo.phone}
              </p>
            </div>

            {/* Action Buttons */}
            <div className='mt-6 flex gap-3 justify-end'>
              <Button 
                onClick={() => handleDownloadReceipt(selectedBill)}
                variant='outline'
                className='border-gray-200 text-gray-700 hover:bg-gray-50'
              >
                <Download className='h-4 w-4 mr-2' />
                Download PDF
              </Button>
              <Button 
                onClick={() => handleSendEmail(selectedBill)}
                className='bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
              >
                <Mail className='h-4 w-4 mr-2' />
                Send via Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {showNewInvoiceModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3'>
                <div className='bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg'>
                  <FileText className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900'>Create New Invoice</h3>
              </div>
              <button onClick={() => setShowNewInvoiceModal(false)} className='text-gray-400 hover:text-gray-600 transition-colors'>
                <X className='h-6 w-6' />
              </button>
            </div>

            <div className='space-y-6'>
              {/* Patient Information */}
              <div>
                <h4 className='text-sm font-bold text-gray-700 mb-4 flex items-center gap-2'>
                  <div className='w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full'></div>
                  Patient Information
                </h4>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Patient Name <span className='text-red-500'>*</span>
                    </label>
                    <Input
                      value={newInvoiceForm.patientName}
                      onChange={(e) => setNewInvoiceForm({...newInvoiceForm, patientName: e.target.value})}
                      placeholder='Enter patient name'
                      className='w-full'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Patient ID <span className='text-red-500'>*</span>
                    </label>
                    <Input
                      value={newInvoiceForm.patientId}
                      onChange={(e) => setNewInvoiceForm({...newInvoiceForm, patientId: e.target.value})}
                      placeholder='e.g., P-006'
                      className='w-full'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone Number <span className='text-red-500'>*</span>
                    </label>
                    <Input
                      value={newInvoiceForm.patientPhone}
                      onChange={(e) => setNewInvoiceForm({...newInvoiceForm, patientPhone: e.target.value})}
                      placeholder='+91 98765 43210'
                      className='w-full'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email Address
                    </label>
                    <Input
                      type='email'
                      value={newInvoiceForm.patientEmail}
                      onChange={(e) => setNewInvoiceForm({...newInvoiceForm, patientEmail: e.target.value})}
                      placeholder='patient@email.com'
                      className='w-full'
                    />
                  </div>
                  <div className='col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Address
                    </label>
                    <Input
                      value={newInvoiceForm.patientAddress}
                      onChange={(e) => setNewInvoiceForm({...newInvoiceForm, patientAddress: e.target.value})}
                      placeholder='Enter complete address'
                      className='w-full'
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <div className='flex items-center justify-between mb-4'>
                  <h4 className='text-sm font-bold text-gray-700 flex items-center gap-2'>
                    <div className='w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full'></div>
                    Services
                  </h4>
                  <Button
                    size='sm'
                    onClick={addService}
                    className='bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm'
                  >
                    <Plus className='h-4 w-4 mr-1' />
                    Add Service
                  </Button>
                </div>
                <div className='space-y-3'>
                  {newInvoiceForm.services.map((service, index) => (
                    <div key={index} className='grid grid-cols-12 gap-3 items-end'>
                      <div className='col-span-5'>
                        <label className='block text-xs font-medium text-gray-600 mb-1'>
                          Service Name
                        </label>
                        <Input
                          value={service.name}
                          onChange={(e) => updateService(index, 'name', e.target.value)}
                          placeholder='Service name'
                          className='w-full'
                        />
                      </div>
                      <div className='col-span-2'>
                        <label className='block text-xs font-medium text-gray-600 mb-1'>
                          Quantity
                        </label>
                        <Input
                          type='number'
                          min='1'
                          value={service.quantity}
                          onChange={(e) => updateService(index, 'quantity', parseInt(e.target.value) || 1)}
                          className='w-full'
                        />
                      </div>
                      <div className='col-span-3'>
                        <label className='block text-xs font-medium text-gray-600 mb-1'>
                          Price (₹)
                        </label>
                        <Input
                          type='number'
                          min='0'
                          value={service.price}
                          onChange={(e) => updateService(index, 'price', parseFloat(e.target.value) || 0)}
                          placeholder='0'
                          className='w-full'
                        />
                      </div>
                      <div className='col-span-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => removeService(index)}
                          disabled={newInvoiceForm.services.length === 1}
                          className='w-full border-red-200 text-red-600 hover:bg-red-50'
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h4 className='text-sm font-bold text-gray-700 mb-4 flex items-center gap-2'>
                  <div className='w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full'></div>
                  Payment Details
                </h4>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Payment Mode
                    </label>
                    <select
                      value={newInvoiceForm.paymentMode}
                      onChange={(e) => setNewInvoiceForm({...newInvoiceForm, paymentMode: e.target.value})}
                      className='w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent'
                    >
                      <option value='Cash'>Cash</option>
                      <option value='Credit Card'>Credit Card</option>
                      <option value='Debit Card'>Debit Card</option>
                      <option value='UPI'>UPI</option>
                      <option value='Insurance'>Insurance</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Discount (₹)
                    </label>
                    <Input
                      type='number'
                      min='0'
                      value={newInvoiceForm.discount}
                      onChange={(e) => setNewInvoiceForm({...newInvoiceForm, discount: parseFloat(e.target.value) || 0})}
                      placeholder='0'
                      className='w-full'
                    />
                  </div>
                </div>
              </div>

              {/* Invoice Summary */}
              <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
                <h4 className='text-sm font-bold text-blue-900 mb-4'>Invoice Summary</h4>
                <div className='space-y-3'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Subtotal:</span>
                    <span className='font-semibold text-gray-900'>₹{calculateNewInvoiceTotals().subtotal.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Tax (18%):</span>
                    <span className='font-semibold text-gray-900'>₹{calculateNewInvoiceTotals().tax.toLocaleString()}</span>
                  </div>
                  {newInvoiceForm.discount > 0 && (
                    <div className='flex justify-between text-sm text-emerald-600'>
                      <span>Discount:</span>
                      <span className='font-semibold'>-₹{newInvoiceForm.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className='h-px bg-blue-200'></div>
                  <div className='flex justify-between items-center'>
                    <span className='font-bold text-gray-900'>Total Amount:</span>
                    <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                      ₹{calculateNewInvoiceTotals().amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='mt-6 flex gap-3 justify-end'>
              <Button 
                onClick={() => setShowNewInvoiceModal(false)} 
                variant='outline'
                className='border-gray-300 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateInvoice}
                disabled={!newInvoiceForm.patientName || !newInvoiceForm.patientId || !newInvoiceForm.patientPhone || newInvoiceForm.services.every(s => !s.name || s.price === 0)}
                className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white disabled:opacity-50'
              >
                <CheckCircle className='h-4 w-4 mr-2' />
                Create Invoice
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mark as Paid Modal */}
      {showMarkPaidModal && selectedBill && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-2xl font-semibold text-emerald-600'>Mark as Paid</h3>
              <button onClick={() => setShowMarkPaidModal(false)} className='text-gray-400 hover:text-gray-600'>
                <X className='h-6 w-6' />
              </button>
            </div>
            <div className='mb-6'>
              <p className='text-gray-700'>Are you sure you want to mark this invoice as paid?</p>
              <div className='bg-gray-50 rounded-lg p-4 mt-4 border border-gray-200'>
                <p className='text-sm text-gray-600'>Invoice ID</p>
                <p className='text-base font-bold text-gray-900'>{selectedBill.id}</p>
                <p className='text-sm text-gray-600 mt-2'>Patient</p>
                <p className='text-base font-medium text-gray-900'>{selectedBill.patientName}</p>
                <p className='text-sm text-gray-600 mt-2'>Amount</p>
                <p className='text-xl font-bold text-blue-600'>₹{selectedBill.amount.toLocaleString()}</p>
              </div>
            </div>
            <div className='flex gap-3 justify-end'>
              <Button 
                onClick={() => setShowMarkPaidModal(false)} 
                variant='outline'
                className='border-gray-200 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmMarkPaid}
                className='bg-emerald-600 hover:bg-emerald-700 text-white'
              >
                <CheckCircle className='h-4 w-4 mr-2' />
                Confirm Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}