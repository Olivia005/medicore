'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Upload,
  History,
  Microscope,
  Calendar,
  User,
  FlaskConical,
  Download,
  Eye,
  X
} from 'lucide-react'

export default function LaboratoryTests() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [selectedTest, setSelectedTest] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showNewTestModal, setShowNewTestModal] = useState(false)
  const [newTestForm, setNewTestForm] = useState({
    patientId: '',
    patientName: '',
    testType: '',
    priority: 'normal',
    sampleType: '',
    notes: ''
  })

  // Sample laboratory test data
  const [tests, setTests] = useState([
    {
      id: 'LAB-001',
      patientId: 'PT-1001',
      patientName: 'John Anderson',
      testType: 'Complete Blood Count (CBC)',
      status: 'pending',
      priority: 'normal',
      assignedTime: '2025-01-15 09:30 AM',
      expectedTime: '2025-01-15 11:30 AM',
      technician: 'Priyasha Das',
      sampleType: 'Blood',
      notes: 'Fasting sample required'
    },
    {
      id: 'LAB-002',
      patientId: 'PT-1002',
      patientName: 'Sarah Williams',
      testType: 'Blood Culture',
      status: 'in-progress',
      priority: 'urgent',
      assignedTime: '2025-01-15 08:00 AM',
      expectedTime: '2025-01-15 10:00 AM',
      technician: 'Priyasha Das',
      sampleType: 'Blood',
      notes: 'URGENT - Suspected infection'
    },
    {
      id: 'LAB-003',
      patientId: 'PT-1003',
      patientName: 'Michael Brown',
      testType: 'Liver Function Test (LFT)',
      status: 'completed',
      priority: 'normal',
      assignedTime: '2025-01-14 02:00 PM',
      expectedTime: '2025-01-14 04:00 PM',
      completedTime: '2025-01-14 03:45 PM',
      technician: 'Priyasha Das',
      sampleType: 'Blood',
      results: 'Available',
      notes: 'All parameters normal'
    },
    {
      id: 'LAB-004',
      patientId: 'PT-1004',
      patientName: 'Emily Davis',
      testType: 'Urine Analysis',
      status: 'pending',
      priority: 'high',
      assignedTime: '2025-01-15 10:00 AM',
      expectedTime: '2025-01-15 11:00 AM',
      technician: 'Priyasha Das',
      sampleType: 'Urine',
      notes: 'Check for infection markers'
    },
    {
      id: 'LAB-005',
      patientId: 'PT-1005',
      patientName: 'Robert Johnson',
      testType: 'Thyroid Function Test (TFT)',
      status: 'in-progress',
      priority: 'normal',
      assignedTime: '2025-01-15 09:00 AM',
      expectedTime: '2025-01-15 12:00 PM',
      technician: 'Priyasha Das',
      sampleType: 'Blood',
      notes: 'Follow-up test'
    },
    {
      id: 'LAB-006',
      patientId: 'PT-1006',
      patientName: 'Jennifer Martinez',
      testType: 'Hemoglobin A1c',
      status: 'completed',
      priority: 'normal',
      assignedTime: '2025-01-14 11:00 AM',
      expectedTime: '2025-01-14 01:00 PM',
      completedTime: '2025-01-14 12:50 PM',
      technician: 'Priyasha Das',
      sampleType: 'Blood',
      results: 'Available',
      notes: 'Diabetes monitoring'
    }
  ])

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        border: 'border-orange-300',
        icon: Clock
      },
      'in-progress': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-300',
        icon: PlayCircle
      },
      completed: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-300',
        icon: CheckCircle
      }
    }

    const badge = badges[status]
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        <Icon className='h-3.5 w-3.5' />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const badges = {
      urgent: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: AlertCircle },
      high: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', icon: AlertCircle },
      normal: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: Clock }
    }

    const badge = badges[priority]
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        <Icon className='h-3 w-3' />
        {priority.toUpperCase()}
      </span>
    )
  }

  const filteredTests = tests.filter(test => {
    const matchesSearch = 
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus
    const matchesPriority = filterPriority === 'all' || test.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleStartTest = (test) => {
    setTests(tests.map(t => 
      t.id === test.id ? { ...t, status: 'in-progress' } : t
    ))
  }

  const handleCompleteTest = (test) => {
    setTests(tests.map(t => 
      t.id === test.id ? { ...t, status: 'completed', completedTime: new Date().toLocaleString() } : t
    ))
  }

  const handleCreateNewTest = () => {
    if (!newTestForm.patientId || !newTestForm.patientName || !newTestForm.testType || !newTestForm.sampleType) {
      alert('Please fill in all required fields')
      return
    }

    const newTest = {
      id: `LAB-${String(tests.length + 1).padStart(3, '0')}`,
      patientId: newTestForm.patientId,
      patientName: newTestForm.patientName,
      testType: newTestForm.testType,
      status: 'pending',
      priority: newTestForm.priority,
      assignedTime: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      expectedTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      technician: 'Priyasha Das',
      sampleType: newTestForm.sampleType,
      notes: newTestForm.notes
    }

    setTests([newTest, ...tests])
    setShowNewTestModal(false)
    setNewTestForm({
      patientId: '',
      patientName: '',
      testType: '',
      priority: 'normal',
      sampleType: '',
      notes: ''
    })
  }

  const stats = {
    total: tests.length,
    pending: tests.filter(t => t.status === 'pending').length,
    inProgress: tests.filter(t => t.status === 'in-progress').length,
    completed: tests.filter(t => t.status === 'completed').length,
    urgent: tests.filter(t => t.priority === 'urgent').length
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-blue-100 rounded-xl'>
                <Microscope className='h-8 w-8 text-blue-600' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>Laboratory Tests</h1>
                <p className='text-gray-600'>Handle routine lab tests and manage results</p>
              </div>
            </div>
            <Button 
              className='bg-blue-600 hover:bg-blue-700 text-white'
              onClick={() => setShowNewTestModal(true)}
            >
              <FlaskConical className='h-4 w-4 mr-2' />
              New Test Order
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-8'>
          <div className='bg-white border-2 border-blue-200 rounded-xl p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Total Tests</p>
                <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
              </div>
              <FlaskConical className='h-8 w-8 text-blue-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-orange-200 rounded-xl p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Pending</p>
                <p className='text-2xl font-bold text-orange-600'>{stats.pending}</p>
              </div>
              <Clock className='h-8 w-8 text-orange-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-blue-200 rounded-xl p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>In Progress</p>
                <p className='text-2xl font-bold text-blue-600'>{stats.inProgress}</p>
              </div>
              <PlayCircle className='h-8 w-8 text-blue-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-green-200 rounded-xl p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Completed</p>
                <p className='text-2xl font-bold text-green-600'>{stats.completed}</p>
              </div>
              <CheckCircle className='h-8 w-8 text-green-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-red-200 rounded-xl p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Urgent</p>
                <p className='text-2xl font-bold text-red-600'>{stats.urgent}</p>
              </div>
              <AlertCircle className='h-8 w-8 text-red-600' />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className='bg-white border-2 border-gray-200 rounded-xl p-6 mb-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Filter className='h-5 w-5 text-blue-600' />
            <h3 className='text-lg font-bold text-gray-900'>Filters & Search</h3>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                placeholder='Search by Test ID, Patient ID, or Test Type...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 border-gray-300'
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium'
            >
              <option value='all'>All Status</option>
              <option value='pending'>Pending</option>
              <option value='in-progress'>In Progress</option>
              <option value='completed'>Completed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium'
            >
              <option value='all'>All Priority</option>
              <option value='urgent'>Urgent</option>
              <option value='high'>High</option>
              <option value='normal'>Normal</option>
            </select>
          </div>
        </div>

        {/* Test Table */}
        <div className='bg-white border-2 border-gray-200 rounded-xl overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-blue-50 border-b-2 border-blue-200'>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Test ID</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Patient ID</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Test Type</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Priority</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Assigned Time</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredTests.map((test, index) => (
                  <tr 
                    key={test.id} 
                    className={`hover:bg-blue-50 transition-colors ${
                      test.priority === 'urgent' ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <FlaskConical className='h-4 w-4 text-blue-600' />
                        <span className='font-mono font-semibold text-blue-600'>{test.id}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <User className='h-4 w-4 text-gray-400' />
                        <div>
                          <p className='font-semibold text-gray-900'>{test.patientId}</p>
                          <p className='text-xs text-gray-600'>{test.patientName}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='font-medium text-gray-900'>{test.testType}</p>
                        <p className='text-xs text-gray-600'>Sample: {test.sampleType}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(test.status)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getPriorityBadge(test.priority)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <Calendar className='h-4 w-4' />
                        {test.assignedTime}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        {test.status === 'pending' && (
                          <Button
                            size='sm'
                            onClick={() => handleStartTest(test)}
                            className='bg-blue-600 hover:bg-blue-700 text-white'
                          >
                            <PlayCircle className='h-3.5 w-3.5 mr-1' />
                            Start
                          </Button>
                        )}
                        {test.status === 'in-progress' && (
                          <>
                            <Button
                              size='sm'
                              onClick={() => handleCompleteTest(test)}
                              className='bg-green-600 hover:bg-green-700 text-white'
                            >
                              <Upload className='h-3.5 w-3.5 mr-1' />
                              Upload
                            </Button>
                          </>
                        )}
                        {test.status === 'completed' && (
                          <Button
                            size='sm'
                            variant='outline'
                            className='border-green-300 text-green-600 hover:bg-green-50'
                          >
                            <Download className='h-3.5 w-3.5 mr-1' />
                            Results
                          </Button>
                        )}
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => {
                            setSelectedTest(test)
                            setShowDetailsModal(true)
                          }}
                          className='border-gray-300 text-gray-600 hover:bg-gray-50'
                        >
                          <Eye className='h-3.5 w-3.5 mr-1' />
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTests.length === 0 && (
            <div className='text-center py-12'>
              <FlaskConical className='h-16 w-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-gray-900 mb-2'>No Tests Found</h3>
              <p className='text-gray-600'>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Test Details Modal */}
      {showDetailsModal && selectedTest && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-blue-400 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b-2 border-gray-200 bg-blue-50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-blue-600 rounded-lg'>
                    <FlaskConical className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>Test Details</h3>
                    <p className='text-sm text-gray-600'>{selectedTest.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowDetailsModal(false)
                    setSelectedTest(null)
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
                  <User className='h-5 w-5 text-blue-600' />
                  Patient Information
                </h4>
                <div className='grid grid-cols-2 gap-4 bg-blue-50 border border-blue-200 rounded-lg p-4'>
                  <div>
                    <p className='text-xs font-semibold text-gray-600'>Patient ID</p>
                    <p className='font-semibold text-gray-900'>{selectedTest.patientId}</p>
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-gray-600'>Patient Name</p>
                    <p className='font-semibold text-gray-900'>{selectedTest.patientName}</p>
                  </div>
                </div>
              </div>

              {/* Test Information */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <FlaskConical className='h-5 w-5 text-blue-600' />
                  Test Information
                </h4>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Test Type</span>
                    <span className='font-semibold text-gray-900'>{selectedTest.testType}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Sample Type</span>
                    <span className='font-semibold text-gray-900'>{selectedTest.sampleType}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Status</span>
                    {getStatusBadge(selectedTest.status)}
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Priority</span>
                    {getPriorityBadge(selectedTest.priority)}
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Technician</span>
                    <span className='font-semibold text-gray-900'>{selectedTest.technician}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Assigned Time</span>
                    <span className='font-semibold text-gray-900'>{selectedTest.assignedTime}</span>
                  </div>
                  {selectedTest.completedTime && (
                    <div className='flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg'>
                      <span className='text-sm font-semibold text-gray-600'>Completed Time</span>
                      <span className='font-semibold text-green-700'>{selectedTest.completedTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedTest.notes && (
                <div>
                  <h4 className='font-bold text-gray-900 mb-3'>Notes</h4>
                  <div className='p-4 bg-amber-50 border border-amber-200 rounded-lg'>
                    <p className='text-sm text-gray-700'>{selectedTest.notes}</p>
                  </div>
                </div>
              )}
            </div>

            <div className='p-6 border-t-2 border-gray-200 flex justify-end gap-3 bg-gray-50'>
              <Button
                onClick={() => {
                  setShowDetailsModal(false)
                  setSelectedTest(null)
                }}
                variant='outline'
                className='border-gray-300'
              >
                Close
              </Button>
              <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
                <History className='h-4 w-4 mr-2' />
                View History
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Test Order Modal */}
      {showNewTestModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-blue-400 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b-2 border-gray-200 bg-blue-50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-blue-600 rounded-lg'>
                    <FlaskConical className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>New Test Order</h3>
                    <p className='text-sm text-gray-600'>Create a new laboratory test order</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowNewTestModal(false)
                    setNewTestForm({
                      patientId: '',
                      patientName: '',
                      testType: '',
                      priority: 'normal',
                      sampleType: '',
                      notes: ''
                    })
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
                  <User className='h-5 w-5 text-blue-600' />
                  Patient Information
                </h4>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Patient ID <span className='text-red-500'>*</span>
                    </label>
                    <Input
                      placeholder='e.g., PT-1001'
                      value={newTestForm.patientId}
                      onChange={(e) => setNewTestForm({...newTestForm, patientId: e.target.value})}
                      className='border-2 border-gray-300'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Patient Name <span className='text-red-500'>*</span>
                    </label>
                    <Input
                      placeholder='e.g., John Anderson'
                      value={newTestForm.patientName}
                      onChange={(e) => setNewTestForm({...newTestForm, patientName: e.target.value})}
                      className='border-2 border-gray-300'
                    />
                  </div>
                </div>
              </div>

              {/* Test Details */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <FlaskConical className='h-5 w-5 text-blue-600' />
                  Test Details
                </h4>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Test Type <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={newTestForm.testType}
                      onChange={(e) => setNewTestForm({...newTestForm, testType: e.target.value})}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium'
                    >
                      <option value=''>Select test type...</option>
                      <option value='Complete Blood Count (CBC)'>Complete Blood Count (CBC)</option>
                      <option value='Blood Culture'>Blood Culture</option>
                      <option value='Liver Function Test (LFT)'>Liver Function Test (LFT)</option>
                      <option value='Kidney Function Test (KFT)'>Kidney Function Test (KFT)</option>
                      <option value='Thyroid Function Test (TFT)'>Thyroid Function Test (TFT)</option>
                      <option value='Lipid Profile'>Lipid Profile</option>
                      <option value='Hemoglobin A1c'>Hemoglobin A1c</option>
                      <option value='Urine Analysis'>Urine Analysis</option>
                      <option value='Blood Glucose'>Blood Glucose</option>
                      <option value='Electrolyte Panel'>Electrolyte Panel</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Sample Type <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={newTestForm.sampleType}
                      onChange={(e) => setNewTestForm({...newTestForm, sampleType: e.target.value})}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium'
                    >
                      <option value=''>Select sample type...</option>
                      <option value='Blood'>Blood</option>
                      <option value='Urine'>Urine</option>
                      <option value='Serum'>Serum</option>
                      <option value='Plasma'>Plasma</option>
                      <option value='Saliva'>Saliva</option>
                      <option value='Tissue'>Tissue</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Priority <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={newTestForm.priority}
                      onChange={(e) => setNewTestForm({...newTestForm, priority: e.target.value})}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium'
                    >
                      <option value='normal'>Normal</option>
                      <option value='high'>High</option>
                      <option value='urgent'>Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Notes (Optional)
                    </label>
                    <textarea
                      placeholder='Add any special instructions or notes...'
                      value={newTestForm.notes}
                      onChange={(e) => setNewTestForm({...newTestForm, notes: e.target.value})}
                      rows={3}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='p-6 border-t-2 border-gray-200 flex justify-end gap-3 bg-gray-50'>
              <Button
                onClick={() => {
                  setShowNewTestModal(false)
                  setNewTestForm({
                    patientId: '',
                    patientName: '',
                    testType: '',
                    priority: 'normal',
                    sampleType: '',
                    notes: ''
                  })
                }}
                variant='outline'
                className='border-gray-300'
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateNewTest}
                className='bg-blue-600 hover:bg-blue-700 text-white'
              >
                <FlaskConical className='h-4 w-4 mr-2' />
                Create Test Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
