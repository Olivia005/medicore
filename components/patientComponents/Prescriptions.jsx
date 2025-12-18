'use client'
import { useState } from 'react'
import {
  Search,
  Filter,
  Download,
  Eye,
  Pill,
  Calendar,
  Clock,
  User,
  FileText,
  X,
  Stethoscope,
  Activity,
  ChevronDown,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPeriod, setFilterPeriod] = useState('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Sample prescriptions data
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'RX-2024-001',
      doctorName: 'Dr. Anjali Mehta',
      specialty: 'General Physician',
      date: '2024-12-18',
      time: '10:30 AM',
      diagnosis: 'Upper Respiratory Tract Infection',
      symptoms: 'Fever, cough, sore throat',
      medicines: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days', instructions: 'Take after meals' },
        { name: 'Paracetamol', dosage: '650mg', frequency: 'Three times daily', duration: '5 days', instructions: 'Take when needed for fever' },
        { name: 'Cough Syrup', dosage: '10ml', frequency: 'Twice daily', duration: '5 days', instructions: 'Take before bedtime' }
      ],
      notes: 'Rest well, drink plenty of fluids. Follow-up if symptoms persist after 7 days.',
      followUp: '2024-12-25'
    },
    {
      id: 'RX-2024-002',
      doctorName: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      date: '2024-12-15',
      time: '02:15 PM',
      diagnosis: 'Hypertension - Stage 1',
      symptoms: 'High blood pressure, occasional headaches',
      medicines: [
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: 'Ongoing', instructions: 'Take in the morning' },
        { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: 'Ongoing', instructions: 'Take after breakfast' }
      ],
      notes: 'Monitor blood pressure daily. Reduce salt intake. Regular exercise recommended.',
      followUp: '2025-01-15'
    },
    {
      id: 'RX-2024-003',
      doctorName: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      date: '2024-12-12',
      time: '11:00 AM',
      diagnosis: 'Eczema',
      symptoms: 'Itchy, dry skin patches on arms',
      medicines: [
        { name: 'Hydrocortisone Cream', dosage: '1%', frequency: 'Twice daily', duration: '14 days', instructions: 'Apply on affected areas' },
        { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '14 days', instructions: 'Take at bedtime' }
      ],
      notes: 'Avoid harsh soaps. Use moisturizer regularly. Avoid scratching affected areas.',
      followUp: '2024-12-26'
    },
    {
      id: 'RX-2024-004',
      doctorName: 'Dr. Arun Patel',
      specialty: 'Endocrinologist',
      date: '2024-12-08',
      time: '09:30 AM',
      diagnosis: 'Vitamin D Deficiency',
      symptoms: 'Fatigue, muscle weakness',
      medicines: [
        { name: 'Vitamin D3', dosage: '60,000 IU', frequency: 'Once weekly', duration: '8 weeks', instructions: 'Take after breakfast' },
        { name: 'Calcium Supplement', dosage: '500mg', frequency: 'Once daily', duration: 'Ongoing', instructions: 'Take with dinner' }
      ],
      notes: 'Increase sun exposure. Include vitamin D rich foods in diet. Retest after 8 weeks.',
      followUp: '2025-02-08'
    },
    {
      id: 'RX-2024-005',
      doctorName: 'Dr. Sneha Reddy',
      specialty: 'Gastroenterologist',
      date: '2024-11-28',
      time: '03:45 PM',
      diagnosis: 'Acid Reflux (GERD)',
      symptoms: 'Heartburn, acid regurgitation',
      medicines: [
        { name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take 30 minutes before breakfast' },
        { name: 'Antacid Syrup', dosage: '10ml', frequency: 'As needed', duration: '30 days', instructions: 'Take after meals if needed' }
      ],
      notes: 'Avoid spicy and oily foods. Eat smaller meals. Avoid lying down immediately after eating.',
      followUp: '2024-12-28'
    },
    {
      id: 'RX-2024-006',
      doctorName: 'Dr. Amit Singh',
      specialty: 'Orthopedic',
      date: '2024-11-15',
      time: '04:30 PM',
      diagnosis: 'Lower Back Pain',
      symptoms: 'Pain in lower back, stiffness',
      medicines: [
        { name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily', duration: '10 days', instructions: 'Take after meals' },
        { name: 'Muscle Relaxant', dosage: '5mg', frequency: 'At bedtime', duration: '7 days', instructions: 'May cause drowsiness' },
        { name: 'Pain Relief Gel', dosage: 'Apply', frequency: 'Three times daily', duration: '14 days', instructions: 'Apply on affected area' }
      ],
      notes: 'Avoid heavy lifting. Practice good posture. Start physiotherapy exercises.',
      followUp: '2024-11-25'
    }
  ])

  // Filter prescriptions
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesPeriod = true
    if (filterPeriod === 'recent') {
      const prescDate = new Date(prescription.date)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      matchesPeriod = prescDate >= thirtyDaysAgo
    } else if (filterPeriod === 'older') {
      const prescDate = new Date(prescription.date)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      matchesPeriod = prescDate < thirtyDaysAgo
    }
    
    return matchesSearch && matchesPeriod
  })

  // Calculate stats
  const totalPrescriptions = prescriptions.length
  const recentPrescriptions = prescriptions.filter(p => {
    const prescDate = new Date(p.date)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return prescDate >= thirtyDaysAgo
  }).length
  const activeMedications = prescriptions.filter(p => 
    p.medicines.some(m => m.duration === 'Ongoing')
  ).length

  // Handle view details
  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription)
    setShowDetailsModal(true)
  }

  // Handle download prescription
  const handleDownloadPrescription = (prescription) => {
    alert(`Downloading prescription ${prescription.id}...`)
  }

  return (
    <div className='flex-1 h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50/40 to-orange-50/30'>
      <div className='h-full overflow-y-auto'>
        <div className='p-8 max-w-[1600px] mx-auto space-y-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-4'>
              <div className='bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-4 rounded-2xl shadow-lg'>
                <Pill className='h-7 w-7 text-white' />
              </div>
              <div>
                <h2 className='text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent'>
                  My Prescriptions
                </h2>
                <p className='text-gray-600 text-sm mt-1 font-medium'>View and manage your medical prescriptions</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className='flex gap-4 mb-6'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400' />
                <Input
                  placeholder='Search by doctor name, diagnosis, or prescription ID...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-12 h-12 border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white shadow-sm rounded-xl text-gray-800'
                />
              </div>
            </div>
            
            {/* Period Filter */}
            <div className='relative'>
              <Button
                variant='outline'
                className='h-12 px-6 border-2 border-purple-200 bg-white hover:bg-purple-50 hover:border-purple-300 rounded-xl shadow-sm min-w-[200px] justify-between font-medium'
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <div className='flex items-center gap-2'>
                  <Filter className='h-4 w-4 text-purple-600' />
                  <span className='text-sm text-gray-800'>
                    {filterPeriod === 'all' ? 'All Period' : filterPeriod === 'recent' ? 'Recent (30 days)' : 'Older'}
                  </span>
                </div>
                <ChevronDown className='h-4 w-4 text-purple-600' />
              </Button>
              {showFilterDropdown && (
                <div className='absolute top-full mt-2 w-full bg-white border-2 border-purple-200 rounded-xl shadow-2xl z-10 overflow-hidden'>
                  {[
                    { value: 'all', label: 'All Period' },
                    { value: 'recent', label: 'Recent (30 days)' },
                    { value: 'older', label: 'Older' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterPeriod(option.value)
                        setShowFilterDropdown(false)
                      }}
                      className='w-full px-4 py-3 text-left text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-colors text-gray-700 font-medium'
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            {/* Total Prescriptions */}
            <Card className='relative overflow-hidden bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 rounded-2xl group'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-gray-600 mb-2'>Total Prescriptions</p>
                    <p className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1'>{totalPrescriptions}</p>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <FileText className='h-3 w-3' />
                      All prescriptions
                    </p>
                  </div>
                  <div className='bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <Pill className='h-8 w-8 text-blue-600' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Prescriptions */}
            <Card className='relative overflow-hidden bg-white border-2 border-violet-100 hover:border-violet-300 hover:shadow-2xl transition-all duration-300 rounded-2xl group'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-gray-600 mb-2'>Recent</p>
                    <p className='text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1'>{recentPrescriptions}</p>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <Clock className='h-3 w-3' />
                      Last 30 days
                    </p>
                  </div>
                  <div className='bg-gradient-to-br from-violet-100 via-violet-200 to-purple-200 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <Calendar className='h-8 w-8 text-violet-600' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Medications */}
            <Card className='relative overflow-hidden bg-white border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 rounded-2xl group'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-gray-600 mb-2'>Active Medications</p>
                    <p className='text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-1'>{activeMedications}</p>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <Activity className='h-3 w-3' />
                      Ongoing treatments
                    </p>
                  </div>
                  <div className='bg-gradient-to-br from-indigo-100 via-indigo-200 to-blue-200 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <Stethoscope className='h-8 w-8 text-indigo-600' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prescriptions List */}
          <div className='bg-white rounded-3xl shadow-xl border-2 border-purple-100 overflow-hidden'>
            <div className='p-6 border-b-2 border-purple-100 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400'>
              <h3 className='text-xl font-bold text-white'>Your Prescriptions</h3>
              <p className='text-sm text-purple-50 mt-1'>
                {filteredPrescriptions.length} prescription{filteredPrescriptions.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Prescription Cards Grid */}
            <div className='p-6 grid grid-cols-1 lg:grid-cols-2 gap-5'>
              {filteredPrescriptions.map(prescription => (
                <Card key={prescription.id} className='group hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 hover:border-pink-300 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-purple-50/30'>
                  <CardContent className='p-6'>
                    {/* Header */}
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-start gap-3'>
                        <div className='bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-3 rounded-xl shadow-md'>
                          <User className='h-5 w-5 text-white' />
                        </div>
                        <div>
                          <h4 className='text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors'>
                            {prescription.doctorName}
                          </h4>
                          <p className='text-sm text-gray-600 font-medium'>{prescription.specialty}</p>
                          <div className='flex items-center gap-3 mt-2 text-xs text-gray-500'>
                            <div className='flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-lg'>
                              <Calendar className='h-3.5 w-3.5' />
                              {prescription.date}
                            </div>
                            <div className='flex items-center gap-1 bg-pink-50 px-2 py-1 rounded-lg'>
                              <Clock className='h-3.5 w-3.5' />
                              {prescription.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className='text-xs font-bold text-gray-600 bg-gradient-to-br from-gray-100 to-gray-200 px-3 py-1.5 rounded-full border border-gray-300'>
                        {prescription.id}
                      </span>
                    </div>

                    {/* Diagnosis */}
                    <div className='bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-4 mb-4 border-2 border-rose-200'>
                      <div className='flex items-start gap-2'>
                        <AlertCircle className='h-5 w-5 text-rose-600 mt-0.5' />
                        <div>
                          <p className='text-xs font-bold text-rose-900 mb-1.5 uppercase tracking-wide'>Diagnosis</p>
                          <p className='text-sm font-bold text-gray-900'>{prescription.diagnosis}</p>
                        </div>
                      </div>
                    </div>

                    {/* Medicines */}
                    <div className='bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-xl p-4 mb-4 border-2 border-purple-200'>
                      <p className='text-xs font-bold text-purple-900 mb-3 uppercase tracking-wide'>Medicines Prescribed</p>
                      <div className='space-y-2.5'>
                        {prescription.medicines.slice(0, 3).map((medicine, index) => (
                          <div key={index} className='flex items-start gap-2 bg-white/60 p-2 rounded-lg'>
                            <Pill className='h-4 w-4 text-purple-600 mt-0.5' />
                            <div className='flex-1'>
                              <p className='text-sm font-bold text-gray-900'>{medicine.name}</p>
                              <p className='text-xs text-gray-600 font-medium'>{medicine.dosage} - {medicine.frequency}</p>
                            </div>
                          </div>
                        ))}
                        {prescription.medicines.length > 3 && (
                          <p className='text-xs text-purple-700 font-bold bg-purple-100 inline-block px-2 py-1 rounded-lg'>
                            +{prescription.medicines.length - 3} more medicine{prescription.medicines.length - 3 > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='flex gap-3'>
                      <Button
                        onClick={() => handleViewDetails(prescription)}
                        className='flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white shadow-md font-semibold'
                        size='sm'
                      >
                        <Eye className='h-4 w-4 mr-2' />
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleDownloadPrescription(prescription)}
                        variant='outline'
                        className='flex-1 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold'
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

            {filteredPrescriptions.length === 0 && (
              <div className='text-center py-16 px-6'>
                <div className='bg-gradient-to-br from-purple-100 to-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Pill className='h-12 w-12 text-purple-400' />
                </div>
                <p className='text-gray-700 font-bold text-lg'>No prescriptions found</p>
                <p className='text-sm text-gray-500 mt-2'>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prescription Details Modal */}
      {showDetailsModal && selectedPrescription && (
        <div className='fixed inset-0 bg-gradient-to-br from-black/70 to-purple-900/40 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-in fade-in duration-300'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 border-4 border-purple-200'>
            <div className='sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-6 rounded-t-3xl z-10'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-lg'>
                    <Pill className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold text-white'>Prescription Details</h3>
                    <p className='text-sm text-purple-100 font-medium'>{selectedPrescription.id}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailsModal(false)} className='text-white hover:text-purple-200 transition-colors bg-white/20 backdrop-blur-sm p-2 rounded-xl hover:bg-white/30'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Doctor Info */}
              <div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-sm'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white font-black text-2xl shadow-lg'>
                    {selectedPrescription.doctorName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className='text-xl font-bold text-gray-900'>{selectedPrescription.doctorName}</h4>
                    <p className='text-sm text-purple-700 font-semibold'>{selectedPrescription.specialty}</p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='bg-white rounded-xl p-3 border border-purple-200'>
                    <p className='text-gray-600 mb-1 font-semibold'>Date Issued</p>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-purple-600' />
                      <span className='font-bold text-gray-900'>{selectedPrescription.date}</span>
                    </div>
                  </div>
                  <div className='bg-white rounded-xl p-3 border border-pink-200'>
                    <p className='text-gray-600 mb-1 font-semibold'>Time</p>
                    <div className='flex items-center gap-2'>
                      <Clock className='h-4 w-4 text-pink-600' />
                      <span className='font-bold text-gray-900'>{selectedPrescription.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div>
                <h4 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                  <div className='w-2 h-8 bg-gradient-to-b from-rose-500 to-orange-500 rounded-full'></div>
                  Diagnosis
                </h4>
                <div className='bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-6 border-2 border-rose-200 shadow-sm'>
                  <p className='font-bold text-gray-900 text-xl mb-3'>{selectedPrescription.diagnosis}</p>
                  <p className='text-sm text-gray-700'><span className='font-bold'>Symptoms:</span> {selectedPrescription.symptoms}</p>
                </div>
              </div>

              {/* Medicines */}
              <div>
                <h4 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                  <div className='w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full'></div>
                  Prescribed Medicines
                </h4>
                <div className='space-y-4'>
                  {selectedPrescription.medicines.map((medicine, index) => (
                    <div key={index} className='bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-5 hover:shadow-lg transition-shadow'>
                      <div className='flex items-start gap-4'>
                        <div className='bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-3 rounded-xl shadow-md'>
                          <Pill className='h-6 w-6 text-white' />
                        </div>
                        <div className='flex-1'>
                          <h5 className='font-bold text-gray-900 mb-3 text-lg'>{medicine.name}</h5>
                          <div className='grid grid-cols-2 gap-3 text-sm'>
                            <div className='bg-white rounded-lg p-2 border border-purple-200'>
                              <p className='text-gray-600'><span className='font-bold'>Dosage:</span> {medicine.dosage}</p>
                            </div>
                            <div className='bg-white rounded-lg p-2 border border-pink-200'>
                              <p className='text-gray-600'><span className='font-bold'>Frequency:</span> {medicine.frequency}</p>
                            </div>
                            <div className='bg-white rounded-lg p-2 border border-orange-200'>
                              <p className='text-gray-600'><span className='font-bold'>Duration:</span> {medicine.duration}</p>
                            </div>
                            <div className='bg-white rounded-lg p-2 border border-rose-200'>
                              <p className='text-gray-600'><span className='font-bold'>Instructions:</span> {medicine.instructions}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor's Notes */}
              <div>
                <h4 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                  <div className='w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full'></div>
                  Doctor's Notes
                </h4>
                <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-sm'>
                  <p className='text-gray-700 leading-relaxed font-medium'>{selectedPrescription.notes}</p>
                  <div className='mt-4 pt-4 border-t-2 border-green-200'>
                    <p className='text-sm text-gray-700 bg-white rounded-lg p-3 border border-green-200'>
                      <span className='font-bold'>Follow-up Date:</span> {selectedPrescription.followUp}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='sticky bottom-0 bg-white border-t-2 border-purple-200 p-6 rounded-b-3xl flex gap-3 justify-end shadow-lg'>
              <Button 
                onClick={() => setShowDetailsModal(false)} 
                variant='outline'
                className='border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold'
              >
                Close
              </Button>
              <Button 
                onClick={() => handleDownloadPrescription(selectedPrescription)}
                className='bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-semibold shadow-md'
              >
                <Download className='h-4 w-4 mr-2' />
                Download Prescription
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
