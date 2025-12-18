'use client'
import { useState } from 'react'
import {
  Search,
  Download,
  Eye,
  DollarSign,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Filter,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Sample billing data
  const [bills, setBills] = useState([
    {
      id: 'INV-2024-001',
      date: '2024-12-15',
      service: 'Blood Test - Complete Blood Count',
      amount: 850,
      status: 'pending',
      dueDate: '2024-12-25',
      description: 'Complete Blood Count (CBC) Test',
      items: [
        { name: 'CBC Test', quantity: 1, rate: 750, amount: 750 },
        { name: 'Collection Charges', quantity: 1, rate: 100, amount: 100 }
      ],
      tax: 0,
      discount: 0
    },
    {
      id: 'INV-2024-002',
      date: '2024-12-12',
      service: 'X-Ray - Chest',
      amount: 1200,
      status: 'paid',
      dueDate: '2024-12-22',
      paidDate: '2024-12-13',
      paymentMethod: 'Credit Card',
      description: 'Chest X-Ray (PA View)',
      items: [
        { name: 'X-Ray Chest PA View', quantity: 1, rate: 1200, amount: 1200 }
      ],
      tax: 0,
      discount: 0
    },
    {
      id: 'INV-2024-003',
      date: '2024-12-10',
      service: 'Consultation - General Physician',
      amount: 500,
      status: 'paid',
      dueDate: '2024-12-20',
      paidDate: '2024-12-11',
      paymentMethod: 'Debit Card',
      description: 'General Physician Consultation',
      items: [
        { name: 'Doctor Consultation Fee', quantity: 1, rate: 500, amount: 500 }
      ],
      tax: 0,
      discount: 0
    },
    {
      id: 'INV-2024-004',
      date: '2024-12-08',
      service: 'Urine Analysis',
      amount: 600,
      status: 'pending',
      dueDate: '2024-12-18',
      description: 'Routine Urine Analysis',
      items: [
        { name: 'Urine Analysis', quantity: 1, rate: 500, amount: 500 },
        { name: 'Collection Charges', quantity: 1, rate: 100, amount: 100 }
      ],
      tax: 0,
      discount: 0
    },
    {
      id: 'INV-2024-005',
      date: '2024-12-05',
      service: 'Prescription Medicines',
      amount: 1450,
      status: 'paid',
      dueDate: '2024-12-15',
      paidDate: '2024-12-05',
      paymentMethod: 'Cash',
      description: 'Medicine Purchase - Prescription',
      items: [
        { name: 'Amoxicillin 500mg (10 tablets)', quantity: 1, rate: 250, amount: 250 },
        { name: 'Paracetamol 650mg (15 tablets)', quantity: 1, rate: 150, amount: 150 },
        { name: 'Vitamin D3 (8 capsules)', quantity: 1, rate: 800, amount: 800 },
        { name: 'Omeprazole 20mg (10 capsules)', quantity: 1, rate: 250, amount: 250 }
      ],
      tax: 0,
      discount: 0
    },
    {
      id: 'INV-2024-006',
      date: '2024-11-28',
      service: 'Blood Sugar Test',
      amount: 400,
      status: 'overdue',
      dueDate: '2024-12-08',
      description: 'Fasting Blood Sugar Test',
      items: [
        { name: 'Blood Sugar Test', quantity: 1, rate: 300, amount: 300 },
        { name: 'Collection Charges', quantity: 1, rate: 100, amount: 100 }
      ],
      tax: 0,
      discount: 0
    }
  ])

  // Filter bills
  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.service.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesStatus = true
    if (filterStatus !== 'all') {
      matchesStatus = bill.status === filterStatus
    }
    
    return matchesSearch && matchesStatus
  })

  // Calculate stats
  const totalBills = bills.length
  const pendingPayments = bills.filter(b => b.status === 'pending' || b.status === 'overdue').length
  const paidBills = bills.filter(b => b.status === 'paid').length
  const totalPendingAmount = bills.filter(b => b.status === 'pending' || b.status === 'overdue').reduce((sum, b) => sum + b.amount, 0)

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300'>
            <CheckCircle className='h-3.5 w-3.5' />
            Paid
          </span>
        )
      case 'pending':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-300'>
            <Clock className='h-3.5 w-3.5' />
            Pending
          </span>
        )
      case 'overdue':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-300'>
            <AlertCircle className='h-3.5 w-3.5' />
            Overdue
          </span>
        )
      default:
        return null
    }
  }

  // Handle view details
  const handleViewDetails = (bill) => {
    setSelectedInvoice(bill)
    setShowDetailsModal(true)
  }

  // Handle payment
  const handlePayNow = (bill) => {
    setSelectedInvoice(bill)
    setShowPaymentModal(true)
  }

  // Handle download invoice
  const handleDownloadInvoice = (bill) => {
    alert(`Downloading invoice ${bill.id}...`)
  }

  // Process payment
  const handleProcessPayment = () => {
    alert(`Payment processed for ${selectedInvoice.id}`)
    setShowPaymentModal(false)
  }

  return (
    <div className='flex-1 h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40'>
      <div className='h-full overflow-y-auto'>
        <div className='p-8 max-w-[1600px] mx-auto space-y-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <div className='bg-gradient-to-br from-blue-100 to-violet-100 p-3 rounded-xl'>
                <CreditCard className='h-6 w-6 text-blue-600' />
              </div>
              <div>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent'>
                  Billing & Payments
                </h2>
                <p className='text-gray-500 text-sm'>Manage your payments and invoices</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className='flex gap-3 mb-6'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  placeholder='Search by invoice ID or service...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-12 h-11 border-gray-200 focus:ring-2 focus:ring-blue-400 bg-white shadow-sm rounded-lg'
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className='relative'>
              <Button
                variant='outline'
                className='h-11 px-4 border-gray-200 bg-white hover:bg-gray-50 rounded-lg shadow-sm min-w-[180px] justify-between'
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <div className='flex items-center gap-2'>
                  <Filter className='h-4 w-4 text-gray-500' />
                  <span className='text-sm text-gray-700'>
                    {filterStatus === 'all' ? 'All Status' : filterStatus === 'paid' ? 'Paid' : filterStatus === 'pending' ? 'Pending' : 'Overdue'}
                  </span>
                </div>
                <ChevronDown className='h-4 w-4 text-gray-500' />
              </Button>
              {showStatusDropdown && (
                <div className='absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden'>
                  {[
                    { value: 'all', label: 'All Status' },
                    { value: 'paid', label: 'Paid' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'overdue', label: 'Overdue' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterStatus(option.value)
                        setShowStatusDropdown(false)
                      }}
                      className='w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 transition-colors text-gray-700'
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            {/* Total Bills */}
            <Card className='relative overflow-hidden bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 rounded-xl group'>
              <div className='absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600 mb-1'>Total Bills</p>
                    <p className='text-3xl font-bold text-gray-900 mb-1'>{totalBills}</p>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <FileText className='h-3 w-3' />
                      All invoices
                    </p>
                  </div>
                  <div className='bg-blue-50 p-3.5 rounded-xl group-hover:bg-blue-100 transition-colors duration-300'>
                    <FileText className='h-7 w-7 text-blue-600' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Payments */}
            <Card className='relative overflow-hidden bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 rounded-xl group'>
              <div className='absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600 mb-1'>Pending Payments</p>
                    <p className='text-3xl font-bold text-gray-900 mb-1'>{pendingPayments}</p>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <Clock className='h-3 w-3' />
                      ₹{totalPendingAmount.toLocaleString()} due
                    </p>
                  </div>
                  <div className='bg-blue-50 p-3.5 rounded-xl group-hover:bg-blue-100 transition-colors duration-300'>
                    <Clock className='h-7 w-7 text-blue-600' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Paid Bills */}
            <Card className='relative overflow-hidden bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 rounded-xl group'>
              <div className='absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600 mb-1'>Paid Bills</p>
                    <p className='text-3xl font-bold text-gray-900 mb-1'>{paidBills}</p>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <CheckCircle className='h-3 w-3' />
                      Completed
                    </p>
                  </div>
                  <div className='bg-blue-50 p-3.5 rounded-xl group-hover:bg-blue-100 transition-colors duration-300'>
                    <CheckCircle className='h-7 w-7 text-blue-600' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Billing Table */}
          <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-indigo-100'>
              <h3 className='text-lg font-bold text-gray-900'>Invoice History</h3>
              <p className='text-sm text-gray-600 mt-1'>
                {filteredBills.length} invoice{filteredBills.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200'>
                  <tr>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Invoice ID</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Date</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Service</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Amount</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Payment Status</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {filteredBills.map(bill => (
                    <tr key={bill.id} className='hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className='text-sm font-bold text-gray-900'>{bill.id}</span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <Calendar className='h-4 w-4 text-blue-500' />
                          {bill.date}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-sm text-gray-900 font-medium'>{bill.service}</span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className='text-sm font-bold text-gray-900'>₹{bill.amount.toLocaleString()}</span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {getStatusBadge(bill.status)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          {(bill.status === 'pending' || bill.status === 'overdue') && (
                            <Button
                              onClick={() => handlePayNow(bill)}
                              size='sm'
                              className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200'
                            >
                              <DollarSign className='h-4 w-4 mr-1' />
                              Pay
                            </Button>
                          )}
                          <Button
                            onClick={() => handleViewDetails(bill)}
                            variant='outline'
                            size='sm'
                            className='border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200'
                          >
                            <Eye className='h-4 w-4 mr-1' />
                            View
                          </Button>
                          <Button
                            onClick={() => handleDownloadInvoice(bill)}
                            variant='outline'
                            size='sm'
                            className='border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200'
                          >
                            <Download className='h-4 w-4' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBills.length === 0 && (
                <div className='text-center py-12 px-6'>
                  <FileText className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                  <p className='text-gray-500 font-medium'>No invoices found</p>
                  <p className='text-sm text-gray-400 mt-1'>Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details Modal */}
      {showDetailsModal && selectedInvoice && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200'>
            <div className='sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-3xl z-10 shadow-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-lg'>
                    <FileText className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold text-white'>Invoice Details</h3>
                    <p className='text-sm text-blue-100'>{selectedInvoice.id}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailsModal(false)} className='text-white hover:text-blue-100 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-xl'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Invoice Info */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 hover:shadow-md transition-shadow duration-200'>
                  <p className='text-xs text-gray-600 mb-1 font-semibold'>Invoice Date</p>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-blue-600' />
                    <span className='font-semibold text-gray-900'>{selectedInvoice.date}</span>
                  </div>
                </div>
                <div className='bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200 hover:shadow-md transition-shadow duration-200'>
                  <p className='text-xs text-gray-600 mb-1 font-semibold'>Due Date</p>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-indigo-600' />
                    <span className='font-semibold text-gray-900'>{selectedInvoice.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Service Description */}
              <div>
                <h4 className='text-lg font-bold text-gray-900 mb-3'>Service Description</h4>
                <div className='bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-200'>
                  <p className='text-gray-700'>{selectedInvoice.description}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className='text-lg font-bold text-gray-900 mb-3'>Invoice Items</h4>
                <div className='border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200'>
                  <table className='w-full'>
                    <thead className='bg-gradient-to-r from-gray-50 to-blue-50'>
                      <tr>
                        <th className='px-4 py-3 text-left text-xs font-bold text-gray-700'>Item</th>
                        <th className='px-4 py-3 text-center text-xs font-bold text-gray-700'>Qty</th>
                        <th className='px-4 py-3 text-right text-xs font-bold text-gray-700'>Rate</th>
                        <th className='px-4 py-3 text-right text-xs font-bold text-gray-700'>Amount</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index} className='hover:bg-blue-50/30 transition-colors duration-150'>
                          <td className='px-4 py-3 text-sm text-gray-900'>{item.name}</td>
                          <td className='px-4 py-3 text-sm text-gray-600 text-center'>{item.quantity}</td>
                          <td className='px-4 py-3 text-sm text-gray-600 text-right'>₹{item.rate}</td>
                          <td className='px-4 py-3 text-sm font-semibold text-gray-900 text-right'>₹{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total */}
              <div className='bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-blue-200 shadow-md'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600 mb-1 font-semibold'>Total Amount</p>
                    <p className='text-3xl font-bold text-gray-900'>₹{selectedInvoice.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    {getStatusBadge(selectedInvoice.status)}
                  </div>
                </div>
                {selectedInvoice.status === 'paid' && (
                  <div className='mt-4 pt-4 border-t border-blue-200'>
                    <p className='text-sm text-gray-600'>
                      <span className='font-semibold'>Paid on:</span> {selectedInvoice.paidDate}
                    </p>
                    <p className='text-sm text-gray-600'>
                      <span className='font-semibold'>Payment Method:</span> {selectedInvoice.paymentMethod}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl flex gap-3 justify-end shadow-lg'>
              <Button 
                onClick={() => setShowDetailsModal(false)} 
                variant='outline'
                className='border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200'
              >
                Close
              </Button>
              <Button 
                onClick={() => handleDownloadInvoice(selectedInvoice)}
                variant='outline'
                className='border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200'
              >
                <Download className='h-4 w-4 mr-2' />
                Download Invoice
              </Button>
              {(selectedInvoice.status === 'pending' || selectedInvoice.status === 'overdue') && (
                <Button 
                  onClick={() => {
                    setShowDetailsModal(false)
                    handlePayNow(selectedInvoice)
                  }}
                  className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200'
                >
                  <DollarSign className='h-4 w-4 mr-2' />
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200'>
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-3xl shadow-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-2xl'>
                    <CreditCard className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white'>Make Payment</h3>
                    <p className='text-sm text-blue-100'>{selectedInvoice.id}</p>
                  </div>
                </div>
                <button onClick={() => setShowPaymentModal(false)} className='text-white hover:text-blue-100 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-xl'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Amount */}
              <div className='bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-blue-200 text-center shadow-sm'>
                <p className='text-sm text-gray-600 mb-2 font-semibold'>Amount to Pay</p>
                <p className='text-4xl font-bold text-gray-900'>₹{selectedInvoice.amount.toLocaleString()}</p>
              </div>

              {/* Payment Method */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-3'>Select Payment Method</label>
                <div className='space-y-2'>
                  {['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash'].map(method => (
                    <button
                      key={method}
                      className='w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 text-left font-medium text-gray-700 hover:shadow-md'
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='border-t border-gray-200 p-6 flex gap-3'>
              <Button 
                onClick={() => setShowPaymentModal(false)} 
                variant='outline'
                className='flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200'
              >
                Cancel
              </Button>
              <Button 
                onClick={handleProcessPayment}
                className='flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200'
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
