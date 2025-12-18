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
  Plus,
  Calendar,
  User,
  Eye,
  X,
  FileText,
  Beaker,
  Thermometer,
  Edit,
  Save,
  FlaskConical,
  AlertTriangle,
  Package
} from 'lucide-react'

export default function PathologyTests() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterStorage, setFilterStorage] = useState('all')
  const [selectedTest, setSelectedTest] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [showNewTestModal, setShowNewTestModal] = useState(false)
  const [newTestForm, setNewTestForm] = useState({
    patientId: '',
    patientName: '',
    testType: '',
    sampleType: '',
    priority: 'normal',
    notes: ''
  })

  const [testResults, setTestResults] = useState([
    { parameter: 'Hemoglobin', value: '', normalRange: '13.5-17.5 g/dL', unit: 'g/dL' },
    { parameter: 'RBC Count', value: '', normalRange: '4.5-5.5 million/µL', unit: 'million/µL' },
    { parameter: 'WBC Count', value: '', normalRange: '4,000-11,000/µL', unit: '/µL' },
    { parameter: 'Platelet Count', value: '', normalRange: '150,000-400,000/µL', unit: '/µL' }
  ])

  // Sample pathology test data
  const [tests, setTests] = useState([
    {
      id: 'PATH-001',
      sampleId: 'SMP-2025-001',
      patientId: 'PT-1001',
      patientName: 'John Anderson',
      testType: 'Histopathology',
      sampleType: 'Tissue Biopsy',
      collectionTime: '2025-01-15 09:00 AM',
      status: 'collected',
      storageStatus: 'refrigerated',
      processingStage: 'Sample Collection',
      priority: 'normal',
      technician: 'Priyasha Das',
      notes: 'Liver tissue sample'
    },
    {
      id: 'PATH-002',
      sampleId: 'SMP-2025-002',
      patientId: 'PT-1002',
      patientName: 'Sarah Williams',
      testType: 'Cytopathology',
      sampleType: 'Pap Smear',
      collectionTime: '2025-01-15 08:30 AM',
      status: 'processing',
      storageStatus: 'room-temp',
      processingStage: 'Microscopic Examination',
      priority: 'urgent',
      technician: 'Priyasha Das',
      notes: 'URGENT - Abnormal cells suspected',
      results: [
        { parameter: 'Cell Morphology', value: 'Abnormal', normalRange: 'Normal', isAbnormal: true },
        { parameter: 'Nuclear Changes', value: 'Present', normalRange: 'Absent', isAbnormal: true }
      ]
    },
    {
      id: 'PATH-003',
      sampleId: 'SMP-2025-003',
      patientId: 'PT-1003',
      patientName: 'Michael Brown',
      testType: 'Clinical Pathology',
      sampleType: 'Blood Sample',
      collectionTime: '2025-01-14 02:00 PM',
      status: 'completed',
      storageStatus: 'frozen',
      processingStage: 'Report Generation',
      priority: 'normal',
      technician: 'Priyasha Das',
      completedTime: '2025-01-14 05:30 PM',
      notes: 'Complete blood analysis',
      results: [
        { parameter: 'Hemoglobin', value: '14.5', normalRange: '13.5-17.5 g/dL', unit: 'g/dL', isAbnormal: false },
        { parameter: 'WBC Count', value: '7500', normalRange: '4,000-11,000/µL', unit: '/µL', isAbnormal: false },
        { parameter: 'RBC Count', value: '5.0', normalRange: '4.5-5.5 million/µL', unit: 'million/µL', isAbnormal: false }
      ]
    },
    {
      id: 'PATH-004',
      sampleId: 'SMP-2025-004',
      patientId: 'PT-1004',
      patientName: 'Emily Davis',
      testType: 'Immunopathology',
      sampleType: 'Serum',
      collectionTime: '2025-01-15 10:30 AM',
      status: 'processing',
      storageStatus: 'frozen',
      processingStage: 'Immunoassay Testing',
      priority: 'high',
      technician: 'Priyasha Das',
      notes: 'Autoimmune markers'
    },
    {
      id: 'PATH-005',
      sampleId: 'SMP-2025-005',
      patientId: 'PT-1005',
      patientName: 'Robert Johnson',
      testType: 'Molecular Pathology',
      sampleType: 'DNA Sample',
      collectionTime: '2025-01-15 09:45 AM',
      status: 'collected',
      storageStatus: 'frozen',
      processingStage: 'Sample Collection',
      priority: 'normal',
      technician: 'Priyasha Das',
      notes: 'Genetic testing'
    },
    {
      id: 'PATH-006',
      sampleId: 'SMP-2025-006',
      patientId: 'PT-1006',
      patientName: 'Jennifer Martinez',
      testType: 'Hematopathology',
      sampleType: 'Bone Marrow',
      collectionTime: '2025-01-14 11:00 AM',
      status: 'completed',
      storageStatus: 'refrigerated',
      processingStage: 'Report Generation',
      priority: 'urgent',
      technician: 'Priyasha Das',
      completedTime: '2025-01-14 04:00 PM',
      notes: 'Leukemia screening',
      results: [
        { parameter: 'Blast Cells', value: '15%', normalRange: '<5%', unit: '%', isAbnormal: true },
        { parameter: 'Cellularity', value: 'Hypercellular', normalRange: 'Normocellular', isAbnormal: true }
      ]
    }
  ])

  const getStatusBadge = (status) => {
    const badges = {
      collected: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-300',
        icon: Package
      },
      processing: {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        border: 'border-orange-300',
        icon: Beaker
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
        {status.charAt(0).toUpperCase() + status.slice(1)}
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

  const getStorageBadge = (storage) => {
    const badges = {
      'room-temp': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: Thermometer, label: 'Room Temp' },
      refrigerated: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', icon: Thermometer, label: 'Refrigerated' },
      frozen: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300', icon: Thermometer, label: 'Frozen' }
    }

    const badge = badges[storage]
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        <Icon className='h-3 w-3' />
        {badge.label}
      </span>
    )
  }

  const filteredTests = tests.filter(test => {
    const matchesSearch = 
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.sampleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus
    const matchesStorage = filterStorage === 'all' || test.storageStatus === filterStorage
    
    return matchesSearch && matchesStatus && matchesStorage
  })

  const handleStartProcessing = (test) => {
    setTests(tests.map(t => 
      t.id === test.id ? { ...t, status: 'processing', processingStage: 'Sample Preparation' } : t
    ))
  }

  const handleEnterResults = (test) => {
    setSelectedTest(test)
    setShowResultsModal(true)
    // Initialize results based on test type
    if (test.results && test.results.length > 0) {
      setTestResults(test.results.map(r => ({ ...r })))
    }
  }

  const handleSaveResults = () => {
    const hasValues = testResults.some(r => r.value !== '')
    if (!hasValues) {
      alert('Please enter at least one test result')
      return
    }

    // Check for abnormal values
    const resultsWithFlags = testResults.map(r => {
      if (r.value === '') return r
      
      const value = parseFloat(r.value)
      const range = r.normalRange.match(/[\d.]+/g)
      
      if (range && range.length >= 2) {
        const min = parseFloat(range[0])
        const max = parseFloat(range[1])
        return { ...r, isAbnormal: value < min || value > max }
      }
      
      return r
    }).filter(r => r.value !== '')

    setTests(tests.map(t => 
      t.id === selectedTest.id ? { 
        ...t, 
        status: 'completed',
        processingStage: 'Report Generation',
        completedTime: new Date().toLocaleString(),
        results: resultsWithFlags
      } : t
    ))
    
    setShowResultsModal(false)
    setTestResults([
      { parameter: 'Hemoglobin', value: '', normalRange: '13.5-17.5 g/dL', unit: 'g/dL' },
      { parameter: 'RBC Count', value: '', normalRange: '4.5-5.5 million/µL', unit: 'million/µL' },
      { parameter: 'WBC Count', value: '', normalRange: '4,000-11,000/µL', unit: '/µL' },
      { parameter: 'Platelet Count', value: '', normalRange: '150,000-400,000/µL', unit: '/µL' }
    ])
    setSelectedTest(null)
  }

  const handleCreateNewTest = () => {
    if (!newTestForm.patientId || !newTestForm.patientName || !newTestForm.testType || !newTestForm.sampleType) {
      alert('Please fill in all required fields')
      return
    }

    const newTest = {
      id: `PATH-${String(tests.length + 1).padStart(3, '0')}`,
      sampleId: `SMP-2025-${String(tests.length + 1).padStart(3, '0')}`,
      patientId: newTestForm.patientId,
      patientName: newTestForm.patientName,
      testType: newTestForm.testType,
      sampleType: newTestForm.sampleType,
      collectionTime: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      status: 'collected',
      storageStatus: 'room-temp',
      processingStage: 'Sample Collection',
      priority: newTestForm.priority,
      technician: 'Priyasha Das',
      notes: newTestForm.notes
    }

    setTests([newTest, ...tests])
    setShowNewTestModal(false)
    setNewTestForm({
      patientId: '',
      patientName: '',
      testType: '',
      sampleType: '',
      priority: 'normal',
      notes: ''
    })
  }

  const stats = {
    total: tests.length,
    collected: tests.filter(t => t.status === 'collected').length,
    processing: tests.filter(t => t.status === 'processing').length,
    completed: tests.filter(t => t.status === 'completed').length,
    urgent: tests.filter(t => t.priority === 'urgent').length
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 to-white p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-teal-100 rounded-xl'>
                <Beaker className='h-8 w-8 text-teal-600' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>Pathology Tests</h1>
                <p className='text-gray-600'>Sample-based tests and analysis</p>
              </div>
            </div>
            <Button 
              className='bg-teal-600 hover:bg-teal-700 text-white'
              onClick={() => setShowNewTestModal(true)}
            >
              <FlaskConical className='h-4 w-4 mr-2' />
              New Sample
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-8'>
          <div className='bg-white border-2 border-teal-200 rounded-xl p-4 hover:border-teal-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Total Samples</p>
                <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
              </div>
              <Beaker className='h-8 w-8 text-teal-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Collected</p>
                <p className='text-2xl font-bold text-blue-600'>{stats.collected}</p>
              </div>
              <Package className='h-8 w-8 text-blue-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Processing</p>
                <p className='text-2xl font-bold text-orange-600'>{stats.processing}</p>
              </div>
              <Beaker className='h-8 w-8 text-orange-600' />
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
            <Filter className='h-5 w-5 text-teal-600' />
            <h3 className='text-lg font-bold text-gray-900'>Filters & Search</h3>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                placeholder='Search by Sample ID, Patient ID, or Test Type...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 border-gray-300'
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium'
            >
              <option value='all'>All Status</option>
              <option value='collected'>Collected</option>
              <option value='processing'>Processing</option>
              <option value='completed'>Completed</option>
            </select>

            {/* Storage Filter */}
            <select
              value={filterStorage}
              onChange={(e) => setFilterStorage(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium'
            >
              <option value='all'>All Storage</option>
              <option value='room-temp'>Room Temperature</option>
              <option value='refrigerated'>Refrigerated</option>
              <option value='frozen'>Frozen</option>
            </select>
          </div>
        </div>

        {/* Tests Table */}
        <div className='bg-white border-2 border-gray-200 rounded-xl overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-teal-50 border-b-2 border-teal-200'>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Sample ID</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Patient Info</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Test Type</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Collection Time</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Storage</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Processing Stage</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredTests.map((test) => (
                  <tr 
                    key={test.id} 
                    className={`hover:bg-teal-50 transition-colors ${
                      test.priority === 'urgent' ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <FlaskConical className='h-4 w-4 text-teal-600' />
                        <div>
                          <p className='font-mono font-semibold text-teal-600'>{test.sampleId}</p>
                          <p className='text-xs text-gray-600'>{test.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <User className='h-4 w-4 text-gray-400' />
                        <div>
                          <p className='font-semibold text-gray-900'>{test.patientName}</p>
                          <p className='text-xs text-gray-600'>{test.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='font-medium text-gray-900'>{test.testType}</p>
                        <p className='text-xs text-gray-600'>{test.sampleType}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <Calendar className='h-4 w-4' />
                        {test.collectionTime}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStorageBadge(test.storageStatus)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2'>
                        <div className='h-2 w-2 rounded-full bg-teal-500'></div>
                        <span className='text-sm font-medium text-gray-700'>{test.processingStage}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(test.status)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        {test.status === 'collected' && (
                          <Button
                            size='sm'
                            onClick={() => handleStartProcessing(test)}
                            className='bg-teal-600 hover:bg-teal-700 text-white'
                          >
                            <Beaker className='h-3.5 w-3.5 mr-1' />
                            Start
                          </Button>
                        )}
                        {test.status === 'processing' && (
                          <Button
                            size='sm'
                            onClick={() => handleEnterResults(test)}
                            className='bg-green-600 hover:bg-green-700 text-white'
                          >
                            <Edit className='h-3.5 w-3.5 mr-1' />
                            Results
                          </Button>
                        )}
                        {test.status === 'completed' && test.results && (
                          <Button
                            size='sm'
                            variant='outline'
                            className='border-green-300 text-green-600 hover:bg-green-50'
                            onClick={() => {
                              setSelectedTest(test)
                              setShowDetailsModal(true)
                            }}
                          >
                            <FileText className='h-3.5 w-3.5 mr-1' />
                            View
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTests.length === 0 && (
            <div className='text-center py-12'>
              <Beaker className='h-16 w-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-gray-900 mb-2'>No Tests Found</h3>
              <p className='text-gray-600'>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Results Entry Modal */}
      {showResultsModal && selectedTest && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-green-400 max-w-3xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b-2 border-gray-200 bg-green-50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-green-600 rounded-lg'>
                    <Edit className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>Enter Test Results</h3>
                    <p className='text-sm text-gray-600'>{selectedTest.sampleId} - {selectedTest.testType}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowResultsModal(false)
                    setSelectedTest(null)
                  }}
                  className='text-gray-400 hover:text-gray-600 transition-colors'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Patient Info */}
              <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <h5 className='font-semibold text-gray-900 mb-2'>Patient Information</h5>
                <div className='grid grid-cols-3 gap-2 text-sm'>
                  <div>
                    <span className='text-gray-600'>Patient: </span>
                    <span className='font-semibold'>{selectedTest.patientName}</span>
                  </div>
                  <div>
                    <span className='text-gray-600'>ID: </span>
                    <span className='font-semibold'>{selectedTest.patientId}</span>
                  </div>
                  <div>
                    <span className='text-gray-600'>Sample: </span>
                    <span className='font-semibold'>{selectedTest.sampleType}</span>
                  </div>
                </div>
              </div>

              {/* Results Entry Table */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <FileText className='h-5 w-5 text-green-600' />
                  Test Parameters
                </h4>
                <div className='border-2 border-gray-200 rounded-lg overflow-hidden'>
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-gray-50 border-b-2 border-gray-200'>
                        <th className='px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase'>Parameter Name</th>
                        <th className='px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase'>Observed Value</th>
                        <th className='px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase'>Unit</th>
                        <th className='px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase'>Normal Range</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {testResults.map((result, index) => (
                        <tr key={index} className='hover:bg-gray-50'>
                          <td className='px-4 py-3'>
                            <Input
                              value={result.parameter}
                              onChange={(e) => {
                                const newResults = [...testResults]
                                newResults[index].parameter = e.target.value
                                setTestResults(newResults)
                              }}
                              className='border-gray-300 font-semibold'
                              placeholder='Parameter name'
                            />
                          </td>
                          <td className='px-4 py-3'>
                            <Input
                              value={result.value}
                              onChange={(e) => {
                                const newResults = [...testResults]
                                newResults[index].value = e.target.value
                                setTestResults(newResults)
                              }}
                              className='border-gray-300'
                              placeholder='Enter value'
                            />
                          </td>
                          <td className='px-4 py-3'>
                            <Input
                              value={result.unit || ''}
                              onChange={(e) => {
                                const newResults = [...testResults]
                                newResults[index].unit = e.target.value
                                setTestResults(newResults)
                              }}
                              className='border-gray-300'
                              placeholder='Unit'
                            />
                          </td>
                          <td className='px-4 py-3'>
                            <Input
                              value={result.normalRange}
                              onChange={(e) => {
                                const newResults = [...testResults]
                                newResults[index].normalRange = e.target.value
                                setTestResults(newResults)
                              }}
                              className='border-gray-300 text-sm'
                              placeholder='Normal range'
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Parameter Button */}
                <Button
                  onClick={() => {
                    setTestResults([...testResults, { parameter: '', value: '', normalRange: '', unit: '' }])
                  }}
                  variant='outline'
                  className='mt-3 border-teal-300 text-teal-600 hover:bg-teal-50'
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Add Parameter
                </Button>
              </div>

              {/* Info Box */}
              <div className='p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3'>
                <AlertTriangle className='h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5' />
                <div>
                  <p className='text-sm font-semibold text-amber-900'>Auto-Flag Feature</p>
                  <p className='text-xs text-amber-700'>Values outside the normal range will be automatically flagged as abnormal when saved.</p>
                </div>
              </div>
            </div>

            <div className='p-6 border-t-2 border-gray-200 flex justify-end gap-3 bg-gray-50'>
              <Button
                onClick={() => {
                  setShowResultsModal(false)
                  setSelectedTest(null)
                }}
                variant='outline'
                className='border-gray-300'
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveResults}
                className='bg-green-600 hover:bg-green-700 text-white'
              >
                <Save className='h-4 w-4 mr-2' />
                Save Results & Complete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Test Details Modal */}
      {showDetailsModal && selectedTest && !showResultsModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-teal-400 max-w-3xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b-2 border-gray-200 bg-teal-50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-teal-600 rounded-lg'>
                    <Beaker className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>Sample Details</h3>
                    <p className='text-sm text-gray-600'>{selectedTest.sampleId}</p>
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
                  <User className='h-5 w-5 text-teal-600' />
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

              {/* Sample Management */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <FlaskConical className='h-5 w-5 text-teal-600' />
                  Sample Management
                </h4>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-xs font-semibold text-gray-600'>Sample ID</p>
                    <p className='font-semibold text-gray-900'>{selectedTest.sampleId}</p>
                  </div>
                  <div className='p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-xs font-semibold text-gray-600'>Test Type</p>
                    <p className='font-semibold text-gray-900'>{selectedTest.testType}</p>
                  </div>
                  <div className='p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-xs font-semibold text-gray-600'>Sample Type</p>
                    <p className='font-semibold text-gray-900'>{selectedTest.sampleType}</p>
                  </div>
                  <div className='p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-xs font-semibold text-gray-600'>Collection Time</p>
                    <p className='font-semibold text-gray-900'>{selectedTest.collectionTime}</p>
                  </div>
                  <div className='p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-xs font-semibold text-gray-600 mb-2'>Storage Status</p>
                    {getStorageBadge(selectedTest.storageStatus)}
                  </div>
                  <div className='p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-xs font-semibold text-gray-600'>Processing Stage</p>
                    <p className='font-semibold text-gray-900'>{selectedTest.processingStage}</p>
                  </div>
                  <div className='p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-xs font-semibold text-gray-600 mb-2'>Status</p>
                    {getStatusBadge(selectedTest.status)}
                  </div>
                  <div className='p-3 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-xs font-semibold text-gray-600 mb-2'>Priority</p>
                    {getPriorityBadge(selectedTest.priority)}
                  </div>
                </div>
              </div>

              {/* Test Results */}
              {selectedTest.results && selectedTest.results.length > 0 && (
                <div>
                  <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    <FileText className='h-5 w-5 text-teal-600' />
                    Test Results
                  </h4>
                  <div className='border-2 border-gray-200 rounded-lg overflow-hidden'>
                    <table className='w-full'>
                      <thead>
                        <tr className='bg-gray-50 border-b-2 border-gray-200'>
                          <th className='px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase'>Parameter</th>
                          <th className='px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase'>Value</th>
                          <th className='px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase'>Normal Range</th>
                          <th className='px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase'>Status</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {selectedTest.results.map((result, index) => (
                          <tr key={index} className={result.isAbnormal ? 'bg-red-50' : ''}>
                            <td className='px-4 py-3 font-semibold text-gray-900'>{result.parameter}</td>
                            <td className='px-4 py-3'>
                              <span className={`font-bold ${result.isAbnormal ? 'text-red-600' : 'text-gray-900'}`}>
                                {result.value} {result.unit || ''}
                              </span>
                            </td>
                            <td className='px-4 py-3 text-sm text-gray-600'>{result.normalRange}</td>
                            <td className='px-4 py-3'>
                              {result.isAbnormal ? (
                                <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-300'>
                                  <AlertTriangle className='h-3 w-3' />
                                  Abnormal
                                </span>
                              ) : (
                                <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300'>
                                  <CheckCircle className='h-3 w-3' />
                                  Normal
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

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
            </div>
          </div>
        </div>
      )}

      {/* New Test Order Modal */}
      {showNewTestModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-teal-400 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b-2 border-gray-200 bg-teal-50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-teal-600 rounded-lg'>
                    <FlaskConical className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>New Sample Collection</h3>
                    <p className='text-sm text-gray-600'>Create a new pathology test order</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowNewTestModal(false)
                    setNewTestForm({
                      patientId: '',
                      patientName: '',
                      testType: '',
                      sampleType: '',
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
                  <User className='h-5 w-5 text-teal-600' />
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
                  <Beaker className='h-5 w-5 text-teal-600' />
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
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium'
                    >
                      <option value=''>Select test type...</option>
                      <option value='Histopathology'>Histopathology</option>
                      <option value='Cytopathology'>Cytopathology</option>
                      <option value='Clinical Pathology'>Clinical Pathology</option>
                      <option value='Immunopathology'>Immunopathology</option>
                      <option value='Molecular Pathology'>Molecular Pathology</option>
                      <option value='Hematopathology'>Hematopathology</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Sample Type <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={newTestForm.sampleType}
                      onChange={(e) => setNewTestForm({...newTestForm, sampleType: e.target.value})}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium'
                    >
                      <option value=''>Select sample type...</option>
                      <option value='Tissue Biopsy'>Tissue Biopsy</option>
                      <option value='Blood Sample'>Blood Sample</option>
                      <option value='Urine Sample'>Urine Sample</option>
                      <option value='Bone Marrow'>Bone Marrow</option>
                      <option value='Pap Smear'>Pap Smear</option>
                      <option value='Serum'>Serum</option>
                      <option value='DNA Sample'>DNA Sample</option>
                      <option value='Sputum'>Sputum</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Priority <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={newTestForm.priority}
                      onChange={(e) => setNewTestForm({...newTestForm, priority: e.target.value})}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium'
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
                      placeholder='Add any special instructions or clinical notes...'
                      value={newTestForm.notes}
                      onChange={(e) => setNewTestForm({...newTestForm, notes: e.target.value})}
                      rows={3}
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium'
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
                    sampleType: '',
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
                className='bg-teal-600 hover:bg-teal-700 text-white'
              >
                <FlaskConical className='h-4 w-4 mr-2' />
                Create Sample Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
