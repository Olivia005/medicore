'use client'
import { useState } from 'react'
import { Search, Plus, Filter, Eye, Upload, Edit, UserPlus, FileCheck, X, Calendar, User, Stethoscope, Building2, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LabTests() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTest, setSelectedTest] = useState(null)
  const [showSidePanel, setShowSidePanel] = useState(false)
  const [showAddTestModal, setShowAddTestModal] = useState(false)
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  
  // Dropdown visibility states
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showDateDropdown, setShowDateDropdown] = useState(false)
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false)

  // New test form state
  const [newTest, setNewTest] = useState({
    patientName: '',
    patientId: '',
    testType: '',
    department: '',
    assignedLab: '',
    status: 'Pending',
    date: '',
    priority: 'Normal',
    notes: ''
  })

  // Sample test data
  const [tests, setTests] = useState([
    { id: 'T-102', patientName: 'Rahul Sharma', testType: 'Blood Test', assignedLab: 'Lab A', status: 'Pending', date: '12 Aug', department: 'Hematology' },
    { id: 'T-103', patientName: 'Priya Singh', testType: 'X-Ray', assignedLab: 'Lab B', status: 'In Progress', date: '13 Aug', department: 'Radiology' },
    { id: 'T-104', patientName: 'Amit Kumar', testType: 'Urine Test', assignedLab: 'Lab A', status: 'Completed', date: '11 Aug', department: 'Pathology' },
    { id: 'T-105', patientName: 'Neha Patel', testType: 'CT Scan', assignedLab: 'Lab C', status: 'Cancelled', date: '10 Aug', department: 'Radiology' },
    { id: 'T-106', patientName: 'Rajesh Gupta', testType: 'MRI', assignedLab: 'Lab B', status: 'Pending', date: '14 Aug', department: 'Radiology' },
    { id: 'T-107', patientName: 'Sonia Mehta', testType: 'Blood Test', assignedLab: 'Lab A', status: 'In Progress', date: '12 Aug', department: 'Hematology' },
    { id: 'T-108', patientName: 'Vikram Singh', testType: 'ECG', assignedLab: 'Lab C', status: 'Completed', date: '13 Aug', department: 'Cardiology' },
  ])

  // Extract unique values for filters
  const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled']
  const dates = [...new Set(tests.map(t => t.date))].sort()
  const departments = [...new Set(tests.map(t => t.department))].sort()
  const labs = ['Lab A', 'Lab B', 'Lab C']
  const testTypes = ['Blood Test', 'Urine Test', 'X-Ray', 'CT Scan', 'MRI', 'ECG', 'Ultrasound']

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Completed': return 'bg-green-100 text-green-800 border-green-300'
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const handleViewUpdate = (test) => {
    setSelectedTest(test)
    setShowSidePanel(true)
  }

  const handleAddTest = () => {
    // Generate new test ID
    const newId = `T-${109 + tests.length}`
    const testToAdd = {
      id: newId,
      ...newTest
    }
    
    setTests([...tests, testToAdd])
    
    // Reset form and close modal
    setNewTest({
      patientName: '',
      patientId: '',
      testType: '',
      department: '',
      assignedLab: '',
      status: 'Pending',
      date: '',
      priority: 'Normal',
      notes: ''
    })
    setShowAddTestModal(false)
    
    // Show success message
    alert('Test added successfully!')
  }

  // Filter logic
  const filteredTests = tests.filter(test => {
    const matchesSearch = test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         test.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || test.status === statusFilter
    const matchesDate = !dateFilter || test.date === dateFilter
    const matchesDepartment = !departmentFilter || test.department === departmentFilter
    
    return matchesSearch && matchesStatus && matchesDate && matchesDepartment
  })

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter('')
    setDateFilter('')
    setDepartmentFilter('')
    setSearchTerm('')
  }

  const hasActiveFilters = statusFilter || dateFilter || departmentFilter || searchTerm

  return (
    <div className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-2 mb-2">
            <span className="text-3xl">🧪</span>
            <span>Laboratory Tests</span>
          </h2>
          <p className="text-gray-600">Manage and track all laboratory test requests and results</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 border-blue-100 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Test name or Patient ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-blue-200 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto flex-wrap">
                {/* Status Filter */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`border-blue-200 hover:bg-blue-50 ${statusFilter ? 'bg-blue-100 text-blue-700' : 'text-blue-600'}`}
                    onClick={() => {
                      setShowStatusDropdown(!showStatusDropdown)
                      setShowDateDropdown(false)
                      setShowDepartmentDropdown(false)
                    }}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Status {statusFilter && `(${statusFilter})`}
                  </Button>
                  {showStatusDropdown && (
                    <div className="absolute top-full mt-2 bg-white border border-blue-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                      {statuses.map(status => (
                        <button
                          key={status}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm"
                          onClick={() => {
                            setStatusFilter(status)
                            setShowStatusDropdown(false)
                          }}
                        >
                          {status}
                        </button>
                      ))}
                      {statusFilter && (
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-red-600 border-t"
                          onClick={() => {
                            setStatusFilter('')
                            setShowStatusDropdown(false)
                          }}
                        >
                          Clear Filter
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Date Filter */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`border-blue-200 hover:bg-blue-50 ${dateFilter ? 'bg-blue-100 text-blue-700' : 'text-blue-600'}`}
                    onClick={() => {
                      setShowDateDropdown(!showDateDropdown)
                      setShowStatusDropdown(false)
                      setShowDepartmentDropdown(false)
                    }}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Date {dateFilter && `(${dateFilter})`}
                  </Button>
                  {showDateDropdown && (
                    <div className="absolute top-full mt-2 bg-white border border-blue-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                      {dates.map(date => (
                        <button
                          key={date}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm"
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
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-red-600 border-t"
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

                {/* Department Filter */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`border-blue-200 hover:bg-blue-50 ${departmentFilter ? 'bg-blue-100 text-blue-700' : 'text-blue-600'}`}
                    onClick={() => {
                      setShowDepartmentDropdown(!showDepartmentDropdown)
                      setShowStatusDropdown(false)
                      setShowDateDropdown(false)
                    }}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Department {departmentFilter && `(${departmentFilter})`}
                  </Button>
                  {showDepartmentDropdown && (
                    <div className="absolute top-full mt-2 bg-white border border-blue-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                      {departments.map(dept => (
                        <button
                          key={dept}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm"
                          onClick={() => {
                            setDepartmentFilter(dept)
                            setShowDepartmentDropdown(false)
                          }}
                        >
                          {dept}
                        </button>
                      ))}
                      {departmentFilter && (
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-red-600 border-t"
                          onClick={() => {
                            setDepartmentFilter('')
                            setShowDepartmentDropdown(false)
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
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>

              <Button 
                className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                onClick={() => setShowAddTestModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Test
              </Button>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active Filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                    Search: {searchTerm}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                  </span>
                )}
                {statusFilter && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                    Status: {statusFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter('')} />
                  </span>
                )}
                {dateFilter && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                    Date: {dateFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setDateFilter('')} />
                  </span>
                )}
                {departmentFilter && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                    Department: {departmentFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setDepartmentFilter('')} />
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredTests.length} of {tests.length} tests
        </div>

        {/* Main Table */}
        <Card className="border-blue-100 shadow-md">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Test ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Patient Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Test Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assigned Lab</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {filteredTests.length > 0 ? (
                    filteredTests.map((test) => (
                      <tr key={test.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{test.patientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{test.testType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{test.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{test.assignedLab}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(test.status)}`}>
                            {test.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{test.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewUpdate(test)}
                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View / Update
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                        No tests found matching your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Test Modal */}
      {showAddTestModal && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowAddTestModal(false)}>
          <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add New Test</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddTestModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleAddTest(); }} className="space-y-4">
                {/* Patient Name */}
                <div>
                  <Label htmlFor="patientName" className="text-sm font-medium text-gray-700">Patient Name *</Label>
                  <Input
                    id="patientName"
                    required
                    value={newTest.patientName}
                    onChange={(e) => setNewTest({...newTest, patientName: e.target.value})}
                    placeholder="Enter patient name"
                    className="mt-1 border-blue-200 focus:ring-blue-500"
                  />
                </div>

                {/* Patient ID */}
                <div>
                  <Label htmlFor="patientId" className="text-sm font-medium text-gray-700">Patient ID *</Label>
                  <Input
                    id="patientId"
                    required
                    value={newTest.patientId}
                    onChange={(e) => setNewTest({...newTest, patientId: e.target.value})}
                    placeholder="e.g., P-12345"
                    className="mt-1 border-blue-200 focus:ring-blue-500"
                  />
                </div>

                {/* Test Type */}
                <div>
                  <Label htmlFor="testType" className="text-sm font-medium text-gray-700">Test Type *</Label>
                  <select
                    id="testType"
                    required
                    value={newTest.testType}
                    onChange={(e) => setNewTest({...newTest, testType: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select test type</option>
                    {testTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Department */}
                <div>
                  <Label htmlFor="department" className="text-sm font-medium text-gray-700">Department *</Label>
                  <select
                    id="department"
                    required
                    value={newTest.department}
                    onChange={(e) => setNewTest({...newTest, department: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select department</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Pathology">Pathology</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Microbiology">Microbiology</option>
                  </select>
                </div>

                {/* Assigned Lab */}
                <div>
                  <Label htmlFor="assignedLab" className="text-sm font-medium text-gray-700">Assigned Lab *</Label>
                  <select
                    id="assignedLab"
                    required
                    value={newTest.assignedLab}
                    onChange={(e) => setNewTest({...newTest, assignedLab: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select lab</option>
                    {labs.map(lab => (
                      <option key={lab} value={lab}>{lab}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status *</Label>
                  <select
                    id="status"
                    required
                    value={newTest.status}
                    onChange={(e) => setNewTest({...newTest, status: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={newTest.date}
                    onChange={(e) => setNewTest({...newTest, date: e.target.value})}
                    className="mt-1 border-blue-200 focus:ring-blue-500"
                  />
                </div>

                {/* Priority */}
                <div>
                  <Label htmlFor="priority" className="text-sm font-medium text-gray-700">Priority</Label>
                  <select
                    id="priority"
                    value={newTest.priority}
                    onChange={(e) => setNewTest({...newTest, priority: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes</Label>
                  <textarea
                    id="notes"
                    value={newTest.notes}
                    onChange={(e) => setNewTest({...newTest, notes: e.target.value})}
                    placeholder="Add any additional notes..."
                    rows="3"
                    className="mt-1 w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowAddTestModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add Test
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Side Panel / Modal for View/Update - COMPACT VERSION */}
      {showSidePanel && selectedTest && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowSidePanel(false)}>
          <div className="bg-gradient-to-br from-white to-blue-50 w-full max-w-md h-full shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Compact Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Test Details</h3>
                    <p className="text-blue-100 text-xs">Complete test information</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowSidePanel(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Status Badge in Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-100">ID: {selectedTest.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedTest.status)} bg-white`}>
                  {selectedTest.status}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {/* Patient Information Card - Compact */}
              <Card className="border-blue-200 bg-white shadow-sm">
                <CardContent className="p-3">
                  <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    Patient Information
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-50 p-1.5 rounded">
                      <User className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Patient Name</p>
                      <p className="font-semibold text-gray-900 text-sm">{selectedTest.patientName}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Test Information Card - Compact */}
              <Card className="border-blue-200 bg-white shadow-sm">
                <CardContent className="p-3">
                  <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-blue-600" />
                    Test Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-50 p-1.5 rounded">
                        <AlertCircle className="h-3 w-3 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Test Type</p>
                        <p className="font-semibold text-gray-900 text-sm">{selectedTest.testType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-green-50 p-1.5 rounded">
                        <Building2 className="h-3 w-3 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Department</p>
                        <p className="font-semibold text-gray-900 text-sm">{selectedTest.department}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-orange-50 p-1.5 rounded">
                        <Building2 className="h-3 w-3 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Assigned Lab</p>
                        <p className="font-semibold text-gray-900 text-sm">{selectedTest.assignedLab}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-blue-50 p-1.5 rounded">
                        <Calendar className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Test Date</p>
                        <p className="font-semibold text-gray-900 text-sm">{selectedTest.date}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions - Compact */}
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Quick Actions
                </h4>
                
                <Button size="sm" className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white h-9">
                  <FileCheck className="h-3 w-3 mr-2" />
                  View Full Details
                </Button>

                <Button size="sm" variant="outline" className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50 h-9">
                  <Upload className="h-3 w-3 mr-2" />
                  Upload Reports
                </Button>

                <Button size="sm" variant="outline" className="w-full justify-start border-amber-200 text-amber-700 hover:bg-amber-50 h-9">
                  <Edit className="h-3 w-3 mr-2" />
                  Update Status
                </Button>

                <Button size="sm" variant="outline" className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50 h-9">
                  <UserPlus className="h-3 w-3 mr-2" />
                  Assign Technician
                </Button>
              </div>

              {/* Timeline/History Section - Compact */}
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm">
                <CardContent className="p-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    Recent Activity
                  </h4>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1"></div>
                      <div>
                        <p className="text-gray-900 font-medium">Test Assigned</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></div>
                      <div>
                        <p className="text-gray-900 font-medium">Sample Collected</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}