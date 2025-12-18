'use client'
import { useState } from 'react'
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Beaker,
  Microscope,
  Stethoscope,
  Heart,
  Brain,
  Droplet,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Tests() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [selectedTest, setSelectedTest] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Sample test results data
  const [tests, setTests] = useState([
    {
      id: 'TR-001',
      testName: 'Complete Blood Count (CBC)',
      category: 'Hematology',
      date: '2024-12-18',
      time: '10:30 AM',
      status: 'completed',
      doctor: 'Dr. Anjali Mehta',
      lab: 'Pathology Lab',
      results: {
        hemoglobin: { value: '14.5', unit: 'g/dL', normal: '13.5-17.5', status: 'normal' },
        wbc: { value: '7.2', unit: '10³/µL', normal: '4.0-11.0', status: 'normal' },
        rbc: { value: '5.1', unit: '10⁶/µL', normal: '4.5-5.9', status: 'normal' },
        platelets: { value: '250', unit: '10³/µL', normal: '150-400', status: 'normal' }
      },
      notes: 'All parameters within normal range. No abnormalities detected.'
    },
    {
      id: 'TR-002',
      testName: 'Lipid Profile',
      category: 'Biochemistry',
      date: '2024-12-17',
      time: '09:15 AM',
      status: 'completed',
      doctor: 'Dr. Rajesh Kumar',
      lab: 'Clinical Biochemistry',
      results: {
        totalCholesterol: { value: '195', unit: 'mg/dL', normal: '<200', status: 'normal' },
        hdl: { value: '55', unit: 'mg/dL', normal: '>40', status: 'normal' },
        ldl: { value: '110', unit: 'mg/dL', normal: '<100', status: 'high' },
        triglycerides: { value: '150', unit: 'mg/dL', normal: '<150', status: 'normal' }
      },
      notes: 'LDL cholesterol slightly elevated. Recommend dietary modifications and follow-up in 3 months.'
    },
    {
      id: 'TR-003',
      testName: 'Blood Sugar (Fasting)',
      category: 'Biochemistry',
      date: '2024-12-16',
      time: '08:00 AM',
      status: 'completed',
      doctor: 'Dr. Priya Sharma',
      lab: 'Clinical Biochemistry',
      results: {
        glucose: { value: '95', unit: 'mg/dL', normal: '70-100', status: 'normal' }
      },
      notes: 'Fasting blood sugar within normal limits.'
    },
    {
      id: 'TR-004',
      testName: 'Thyroid Function Test (TFT)',
      category: 'Endocrinology',
      date: '2024-12-15',
      time: '11:45 AM',
      status: 'completed',
      doctor: 'Dr. Arun Patel',
      lab: 'Endocrinology Lab',
      results: {
        tsh: { value: '2.8', unit: 'mIU/L', normal: '0.5-5.0', status: 'normal' },
        t3: { value: '1.2', unit: 'ng/mL', normal: '0.8-2.0', status: 'normal' },
        t4: { value: '8.5', unit: 'µg/dL', normal: '5.0-12.0', status: 'normal' }
      },
      notes: 'Thyroid function is normal. No evidence of hypothyroidism or hyperthyroidism.'
    },
    {
      id: 'TR-005',
      testName: 'Liver Function Test (LFT)',
      category: 'Biochemistry',
      date: '2024-12-14',
      time: '02:30 PM',
      status: 'completed',
      doctor: 'Dr. Sneha Reddy',
      lab: 'Clinical Biochemistry',
      results: {
        sgpt: { value: '32', unit: 'U/L', normal: '7-56', status: 'normal' },
        sgot: { value: '28', unit: 'U/L', normal: '5-40', status: 'normal' },
        bilirubin: { value: '0.9', unit: 'mg/dL', normal: '0.3-1.2', status: 'normal' },
        albumin: { value: '4.2', unit: 'g/dL', normal: '3.5-5.5', status: 'normal' }
      },
      notes: 'Liver function tests are within normal limits.'
    },
    {
      id: 'TR-006',
      testName: 'Kidney Function Test',
      category: 'Biochemistry',
      date: '2024-12-13',
      time: '10:00 AM',
      status: 'processing',
      doctor: 'Dr. Amit Singh',
      lab: 'Clinical Biochemistry',
      results: null,
      notes: null
    },
    {
      id: 'TR-007',
      testName: 'Urine Analysis',
      category: 'Pathology',
      date: '2024-12-19',
      time: '09:30 AM',
      status: 'processing',
      doctor: 'Dr. Kavita Reddy',
      lab: 'Pathology Lab',
      results: null,
      notes: null
    },
    {
      id: 'TR-008',
      testName: 'Vitamin D Test',
      category: 'Biochemistry',
      date: '2024-12-12',
      time: '03:15 PM',
      status: 'completed',
      doctor: 'Dr. Rajesh Kumar',
      lab: 'Clinical Biochemistry',
      results: {
        vitaminD: { value: '28', unit: 'ng/mL', normal: '30-100', status: 'low' }
      },
      notes: 'Vitamin D levels are below optimal range. Recommend supplementation and increased sun exposure.'
    }
  ])

  // Filter tests
  const filteredTests = tests.filter(test => {
    const matchesSearch = test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Calculate stats
  const completedTests = tests.filter(t => t.status === 'completed').length
  const processingTests = tests.filter(t => t.status === 'processing').length

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200'>
            <CheckCircle className='h-3.5 w-3.5' />
            Completed
          </span>
        )
      case 'processing':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200'>
            <Clock className='h-3.5 w-3.5' />
            Processing
          </span>
        )
      default:
        return null
    }
  }

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'hematology':
        return <Droplet className='h-5 w-5 text-red-500' />
      case 'biochemistry':
        return <Beaker className='h-5 w-5 text-blue-500' />
      case 'pathology':
        return <Microscope className='h-5 w-5 text-purple-500' />
      case 'endocrinology':
        return <Activity className='h-5 w-5 text-green-500' />
      case 'cardiology':
        return <Heart className='h-5 w-5 text-pink-500' />
      default:
        return <FileText className='h-5 w-5 text-gray-500' />
    }
  }

  // Handle view details
  const handleViewDetails = (test) => {
    setSelectedTest(test)
    setShowDetailsModal(true)
  }

  // Handle download report
  const handleDownloadReport = (test) => {
    if (test.status === 'completed') {
      alert(`Downloading report for ${test.testName}...`)
    } else {
      alert('Report is not available yet. Test is still processing.')
    }
  }

  // Get result status color
  const getResultStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200'
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className='flex-1 h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40'>
      <div className='h-full overflow-y-auto'>
        <div className='p-8 max-w-[1600px] mx-auto space-y-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <div className='bg-gradient-to-br from-blue-100 to-violet-100 p-3 rounded-xl'>
                <FileText className='h-6 w-6 text-blue-600' />
              </div>
              <div>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent'>
                  Test Results
                </h2>
                <p className='text-gray-500 text-sm'>View and download your lab reports</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className='flex gap-3 mb-6'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  placeholder='Search by test name...'
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
                    {filterStatus === 'all' ? 'All Status' : filterStatus === 'completed' ? 'Completed' : 'Processing'}
                  </span>
                </div>
              </Button>
              {showStatusDropdown && (
                <div className='absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden'>
                  {[
                    { value: 'all', label: 'All Status' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'processing', label: 'Processing' }
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
            {/* Total Tests */}
            <Card className='relative overflow-hidden bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 rounded-2xl group'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-gray-600 mb-2'>Total Tests</p>
                    <p className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1'>{tests.length}</p>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <FileText className='h-3 w-3' />
                      All lab tests
                    </p>
                  </div>
                  <div className='bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <FileText className='h-8 w-8 text-blue-600' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completed Tests */}
            <Card className='relative overflow-hidden bg-white border-2 border-violet-100 hover:border-violet-300 hover:shadow-2xl transition-all duration-300 rounded-2xl group'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-gray-600 mb-2'>Completed</p>
                    <p className='text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1'>{completedTests}</p>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <CheckCircle className='h-3 w-3' />
                      Reports ready
                    </p>
                  </div>
                  <div className='bg-gradient-to-br from-violet-100 via-violet-200 to-purple-200 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <CheckCircle className='h-8 w-8 text-violet-600' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Tests */}
            <Card className='relative overflow-hidden bg-white border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 rounded-2xl group'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-gray-600 mb-2'>Processing</p>
                    <p className='text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-1'>{processingTests}</p>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <Clock className='h-3 w-3' />
                      In progress
                    </p>
                  </div>
                  <div className='bg-gradient-to-br from-indigo-100 via-indigo-200 to-blue-200 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <Clock className='h-8 w-8 text-indigo-600' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Results List */}
          <div className='bg-white rounded-2xl shadow-sm border-2 border-violet-100 overflow-hidden'>
            <div className='p-6 border-b border-violet-100 bg-gradient-to-r from-blue-50 via-violet-50 to-indigo-50'>
              <h3 className='text-lg font-bold text-gray-900'>Your Test Results</h3>
              <p className='text-sm text-gray-600 mt-1'>
                {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Test Cards Grid */}
            <div className='p-6 grid grid-cols-1 lg:grid-cols-2 gap-4'>
              {filteredTests.map(test => (
                <Card key={test.id} className='group hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-violet-300 rounded-2xl overflow-hidden'>
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-start gap-3'>
                        <div className='bg-gradient-to-br from-blue-50 via-violet-50 to-indigo-50 p-3 rounded-xl border-2 border-violet-100'>
                          {getCategoryIcon(test.category)}
                        </div>
                        <div>
                          <h4 className='text-lg font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text group-hover:text-transparent transition-all'>
                            {test.testName}
                          </h4>
                          <p className='text-sm text-gray-500 mt-0.5'>{test.category}</p>
                          <div className='flex items-center gap-3 mt-2 text-xs text-gray-600'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-3.5 w-3.5' />
                              {test.date}
                            </div>
                            <div className='flex items-center gap-1'>
                              <Clock className='h-3.5 w-3.5' />
                              {test.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(test.status)}
                    </div>

                    <div className='bg-gradient-to-br from-blue-50 via-violet-50 to-indigo-50 rounded-xl p-4 mb-4 border border-violet-200'>
                      <div className='grid grid-cols-2 gap-3 text-sm'>
                        <div>
                          <p className='text-gray-500 text-xs'>Test ID</p>
                          <p className='font-semibold text-gray-900'>{test.id}</p>
                        </div>
                        <div>
                          <p className='text-gray-500 text-xs'>Doctor</p>
                          <p className='font-semibold text-gray-900'>{test.doctor}</p>
                        </div>
                        <div className='col-span-2'>
                          <p className='text-gray-500 text-xs'>Laboratory</p>
                          <p className='font-semibold text-gray-900'>{test.lab}</p>
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <Button
                        onClick={() => handleViewDetails(test)}
                        className='flex-1 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 hover:from-blue-600 hover:via-violet-600 hover:to-indigo-700 text-white shadow-sm'
                        size='sm'
                      >
                        <Eye className='h-4 w-4 mr-2' />
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleDownloadReport(test)}
                        disabled={test.status !== 'completed'}
                        variant='outline'
                        className='flex-1 border-2 border-violet-200 text-violet-700 hover:bg-violet-50 disabled:opacity-50'
                        size='sm'
                      >
                        <Download className='h-4 w-4 mr-2' />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTests.length === 0 && (
              <div className='text-center py-12 px-6'>
                <FileText className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                <p className='text-gray-500 font-medium'>No test results found</p>
                <p className='text-sm text-gray-400 mt-1'>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Test Details Modal */}
      {showDetailsModal && selectedTest && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300'>
            <div className='sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg'>
                    <FileText className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold text-gray-900'>{selectedTest.testName}</h3>
                    <p className='text-sm text-gray-500'>{selectedTest.category} • {selectedTest.id}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailsModal(false)} className='text-gray-400 hover:text-gray-600 transition-colors'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Test Info */}
              <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <div>
                    <p className='text-sm text-gray-600 mb-1'>Test Date</p>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-blue-600' />
                      <span className='font-semibold text-gray-900'>{selectedTest.date}</span>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 mb-1'>Test Time</p>
                    <div className='flex items-center gap-2'>
                      <Clock className='h-4 w-4 text-blue-600' />
                      <span className='font-semibold text-gray-900'>{selectedTest.time}</span>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 mb-1'>Status</p>
                    {getStatusBadge(selectedTest.status)}
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 mb-1'>Doctor</p>
                    <span className='font-semibold text-gray-900'>{selectedTest.doctor}</span>
                  </div>
                </div>
              </div>

              {/* Test Results */}
              {selectedTest.status === 'completed' && selectedTest.results ? (
                <div>
                  <h4 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    <div className='w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full'></div>
                    Test Results
                  </h4>
                  <div className='space-y-3'>
                    {Object.entries(selectedTest.results).map(([key, result]) => (
                      <div key={key} className='bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow'>
                        <div className='flex items-center justify-between'>
                          <div className='flex-1'>
                            <h5 className='font-semibold text-gray-900 capitalize mb-1'>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h5>
                            <p className='text-sm text-gray-500'>Normal Range: {result.normal}</p>
                          </div>
                          <div className='text-right'>
                            <p className='text-2xl font-bold text-gray-900'>
                              {result.value}
                              <span className='text-sm font-normal text-gray-500 ml-1'>{result.unit}</span>
                            </p>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border mt-1 ${getResultStatusColor(result.status)}`}>
                              {result.status === 'normal' ? <CheckCircle className='h-3 w-3' /> : <AlertCircle className='h-3 w-3' />}
                              {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='bg-orange-50 border border-orange-200 rounded-xl p-6'>
                  <div className='flex items-center gap-3'>
                    <Clock className='h-8 w-8 text-orange-600' />
                    <div>
                      <h4 className='font-semibold text-orange-900'>Test in Progress</h4>
                      <p className='text-sm text-orange-700 mt-1'>
                        Your test is being processed. Results will be available soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Doctor's Notes */}
              {selectedTest.notes && (
                <div>
                  <h4 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    <div className='w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full'></div>
                    Doctor's Notes
                  </h4>
                  <div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200'>
                    <p className='text-gray-700 leading-relaxed'>{selectedTest.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className='sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl flex gap-3 justify-end'>
              <Button 
                onClick={() => setShowDetailsModal(false)} 
                variant='outline'
                className='border-gray-300 text-gray-700 hover:bg-gray-50'
              >
                Close
              </Button>
              {selectedTest.status === 'completed' && (
                <Button 
                  onClick={() => handleDownloadReport(selectedTest)}
                  className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white'
                >
                  <Download className='h-4 w-4 mr-2' />
                  Download Report
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
