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
  Upload,
  Scan,
  Calendar,
  User,
  Download,
  Eye,
  X,
  Image as ImageIcon,
  FileText,
  Activity,
  Camera
} from 'lucide-react'

export default function RadiologyTests() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterScanType, setFilterScanType] = useState('all')
  const [selectedTest, setSelectedTest] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showNewTestModal, setShowNewTestModal] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    images: [],
    technicianNotes: ''
  })
  const [newTestForm, setNewTestForm] = useState({
    patientId: '',
    patientName: '',
    scanType: '',
    testName: '',
    priority: 'normal',
    notes: ''
  })

  // Sample radiology test data
  const [tests, setTests] = useState([
    {
      id: 'RAD-001',
      patientId: 'PT-1001',
      patientName: 'John Anderson',
      testName: 'Chest X-Ray',
      scanType: 'X-Ray',
      status: 'scheduled',
      priority: 'normal',
      scheduledTime: '2025-01-15 10:00 AM',
      technician: 'Priyasha Das',
      bodyPart: 'Chest',
      notes: 'Suspected pneumonia'
    },
    {
      id: 'RAD-002',
      patientId: 'PT-1002',
      patientName: 'Sarah Williams',
      testName: 'Brain MRI',
      scanType: 'MRI',
      status: 'in-progress',
      priority: 'urgent',
      scheduledTime: '2025-01-15 09:00 AM',
      technician: 'Priyasha Das',
      bodyPart: 'Brain',
      notes: 'URGENT - Severe headaches',
      images: ['brain_mri_001.dcm', 'brain_mri_002.dcm']
    },
    {
      id: 'RAD-003',
      patientId: 'PT-1003',
      patientName: 'Michael Brown',
      testName: 'Abdominal CT Scan',
      scanType: 'CT',
      status: 'completed',
      priority: 'normal',
      scheduledTime: '2025-01-14 02:00 PM',
      completedTime: '2025-01-14 03:30 PM',
      technician: 'Priyasha Das',
      bodyPart: 'Abdomen',
      notes: 'Routine checkup',
      images: ['abdomen_ct_001.dcm', 'abdomen_ct_002.dcm', 'abdomen_ct_003.dcm'],
      technicianNotes: 'No abnormalities detected. Clear imaging quality.'
    },
    {
      id: 'RAD-004',
      patientId: 'PT-1004',
      patientName: 'Emily Davis',
      testName: 'Knee X-Ray',
      scanType: 'X-Ray',
      status: 'scheduled',
      priority: 'high',
      scheduledTime: '2025-01-15 11:00 AM',
      technician: 'Priyasha Das',
      bodyPart: 'Knee',
      notes: 'Sports injury - check for fractures'
    },
    {
      id: 'RAD-005',
      patientId: 'PT-1005',
      patientName: 'Robert Johnson',
      testName: 'Spine MRI',
      scanType: 'MRI',
      status: 'in-progress',
      priority: 'normal',
      scheduledTime: '2025-01-15 08:30 AM',
      technician: 'Priyasha Das',
      bodyPart: 'Spine',
      notes: 'Lower back pain evaluation',
      images: ['spine_mri_001.dcm']
    },
    {
      id: 'RAD-006',
      patientId: 'PT-1006',
      patientName: 'Jennifer Martinez',
      testName: 'Cardiac CT Angiography',
      scanType: 'CT',
      status: 'completed',
      priority: 'urgent',
      scheduledTime: '2025-01-14 11:00 AM',
      completedTime: '2025-01-14 12:45 PM',
      technician: 'Priyasha Das',
      bodyPart: 'Heart',
      notes: 'Cardiac evaluation',
      images: ['cardiac_ct_001.dcm', 'cardiac_ct_002.dcm'],
      technicianNotes: 'Contrast medium administered successfully. Good visualization of coronary arteries.'
    }
  ])

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-300',
        icon: Clock
      },
      'in-progress': {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        border: 'border-orange-300',
        icon: Activity
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

  const getScanIcon = (scanType) => {
    const icons = {
      'X-Ray': Activity,
      'MRI': Scan,
      'CT': Activity
    }
    return icons[scanType] || Scan
  }

  const filteredTests = tests.filter(test => {
    const matchesSearch = 
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus
    const matchesScanType = filterScanType === 'all' || test.scanType === filterScanType
    
    return matchesSearch && matchesStatus && matchesScanType
  })

  const handleStartTest = (test) => {
    setTests(tests.map(t => 
      t.id === test.id ? { ...t, status: 'in-progress' } : t
    ))
  }

  const handleUploadImages = (test) => {
    setSelectedTest(test)
    setShowUploadModal(true)
  }

  const handleSubmitUpload = () => {
    if (!uploadForm.technicianNotes) {
      alert('Please add technician notes')
      return
    }

    setTests(tests.map(t => 
      t.id === selectedTest.id ? { 
        ...t, 
        status: 'completed',
        completedTime: new Date().toLocaleString(),
        technicianNotes: uploadForm.technicianNotes,
        images: uploadForm.images.length > 0 ? uploadForm.images : ['scan_uploaded.dcm']
      } : t
    ))
    
    setShowUploadModal(false)
    setUploadForm({ images: [], technicianNotes: '' })
    setSelectedTest(null)
  }

  const handleCreateNewTest = () => {
    if (!newTestForm.patientId || !newTestForm.patientName || !newTestForm.scanType || !newTestForm.testName) {
      alert('Please fill in all required fields')
      return
    }

    const newTest = {
      id: `RAD-${String(tests.length + 1).padStart(3, '0')}`,
      patientId: newTestForm.patientId,
      patientName: newTestForm.patientName,
      testName: newTestForm.testName,
      scanType: newTestForm.scanType,
      status: 'scheduled',
      priority: newTestForm.priority,
      scheduledTime: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      technician: 'Priyasha Das',
      bodyPart: newTestForm.testName.split(' ')[0],
      notes: newTestForm.notes
    }

    setTests([newTest, ...tests])
    setShowNewTestModal(false)
    setNewTestForm({
      patientId: '',
      patientName: '',
      scanType: '',
      testName: '',
      priority: 'normal',
      notes: ''
    })
  }

  const stats = {
    total: tests.length,
    scheduled: tests.filter(t => t.status === 'scheduled').length,
    inProgress: tests.filter(t => t.status === 'in-progress').length,
    completed: tests.filter(t => t.status === 'completed').length,
    urgent: tests.filter(t => t.priority === 'urgent').length
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-white p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-purple-100 rounded-xl'>
                <Scan className='h-8 w-8 text-purple-600' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>Radiology Tests</h1>
                <p className='text-gray-600'>Imaging-based tests and scan management</p>
              </div>
            </div>
            <Button 
              className='bg-purple-600 hover:bg-purple-700 text-white'
              onClick={() => setShowNewTestModal(true)}
            >
              <Camera className='h-4 w-4 mr-2' />
              New Scan Order
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-8'>
          <div className='bg-white border-2 border-purple-200 rounded-xl p-4 hover:border-purple-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Total Scans</p>
                <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
              </div>
              <Scan className='h-8 w-8 text-purple-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Scheduled</p>
                <p className='text-2xl font-bold text-blue-600'>{stats.scheduled}</p>
              </div>
              <Clock className='h-8 w-8 text-blue-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>In Progress</p>
                <p className='text-2xl font-bold text-orange-600'>{stats.inProgress}</p>
              </div>
              <Activity className='h-8 w-8 text-orange-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-green-200 rounded-xl p-4 hover:border-green-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Completed</p>
                <p className='text-2xl font-bold text-green-600'>{stats.completed}</p>
              </div>
              <CheckCircle className='h-8 w-8 text-green-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-red-200 rounded-xl p-4 hover:border-red-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
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
            <Filter className='h-5 w-5 text-purple-600' />
            <h3 className='text-lg font-bold text-gray-900'>Filters & Search</h3>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                placeholder='Search by Test ID, Patient ID, or Test Name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 border-gray-300'
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium'
            >
              <option value='all'>All Status</option>
              <option value='scheduled'>Scheduled</option>
              <option value='in-progress'>In Progress</option>
              <option value='completed'>Completed</option>
            </select>

            {/* Scan Type Filter */}
            <select
              value={filterScanType}
              onChange={(e) => setFilterScanType(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium'
            >
              <option value='all'>All Scan Types</option>
              <option value='X-Ray'>X-Ray</option>
              <option value='MRI'>MRI</option>
              <option value='CT'>CT Scan</option>
            </select>
          </div>
        </div>

        {/* Tests Grid/Cards View */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredTests.map((test) => {
            const ScanIcon = getScanIcon(test.scanType)
            return (
              <div 
                key={test.id} 
                className={`bg-white border-2 rounded-xl p-6 hover:border-purple-400 transition-all ${
                  test.priority === 'urgent' ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              >
                {/* Card Header */}
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-purple-100 rounded-lg'>
                      <ScanIcon className='h-6 w-6 text-purple-600' />
                    </div>
                    <div>
                      <h3 className='font-bold text-gray-900'>{test.testName}</h3>
                      <p className='text-xs text-gray-600 font-mono'>{test.id}</p>
                    </div>
                  </div>
                  {getPriorityBadge(test.priority)}
                </div>

                {/* Patient Info */}
                <div className='mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                  <div className='flex items-center gap-2 mb-1'>
                    <User className='h-4 w-4 text-blue-600' />
                    <span className='text-sm font-semibold text-gray-700'>Patient</span>
                  </div>
                  <p className='text-sm font-bold text-gray-900'>{test.patientName}</p>
                  <p className='text-xs text-gray-600 font-mono'>{test.patientId}</p>
                </div>

                {/* Test Details */}
                <div className='space-y-2 mb-4'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-600 font-semibold'>Scan Type:</span>
                    <span className='font-bold text-purple-600'>{test.scanType}</span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-600 font-semibold'>Body Part:</span>
                    <span className='font-bold text-gray-900'>{test.bodyPart}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <Calendar className='h-4 w-4 text-gray-400' />
                    <span className='text-gray-600'>{test.scheduledTime}</span>
                  </div>
                  <div className='pt-2'>
                    {getStatusBadge(test.status)}
                  </div>
                </div>

                {/* Images Info */}
                {test.images && test.images.length > 0 && (
                  <div className='mb-4 p-2 bg-green-50 border border-green-200 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <ImageIcon className='h-4 w-4 text-green-600' />
                      <span className='text-xs font-semibold text-green-700'>
                        {test.images.length} image(s) uploaded
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className='flex gap-2 pt-4 border-t border-gray-200'>
                  {test.status === 'scheduled' && (
                    <Button
                      size='sm'
                      onClick={() => handleStartTest(test)}
                      className='flex-1 bg-purple-600 hover:bg-purple-700 text-white'
                    >
                      <Activity className='h-3.5 w-3.5 mr-1' />
                      Start Scan
                    </Button>
                  )}
                  {test.status === 'in-progress' && (
                    <Button
                      size='sm'
                      onClick={() => handleUploadImages(test)}
                      className='flex-1 bg-green-600 hover:bg-green-700 text-white'
                    >
                      <Upload className='h-3.5 w-3.5 mr-1' />
                      Upload Results
                    </Button>
                  )}
                  {test.status === 'completed' && (
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1 border-green-300 text-green-600 hover:bg-green-50'
                    >
                      <Download className='h-3.5 w-3.5 mr-1' />
                      Download
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
                    <Eye className='h-3.5 w-3.5' />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredTests.length === 0 && (
          <div className='text-center py-12 bg-white border-2 border-gray-200 rounded-xl'>
            <Scan className='h-16 w-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-xl font-bold text-gray-900 mb-2'>No Tests Found</h3>
            <p className='text-gray-600'>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Test Details Modal */}
      {showDetailsModal && selectedTest && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-purple-400 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b-2 border-gray-200 bg-purple-50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-purple-600 rounded-lg'>
                    <Scan className='h-6 w-6 text-white' />
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
                  <User className='h-5 w-5 text-purple-600' />
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
                  <Scan className='h-5 w-5 text-purple-600' />
                  Test Information
                </h4>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Test Name</span>
                    <span className='font-semibold text-gray-900'>{selectedTest.testName}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Scan Type</span>
                    <span className='font-semibold text-purple-600'>{selectedTest.scanType}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <span className='text-sm font-semibold text-gray-600'>Body Part</span>
                    <span className='font-semibold text-gray-900'>{selectedTest.bodyPart}</span>
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
                    <span className='text-sm font-semibold text-gray-600'>Scheduled Time</span>
                    <span className='font-semibold text-gray-900'>{selectedTest.scheduledTime}</span>
                  </div>
                  {selectedTest.completedTime && (
                    <div className='flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg'>
                      <span className='text-sm font-semibold text-gray-600'>Completed Time</span>
                      <span className='font-semibold text-green-700'>{selectedTest.completedTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Images */}
              {selectedTest.images && selectedTest.images.length > 0 && (
                <div>
                  <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    <ImageIcon className='h-5 w-5 text-purple-600' />
                    Uploaded Images ({selectedTest.images.length})
                  </h4>
                  <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
                    {selectedTest.images.map((img, idx) => (
                      <div key={idx} className='flex items-center justify-between p-2 bg-white border border-gray-200 rounded mb-2 last:mb-0'>
                        <div className='flex items-center gap-2'>
                          <ImageIcon className='h-4 w-4 text-purple-600' />
                          <span className='text-sm font-medium text-gray-900'>{img}</span>
                        </div>
                        <Button size='sm' variant='outline' className='text-xs'>
                          <Download className='h-3 w-3' />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technician Notes */}
              {selectedTest.technicianNotes && (
                <div>
                  <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    <FileText className='h-5 w-5 text-purple-600' />
                    Technician Notes
                  </h4>
                  <div className='p-4 bg-amber-50 border border-amber-200 rounded-lg'>
                    <p className='text-sm text-gray-700'>{selectedTest.technicianNotes}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedTest.notes && (
                <div>
                  <h4 className='font-bold text-gray-900 mb-3'>Request Notes</h4>
                  <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
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
            </div>
          </div>
        </div>
      )}

      {/* Upload Results Modal */}
      {showUploadModal && selectedTest && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-green-400 max-w-2xl w-full'>
            <div className='p-6 border-b-2 border-gray-200 bg-green-50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-green-600 rounded-lg'>
                    <Upload className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>Upload Scan Results</h3>
                    <p className='text-sm text-gray-600'>{selectedTest.id} - {selectedTest.testName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowUploadModal(false)
                    setUploadForm({ images: [], technicianNotes: '' })
                    setSelectedTest(null)
                  }}
                  className='text-gray-400 hover:text-gray-600 transition-colors'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Upload Images Panel */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <ImageIcon className='h-5 w-5 text-green-600' />
                  Upload Scan Images
                </h4>
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer'>
                  <Upload className='h-12 w-12 text-gray-400 mx-auto mb-3' />
                  <p className='text-sm font-semibold text-gray-700 mb-1'>Click to upload or drag and drop</p>
                  <p className='text-xs text-gray-500'>DICOM, PNG, JPEG files (max 100MB)</p>
                  <Button className='mt-4 bg-green-600 hover:bg-green-700 text-white'>
                    <ImageIcon className='h-4 w-4 mr-2' />
                    Browse Files
                  </Button>
                </div>
                
                {uploadForm.images.length > 0 && (
                  <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-lg'>
                    <p className='text-sm font-semibold text-green-700 mb-2'>
                      {uploadForm.images.length} file(s) ready to upload
                    </p>
                  </div>
                )}
              </div>

              {/* Technician Notes */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <FileText className='h-5 w-5 text-green-600' />
                  Add Technician Notes <span className='text-red-500'>*</span>
                </h4>
                <textarea
                  placeholder='Enter detailed observations, image quality, contrast used, any abnormalities detected, recommendations...'
                  value={uploadForm.technicianNotes}
                  onChange={(e) => setUploadForm({...uploadForm, technicianNotes: e.target.value})}
                  rows={6}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-medium'
                />
                <p className='text-xs text-gray-500 mt-2'>
                  Include image quality assessment, contrast administration, positioning, and any findings
                </p>
              </div>

              {/* Patient Info Summary */}
              <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <h5 className='font-semibold text-gray-900 mb-2'>Patient Information</h5>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div>
                    <span className='text-gray-600'>Patient: </span>
                    <span className='font-semibold'>{selectedTest.patientName}</span>
                  </div>
                  <div>
                    <span className='text-gray-600'>ID: </span>
                    <span className='font-semibold'>{selectedTest.patientId}</span>
                  </div>
                  <div>
                    <span className='text-gray-600'>Scan: </span>
                    <span className='font-semibold'>{selectedTest.scanType}</span>
                  </div>
                  <div>
                    <span className='text-gray-600'>Body Part: </span>
                    <span className='font-semibold'>{selectedTest.bodyPart}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-6 border-t-2 border-gray-200 flex justify-end gap-3 bg-gray-50'>
              <Button
                onClick={() => {
                  setShowUploadModal(false)
                  setUploadForm({ images: [], technicianNotes: '' })
                  setSelectedTest(null)
                }}
                variant='outline'
                className='border-gray-300'
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitUpload}
                className='bg-green-600 hover:bg-green-700 text-white'
              >
                <CheckCircle className='h-4 w-4 mr-2' />
                Mark Completed & Upload
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Test Order Modal */}
      {showNewTestModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-purple-400 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b-2 border-gray-200 bg-purple-50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-purple-600 rounded-lg'>
                    <Camera className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>New Scan Order</h3>
                    <p className='text-sm text-gray-600'>Schedule a new radiology scan</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowNewTestModal(false)
                    setNewTestForm({
                      patientId: '',
                      patientName: '',
                      scanType: '',
                      testName: '',
                      priority: 'normal',
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
                  <User className='h-5 w-5 text-purple-600' />
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

              {/* Scan Details */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <Scan className='h-5 w-5 text-purple-600' />
                  Scan Details
                </h4>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Scan Type <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={newTestForm.scanType}
                      onChange={(e) => setNewTestForm({...newTestForm, scanType: e.target.value})}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium'
                    >
                      <option value=''>Select scan type...</option>
                      <option value='X-Ray'>X-Ray</option>
                      <option value='MRI'>MRI</option>
                      <option value='CT'>CT Scan</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Test Name <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={newTestForm.testName}
                      onChange={(e) => setNewTestForm({...newTestForm, testName: e.target.value})}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium'
                    >
                      <option value=''>Select test name...</option>
                      <optgroup label='X-Ray'>
                        <option value='Chest X-Ray'>Chest X-Ray</option>
                        <option value='Knee X-Ray'>Knee X-Ray</option>
                        <option value='Spine X-Ray'>Spine X-Ray</option>
                        <option value='Hand X-Ray'>Hand X-Ray</option>
                        <option value='Abdomen X-Ray'>Abdomen X-Ray</option>
                      </optgroup>
                      <optgroup label='MRI'>
                        <option value='Brain MRI'>Brain MRI</option>
                        <option value='Spine MRI'>Spine MRI</option>
                        <option value='Knee MRI'>Knee MRI</option>
                        <option value='Shoulder MRI'>Shoulder MRI</option>
                        <option value='Cardiac MRI'>Cardiac MRI</option>
                      </optgroup>
                      <optgroup label='CT Scan'>
                        <option value='Abdominal CT Scan'>Abdominal CT Scan</option>
                        <option value='Chest CT Scan'>Chest CT Scan</option>
                        <option value='Head CT Scan'>Head CT Scan</option>
                        <option value='Cardiac CT Angiography'>Cardiac CT Angiography</option>
                        <option value='Pelvic CT Scan'>Pelvic CT Scan</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Priority <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={newTestForm.priority}
                      onChange={(e) => setNewTestForm({...newTestForm, priority: e.target.value})}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium'
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
                      placeholder='Add any special instructions, symptoms, or clinical history...'
                      value={newTestForm.notes}
                      onChange={(e) => setNewTestForm({...newTestForm, notes: e.target.value})}
                      rows={3}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium'
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
                    scanType: '',
                    testName: '',
                    priority: 'normal',
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
                className='bg-purple-600 hover:bg-purple-700 text-white'
              >
                <Camera className='h-4 w-4 mr-2' />
                Create Scan Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
