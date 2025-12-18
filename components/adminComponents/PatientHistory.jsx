'use client'
import { useState } from 'react'
import { Search, Filter, Phone, Mail, MapPin, Calendar, User, FileText, TestTube, Pill, CreditCard, Download, Eye, X, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function PatientHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [activeTab, setActiveTab] = useState('medical')
  
  // Filter states
  const [dateFilter, setDateFilter] = useState('')
  const [testTypeFilter, setTestTypeFilter] = useState('')
  const [doctorFilter, setDoctorFilter] = useState('')
  
  // Dropdown visibility states
  const [showDateDropdown, setShowDateDropdown] = useState(false)
  const [showTestTypeDropdown, setShowTestTypeDropdown] = useState(false)
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false)

  // Sample patient data
  const [patients] = useState([
    {
      id: 'P-001',
      name: 'Rahul Sharma',
      age: 35,
      gender: 'Male',
      phone: '+91 98765 43210',
      email: 'rahul.sharma@email.com',
      address: '123 MG Road, Mumbai',
      bloodGroup: 'O+',
      lastVisit: '15 Dec 2024',
      status: 'Active',
      avatar: 'RS',
      medicalRecords: [
        { date: '15 Dec 2024', diagnosis: 'Seasonal Flu', doctor: 'Dr. Priya Singh', notes: 'Rest advised for 3 days' },
        { date: '10 Nov 2024', diagnosis: 'Annual Checkup', doctor: 'Dr. Amit Kumar', notes: 'All vitals normal' }
      ],
      testReports: [
        { date: '15 Dec 2024', testName: 'Complete Blood Count', result: 'Normal', reportUrl: '#' },
        { date: '10 Nov 2024', testName: 'Lipid Profile', result: 'Normal', reportUrl: '#' }
      ],
      prescriptions: [
        { date: '15 Dec 2024', medicine: 'Paracetamol 500mg', dosage: '3 times daily', duration: '3 days', doctor: 'Dr. Priya Singh' },
        { date: '15 Dec 2024', medicine: 'Vitamin C', dosage: '1 tablet daily', duration: '7 days', doctor: 'Dr. Priya Singh' }
      ],
      billingHistory: [
        { date: '15 Dec 2024', service: 'Consultation + Tests', amount: '₹1,200', status: 'Paid', method: 'Card' },
        { date: '10 Nov 2024', service: 'Annual Checkup', amount: '₹2,500', status: 'Paid', method: 'Cash' }
      ]
    },
    {
      id: 'P-002',
      name: 'Priya Singh',
      age: 28,
      gender: 'Female',
      phone: '+91 98765 43211',
      email: 'priya.singh@email.com',
      address: '456 Park Street, Delhi',
      bloodGroup: 'A+',
      lastVisit: '12 Dec 2024',
      status: 'Active',
      avatar: 'PS',
      medicalRecords: [
        { date: '12 Dec 2024', diagnosis: 'Migraine', doctor: 'Dr. Amit Kumar', notes: 'Follow-up in 2 weeks' }
      ],
      testReports: [
        { date: '12 Dec 2024', testName: 'CT Scan', result: 'Normal', reportUrl: '#' }
      ],
      prescriptions: [
        { date: '12 Dec 2024', medicine: 'Sumatriptan 50mg', dosage: 'As needed', duration: '30 days', doctor: 'Dr. Amit Kumar' }
      ],
      billingHistory: [
        { date: '12 Dec 2024', service: 'CT Scan + Consultation', amount: '₹3,500', status: 'Paid', method: 'UPI' }
      ]
    },
    {
      id: 'P-003',
      name: 'Amit Kumar',
      age: 45,
      gender: 'Male',
      phone: '+91 98765 43212',
      email: 'amit.kumar@email.com',
      address: '789 Lake View, Bangalore',
      bloodGroup: 'B+',
      lastVisit: '10 Dec 2024',
      status: 'Follow-up',
      avatar: 'AK',
      medicalRecords: [
        { date: '10 Dec 2024', diagnosis: 'Hypertension', doctor: 'Dr. Rajesh Gupta', notes: 'Medication adjusted' }
      ],
      testReports: [
        { date: '10 Dec 2024', testName: 'Blood Pressure Monitoring', result: 'High', reportUrl: '#' }
      ],
      prescriptions: [
        { date: '10 Dec 2024', medicine: 'Amlodipine 5mg', dosage: '1 tablet daily', duration: '60 days', doctor: 'Dr. Rajesh Gupta' }
      ],
      billingHistory: [
        { date: '10 Dec 2024', service: 'Consultation', amount: '₹800', status: 'Paid', method: 'Card' }
      ]
    },
    {
      id: 'P-004',
      name: 'Neha Patel',
      age: 32,
      gender: 'Female',
      phone: '+91 98765 43213',
      email: 'neha.patel@email.com',
      address: '321 Garden Road, Pune',
      bloodGroup: 'AB+',
      lastVisit: '08 Dec 2024',
      status: 'Inactive',
      avatar: 'NP',
      medicalRecords: [
        { date: '08 Dec 2024', diagnosis: 'Diabetes Type 2', doctor: 'Dr. Sonia Mehta', notes: 'Dietary changes recommended' }
      ],
      testReports: [
        { date: '08 Dec 2024', testName: 'HbA1c Test', result: 'Elevated', reportUrl: '#' }
      ],
      prescriptions: [
        { date: '08 Dec 2024', medicine: 'Metformin 500mg', dosage: '2 times daily', duration: '90 days', doctor: 'Dr. Sonia Mehta' }
      ],
      billingHistory: [
        { date: '08 Dec 2024', service: 'Tests + Consultation', amount: '₹1,800', status: 'Paid', method: 'UPI' }
      ]
    }
  ])

  // Filter options
  const dates = [...new Set(patients.flatMap(p => p.medicalRecords.map(r => r.date)))].sort().reverse()
  const testTypes = ['Complete Blood Count', 'Lipid Profile', 'CT Scan', 'Blood Pressure Monitoring', 'HbA1c Test']
  const doctors = ['Dr. Priya Singh', 'Dr. Amit Kumar', 'Dr. Rajesh Gupta', 'Dr. Sonia Mehta']

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-300'
      case 'Follow-up': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getAvatarColor = (index) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-700',
      'bg-gradient-to-br from-violet-500 to-purple-700',
      'bg-gradient-to-br from-indigo-500 to-blue-700',
      'bg-gradient-to-br from-purple-500 to-violet-700',
      'bg-gradient-to-br from-blue-600 to-indigo-800'
    ]
    return colors[index % colors.length]
  }

  const getCardGradient = (index, isSelected) => {
    if (isSelected) {
      return 'bg-gradient-to-br from-blue-50 via-violet-50 to-blue-100 border-2 border-blue-400 shadow-lg'
    }
    const gradients = [
      'bg-gradient-to-br from-blue-50/80 to-violet-50/80',
      'bg-gradient-to-br from-violet-50/80 to-purple-50/80',
      'bg-gradient-to-br from-indigo-50/80 to-blue-50/80',
      'bg-gradient-to-br from-purple-50/80 to-blue-50/80',
      'bg-gradient-to-br from-blue-50/80 to-indigo-50/80'
    ]
    return gradients[index % gradients.length] + ' border border-violet-200/50'
  }

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm)
    return matchesSearch
  })

  // Clear all filters
  const clearFilters = () => {
    setDateFilter('')
    setTestTypeFilter('')
    setDoctorFilter('')
    setSearchTerm('')
  }

  const hasActiveFilters = dateFilter || testTypeFilter || doctorFilter || searchTerm

  return (
    <div className="flex-1 h-screen overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <span className="text-3xl">📋</span>
              <span>Patient History</span>
            </h2>
            <p className="text-gray-600 mt-1 pl-10">View and manage complete patient medical history</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by Name / Patient ID / Phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto flex-wrap">
              {/* Date Filter */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-blue-200 ${dateFilter ? 'bg-blue-100 text-blue-700' : 'text-blue-600'}`}
                  onClick={() => {
                    setShowDateDropdown(!showDateDropdown)
                    setShowTestTypeDropdown(false)
                    setShowDoctorDropdown(false)
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Date {dateFilter && `(${dateFilter})`}
                </Button>
                {showDateDropdown && (
                  <div className="absolute top-full mt-2 bg-white border border-blue-200 rounded-lg shadow-lg z-10 min-w-[150px] max-h-60 overflow-y-auto">
                    {dates.map(date => (
                      <button
                        key={date}
                        className="w-full text-left px-4 py-2 text-sm"
                        onClick={() => {
                          setDateFilter(date)
                          setShowDateDropdown(false)
                        }}
                      >
                        {date}
                      </button>
                    ))}
                    {dateFilter && (
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 border-t"
                        onClick={() => {
                          setDateFilter('')
                          setShowDateDropdown(false)
                        }}
                      >
                        Clear Filter
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Test Type Filter */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-blue-200 ${testTypeFilter ? 'bg-blue-100 text-blue-700' : 'text-blue-600'}`}
                  onClick={() => {
                    setShowTestTypeDropdown(!showTestTypeDropdown)
                    setShowDateDropdown(false)
                    setShowDoctorDropdown(false)
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Test Type {testTypeFilter && `(${testTypeFilter})`}
                </Button>
                {showTestTypeDropdown && (
                  <div className="absolute top-full mt-2 bg-white border border-blue-200 rounded-lg shadow-lg z-10 min-w-[200px] max-h-60 overflow-y-auto">
                    {testTypes.map(type => (
                      <button
                        key={type}
                        className="w-full text-left px-4 py-2 text-sm"
                        onClick={() => {
                          setTestTypeFilter(type)
                          setShowTestTypeDropdown(false)
                        }}
                      >
                        {type}
                      </button>
                    ))}
                    {testTypeFilter && (
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 border-t"
                        onClick={() => {
                          setTestTypeFilter('')
                          setShowTestTypeDropdown(false)
                        }}
                      >
                        Clear Filter
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Doctor Filter */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-blue-200 ${doctorFilter ? 'bg-blue-100 text-blue-700' : 'text-blue-600'}`}
                  onClick={() => {
                    setShowDoctorDropdown(!showDoctorDropdown)
                    setShowDateDropdown(false)
                    setShowTestTypeDropdown(false)
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Doctor {doctorFilter && `(${doctorFilter})`}
                </Button>
                {showDoctorDropdown && (
                  <div className="absolute top-full mt-2 bg-white border border-blue-200 rounded-lg shadow-lg z-10 min-w-[150px] max-h-60 overflow-y-auto">
                    {doctors.map(doctor => (
                      <button
                        key={doctor}
                        className="w-full text-left px-4 py-2 text-sm"
                        onClick={() => {
                          setDoctorFilter(doctor)
                          setShowDoctorDropdown(false)
                        }}
                      >
                        {doctor}
                      </button>
                    ))}
                    {doctorFilter && (
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 border-t"
                        onClick={() => {
                          setDoctorFilter('')
                          setShowDoctorDropdown(false)
                        }}
                      >
                        Clear Filter
                      </button>
                    )}
                  </div>
                )}
              </div>

              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-200 text-red-600"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active Filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                  Search: {searchTerm}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                </span>
              )}
              {dateFilter && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                  Date: {dateFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setDateFilter('')} />
                </span>
              )}
              {testTypeFilter && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                  Test: {testTypeFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setTestTypeFilter('')} />
                </span>
              )}
              {doctorFilter && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                  Doctor: {doctorFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setDoctorFilter('')} />
                </span>
              )}
            </div>
          )}
        </div>

        {/* Main Content - Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Patient List - ENHANCED WITH GRADIENTS */}
          <div className="w-96 bg-gradient-to-b from-violet-100 via-blue-50 to-indigo-100 border-r border-violet-200/50 overflow-y-auto scrollbar-hide shadow-inner">
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Patients
                </h3>
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
                  {filteredPatients.length}
                </span>
              </div>
              <div className="space-y-3">
                {filteredPatients.map((patient, index) => (
                  <Card 
                    key={patient.id}
                    className={`cursor-pointer transition-all duration-300 ${getCardGradient(index, selectedPatient?.id === patient.id)} backdrop-blur-sm`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar with enhanced gradient and shadow */}
                        <div className={`${getAvatarColor(index)} text-white rounded-full h-14 w-14 flex items-center justify-center text-base font-bold flex-shrink-0 shadow-xl ring-2 ring-white/50`}>
                          {patient.avatar}
                        </div>
                        
                        {/* Patient Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-bold text-gray-900 text-base truncate">{patient.name}</h4>
                            <ChevronRight className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                              selectedPatient?.id === patient.id ? 'text-violet-600 transform rotate-90' : 'text-gray-400'
                            }`} />
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-2.5 font-medium">
                            <span className="bg-white/70 px-2 py-0.5 rounded-full">{patient.id}</span>
                            <span className="text-violet-400">•</span>
                            <span>{patient.age}y</span>
                            <span className="text-violet-400">•</span>
                            <span>{patient.gender.charAt(0)}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-white/60 px-2 py-1 rounded-full">
                              <Calendar className="h-3 w-3 text-violet-500" />
                              <span className="font-medium">{patient.lastVisit}</span>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${getStatusColor(patient.status)}`}>
                              {patient.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Patient Details */}
          <div className="flex-1 overflow-y-auto bg-white">
            {selectedPatient ? (
              <div className="p-6">
                {/* Profile Card */}
                <Card className="mb-6 border-blue-200 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-violet-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold shadow-lg ring-4 ring-blue-100">
                          {selectedPatient.avatar}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                          <p className="text-gray-600">{selectedPatient.id}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>{selectedPatient.age} years</span>
                            <span>•</span>
                            <span>{selectedPatient.gender}</span>
                            <span>•</span>
                            <span className="font-semibold text-red-600">{selectedPatient.bloodGroup}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedPatient.status)}`}>
                        {selectedPatient.status}
                      </span>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Phone className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPatient.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Mail className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPatient.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <MapPin className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPatient.address}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs */}
                <div className="mb-4">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8">
                      <button
                        onClick={() => setActiveTab('medical')}
                        className={`pb-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                          activeTab === 'medical'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500'
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                        Medical Records
                      </button>
                      <button
                        onClick={() => setActiveTab('tests')}
                        className={`pb-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                          activeTab === 'tests'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500'
                        }`}
                      >
                        <TestTube className="h-4 w-4" />
                        Test Reports
                      </button>
                      <button
                        onClick={() => setActiveTab('prescriptions')}
                        className={`pb-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                          activeTab === 'prescriptions'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500'
                        }`}
                      >
                        <Pill className="h-4 w-4" />
                        Prescriptions
                      </button>
                      <button
                        onClick={() => setActiveTab('billing')}
                        className={`pb-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                          activeTab === 'billing'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500'
                        }`}
                      >
                        <CreditCard className="h-4 w-4" />
                        Billing History
                      </button>
                    </nav>
                  </div>
                </div>

                {/* Tab Content - Medical Records */}
                {activeTab === 'medical' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Medical Timeline
                    </h3>
                    {selectedPatient.medicalRecords.map((record, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{record.diagnosis}</h4>
                              <p className="text-sm text-gray-600">by {record.doctor}</p>
                            </div>
                            <span className="text-sm text-gray-500">{record.date}</span>
                          </div>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{record.notes}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Tab Content - Test Reports */}
                {activeTab === 'tests' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <TestTube className="h-5 w-5 text-blue-600" />
                      Test Reports
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPatient.testReports.map((test, index) => (
                        <Card key={index} className="border-blue-200">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{test.testName}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                test.result === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {test.result}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-3">{test.date}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm"  className="bg-gradient-to-r from-blue-500 to-violet-600 text-white border-0 flex-1 shadow-md hover:shadow-lg transition-shadow">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Content - Prescriptions */}
                {activeTab === 'prescriptions' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Pill className="h-5 w-5 text-blue-600" />
                      Prescriptions
                    </h3>
                    {selectedPatient.prescriptions.map((prescription, index) => (
                      <Card key={index} className="border-purple-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg">{prescription.medicine}</h4>
                              <p className="text-sm text-gray-600">Prescribed by {prescription.doctor}</p>
                            </div>
                            <span className="text-sm text-gray-500">{prescription.date}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 bg-purple-50 p-3 rounded">
                            <div>
                              <p className="text-xs text-gray-600">Dosage</p>
                              <p className="font-medium text-gray-900">{prescription.dosage}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Duration</p>
                              <p className="font-medium text-gray-900">{prescription.duration}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Tab Content - Billing History */}
                {activeTab === 'billing' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      Billing History
                    </h3>
                    {selectedPatient.billingHistory.map((bill, index) => (
                      <Card key={index} className="border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{bill.service}</h4>
                              <p className="text-sm text-gray-600">{bill.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-900">{bill.amount}</p>
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                {bill.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <span>Payment Method:</span>
                            <span className="font-medium">{bill.method}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <User className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Select a patient to view details</p>
                  <p className="text-sm">Choose from the patient list on the left</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}