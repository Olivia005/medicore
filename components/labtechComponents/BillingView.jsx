'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Filter,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  X,
  User,
  Calendar,
  CreditCard,
  FileText,
  Lock,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BillingView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTestType, setFilterTestType] = useState('all')
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Sample billing data
  const [invoices] = useState([
    {
      invoiceId: 'INV-2025-001',
      patientId: 'PT-1001',
      patientName: 'John Anderson',
      testName: 'Complete Blood Count (CBC)',
      testType: 'Laboratory',
      testId: 'LAB-001',
      amount: 150.00,
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      billingDate: '2025-01-15',
      paymentDate: '2025-01-15',
      technician: 'Priyasha Das'
    },
    {
      invoiceId: 'INV-2025-002',
      patientId: 'PT-1002',
      patientName: 'Sarah Williams',
      testName: 'Brain MRI',
      testType: 'Radiology',
      testId: 'RAD-002',
      amount: 1200.00,
      paymentStatus: 'pending',
      paymentMethod: 'Pending',
      billingDate: '2025-01-15',
      technician: 'Priyasha Das'
    },
    {
      invoiceId: 'INV-2025-003',
      patientId: 'PT-1003',
      patientName: 'Michael Brown',
      testName: 'Abdominal CT Scan',
      testType: 'Radiology',
      testId: 'RAD-003',
      amount: 800.00,
      paymentStatus: 'paid',
      paymentMethod: 'Insurance',
      billingDate: '2025-01-14',
      paymentDate: '2025-01-14',
      technician: 'Priyasha Das'
    },
    {
      invoiceId: 'INV-2025-004',
      patientId: 'PT-1004',
      patientName: 'Emily Davis',
      testName: 'Lipid Profile',
      testType: 'Laboratory',
      testId: 'LAB-004',
      amount: 120.00,
      paymentStatus: 'failed',
      paymentMethod: 'Credit Card',
      billingDate: '2025-01-15',
      technician: 'Priyasha Das',
      notes: 'Payment declined - card expired'
    },
    {
      invoiceId: 'INV-2025-005',
      patientId: 'PT-1005',
      patientName: 'Robert Johnson',
      testName: 'Tissue Biopsy Analysis',
      testType: 'Pathology',
      testId: 'PATH-005',
      amount: 450.00,
      paymentStatus: 'paid',
      paymentMethod: 'Cash',
      billingDate: '2025-01-15',
      paymentDate: '2025-01-15',
      technician: 'Priyasha Das'
    },
    {
      invoiceId: 'INV-2025-006',
      patientId: 'PT-1006',
      patientName: 'Jennifer Martinez',
      testName: 'Cardiac CT Angiography',
      testType: 'Radiology',
      testId: 'RAD-006',
      amount: 1500.00,
      paymentStatus: 'pending',
      paymentMethod: 'Pending',
      billingDate: '2025-01-14',
      technician: 'Priyasha Das'
    },
    {
      invoiceId: 'INV-2025-007',
      patientId: 'PT-1007',
      patientName: 'David Wilson',
      testName: 'Thyroid Function Test (TFT)',
      testType: 'Laboratory',
      testId: 'LAB-007',
      amount: 180.00,
      paymentStatus: 'paid',
      paymentMethod: 'Debit Card',
      billingDate: '2025-01-14',
      paymentDate: '2025-01-14',
      technician: 'Priyasha Das'
    },
    {
      invoiceId: 'INV-2025-008',
      patientId: 'PT-1008',
      patientName: 'Lisa Anderson',
      testName: 'Bone Marrow Analysis',
      testType: 'Pathology',
      testId: 'PATH-008',
      amount: 650.00,
      paymentStatus: 'paid',
      paymentMethod: 'Insurance',
      billingDate: '2025-01-13',
      paymentDate: '2025-01-13',
      technician: 'Priyasha Das'
    }
  ])

  const getPaymentStatusBadge = (status) => {
    const badges = {
      paid: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-300',
        icon: CheckCircle
      },
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-300',
        icon: Clock
      },
      failed: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-300',
        icon: XCircle
      }
    }

    const badge = badges[status]
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        <Icon className='h-3.5 w-3.5' />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getTestTypeBadge = (type) => {
    const badges = {
      Laboratory: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
      Radiology: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
      Pathology: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-300' }
    }

    const badge = badges[type]

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        {type}
      </span>
    )
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.testName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || invoice.paymentStatus === filterStatus
    const matchesTestType = filterTestType === 'all' || invoice.testType === filterTestType
    
    return matchesSearch && matchesStatus && matchesTestType
  })

  const stats = {
    total: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.filter(inv => inv.paymentStatus === 'paid').length,
    paidAmount: invoices.filter(inv => inv.paymentStatus === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    pending: invoices.filter(inv => inv.paymentStatus === 'pending').length,
    pendingAmount: invoices.filter(inv => inv.paymentStatus === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    failed: invoices.filter(inv => inv.paymentStatus === 'failed').length
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 to-white p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-emerald-100 rounded-xl'>
                <DollarSign className='h-8 w-8 text-emerald-600' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>Billing Verification</h1>
                <p className='text-gray-600'>Lab billing records - View only</p>
              </div>
            </div>
            <div className='flex items-center gap-2 px-4 py-2 bg-amber-50 border-2 border-amber-300 rounded-lg'>
              <Lock className='h-5 w-5 text-amber-600' />
              <span className='text-sm font-semibold text-amber-700'>Read-Only Access</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white border-2 border-emerald-200 rounded-xl p-4 hover:border-emerald-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between mb-2'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Total Invoices</p>
                <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
              </div>
              <FileText className='h-8 w-8 text-emerald-600' />
            </div>
            <p className='text-xs text-gray-500 font-semibold'>Total: ${stats.totalAmount.toFixed(2)}</p>
          </div>

          <div className='bg-white border-2 border-green-200 rounded-xl p-4 hover:border-green-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between mb-2'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Paid</p>
                <p className='text-2xl font-bold text-green-600'>{stats.paid}</p>
              </div>
              <CheckCircle className='h-8 w-8 text-green-600' />
            </div>
            <p className='text-xs text-green-700 font-semibold'>${stats.paidAmount.toFixed(2)}</p>
          </div>

          <div className='bg-white border-2 border-yellow-200 rounded-xl p-4 hover:border-yellow-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between mb-2'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Pending</p>
                <p className='text-2xl font-bold text-yellow-600'>{stats.pending}</p>
              </div>
              <Clock className='h-8 w-8 text-yellow-600' />
            </div>
            <p className='text-xs text-yellow-700 font-semibold'>${stats.pendingAmount.toFixed(2)}</p>
          </div>

          <div className='bg-white border-2 border-red-200 rounded-xl p-4 hover:border-red-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between mb-2'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Failed</p>
                <p className='text-2xl font-bold text-red-600'>{stats.failed}</p>
              </div>
              <XCircle className='h-8 w-8 text-red-600' />
            </div>
            <p className='text-xs text-red-700 font-semibold'>Requires Attention</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className='bg-white border-2 border-gray-200 rounded-xl p-6 mb-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Filter className='h-5 w-5 text-emerald-600' />
            <h3 className='text-lg font-bold text-gray-900'>Filters & Search</h3>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                placeholder='Search by Invoice ID, Patient ID, or Test Name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 border-gray-300'
              />
            </div>

            {/* Payment Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium'
            >
              <option value='all'>All Payment Status</option>
              <option value='paid'>Paid</option>
              <option value='pending'>Pending</option>
              <option value='failed'>Failed</option>
            </select>

            {/* Test Type Filter */}
            <select
              value={filterTestType}
              onChange={(e) => setFilterTestType(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium'
            >
              <option value='all'>All Test Types</option>
              <option value='Laboratory'>Laboratory</option>
              <option value='Radiology'>Radiology</option>
              <option value='Pathology'>Pathology</option>
            </select>
          </div>
        </div>

        {/* Billing Table */}
        <div className='bg-white border-2 border-gray-200 rounded-xl overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-emerald-50 border-b-2 border-emerald-200'>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Invoice ID</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Patient Info</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Test Name</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Test Type</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Amount</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Payment Status</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredInvoices.map((invoice) => (
                  <tr 
                    key={invoice.invoiceId} 
                    className={`hover:bg-emerald-50 transition-colors ${
                      invoice.paymentStatus === 'failed' ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4 text-emerald-600' />
                        <span className='font-mono font-semibold text-emerald-600'>{invoice.invoiceId}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <User className='h-4 w-4 text-gray-400' />
                        <div>
                          <p className='font-semibold text-gray-900'>{invoice.patientName}</p>
                          <p className='text-xs text-gray-600'>{invoice.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='font-medium text-gray-900'>{invoice.testName}</p>
                        <p className='text-xs text-gray-600'>{invoice.testId}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getTestTypeBadge(invoice.testType)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4 text-emerald-600' />
                        <span className='text-lg font-bold text-gray-900'>{invoice.amount.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getPaymentStatusBadge(invoice.paymentStatus)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => {
                          setSelectedInvoice(invoice)
                          setShowDetailsModal(true)
                        }}
                        className='border-gray-300 text-gray-600 hover:bg-gray-50'
                      >
                        <Eye className='h-3.5 w-3.5 mr-1' />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className='text-center py-12'>
              <FileText className='h-16 w-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-gray-900 mb-2'>No Invoices Found</h3>
              <p className='text-gray-600'>Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Permissions Notice */}
        <div className='mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl'>
          <div className='flex items-start gap-3'>
            <AlertCircle className='h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5' />
            <div>
              <p className='text-sm font-semibold text-amber-900'>Limited Access Notice</p>
              <p className='text-xs text-amber-700 mt-1'>
                You have <strong>view-only</strong> access to billing records. You cannot edit, delete, or process payments. 
                Contact the billing department for any changes or corrections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details Modal */}
      {showDetailsModal && selectedInvoice && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-emerald-400 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b-2 border-gray-200 bg-emerald-50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-emerald-600 rounded-lg'>
                    <FileText className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>Invoice Details</h3>
                    <p className='text-sm text-gray-600'>{selectedInvoice.invoiceId}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowDetailsModal(false)
                    setSelectedInvoice(null)
                  }}
                  className='text-gray-400 hover:text-gray-600 transition-colors'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Patient Information */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <User className='h-5 w-5 text-emerald-600' />
                  Patient Information
                </h4>
                <div className='grid grid-cols-2 gap-4 bg-blue-50 border border-blue-200 rounded-lg p-4'>
                  <div>
                    <p className='text-xs font-semibold text-gray-600'>Patient ID</p>
                    <p className='font-semibold text-gray-900'>{selectedInvoice.patientId}</p>
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-gray-600'>Patient Name</p>
                    <p className='font-semibold text-gray-900'>{selectedInvoice.patientName}</p>
                  </div>
                </div>
              </div>

              {/* Test Information */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <FileText className='h-5 w-5 text-emerald-600' />
                  Test Information
                </h4>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Test ID</span>
                    <span className='font-semibold text-gray-900'>{selectedInvoice.testId}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Test Name</span>
                    <span className='font-semibold text-gray-900'>{selectedInvoice.testName}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Test Type</span>
                    {getTestTypeBadge(selectedInvoice.testType)}
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Technician</span>
                    <span className='font-semibold text-gray-900'>{selectedInvoice.technician}</span>
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <DollarSign className='h-5 w-5 text-emerald-600' />
                  Billing Information
                </h4>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Invoice ID</span>
                    <span className='font-semibold text-emerald-600'>{selectedInvoice.invoiceId}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-emerald-50 border border-emerald-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Amount</span>
                    <span className='text-2xl font-bold text-emerald-600'>${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Payment Status</span>
                    {getPaymentStatusBadge(selectedInvoice.paymentStatus)}
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Payment Method</span>
                    <div className='flex items-center gap-2'>
                      <CreditCard className='h-4 w-4 text-gray-600' />
                      <span className='font-semibold text-gray-900'>{selectedInvoice.paymentMethod}</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Billing Date</span>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-gray-600' />
                      <span className='font-semibold text-gray-900'>{selectedInvoice.billingDate}</span>
                    </div>
                  </div>
                  {selectedInvoice.paymentDate && (
                    <div className='flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg'>
                      <span className='text-sm font-semibold text-gray-600'>Payment Date</span>
                      <span className='font-semibold text-green-700'>{selectedInvoice.paymentDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedInvoice.notes && (
                <div>
                  <h4 className='font-bold text-gray-900 mb-3'>Notes</h4>
                  <div className='p-4 bg-amber-50 border border-amber-200 rounded-lg'>
                    <p className='text-sm text-gray-700'>{selectedInvoice.notes}</p>
                  </div>
                </div>
              )}

              {/* Permission Notice */}
              <div className='p-4 bg-amber-50 border border-amber-200 rounded-lg'>
                <div className='flex items-start gap-3'>
                  <Lock className='h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5' />
                  <div>
                    <p className='text-sm font-semibold text-amber-900'>View-Only Mode</p>
                    <p className='text-xs text-amber-700 mt-1'>
                      You cannot modify billing information. Contact the billing department for changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-6 border-t-2 border-gray-200 flex justify-end gap-3 bg-gray-50'>
              <Button
                onClick={() => {
                  setShowDetailsModal(false)
                  setSelectedInvoice(null)
                }}
                variant='outline'
                className='border-gray-300'
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
