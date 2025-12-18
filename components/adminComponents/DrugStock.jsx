'use client'
import { useState } from 'react'
import {
  Search,
  Filter,
  Plus,
  Package,
  AlertTriangle,
  Calendar,
  XCircle,
  Edit,
  Trash2,
  RefreshCw,
  Eye,
  X,
  TrendingDown,
  Clock,
  DollarSign,
  Pill
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function DrugStock () {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [selectedDrug, setSelectedDrug] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showRestockModal, setShowRestockModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [restockQuantity, setRestockQuantity] = useState('')
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    batchNo: '',
    quantity: '',
    minQuantity: '',
    expiryDate: '',
    manufacturer: '',
    price: ''
  })

  // Sample drug data
  const [drugs, setDrugs] = useState([
    {
      id: 'D-001',
      name: 'Paracetamol 500mg',
      category: 'Analgesic',
      batchNo: 'B2024001',
      quantity: 500,
      minQuantity: 100,
      expiryDate: '2025-12-31',
      manufacturer: 'PharmaCorp',
      price: '₹2.50',
      status: 'safe'
    },
    {
      id: 'D-002',
      name: 'Amoxicillin 250mg',
      category: 'Antibiotic',
      batchNo: 'B2024002',
      quantity: 75,
      minQuantity: 100,
      expiryDate: '2025-06-30',
      manufacturer: 'MediLife',
      price: '₹8.00',
      status: 'low-stock'
    },
    {
      id: 'D-003',
      name: 'Ibuprofen 400mg',
      category: 'Anti-inflammatory',
      batchNo: 'B2023045',
      quantity: 45,
      minQuantity: 50,
      expiryDate: '2025-02-28',
      manufacturer: 'HealthPlus',
      price: '₹5.50',
      status: 'expiring'
    },
    {
      id: 'D-004',
      name: 'Metformin 500mg',
      category: 'Antidiabetic',
      batchNo: 'B2024010',
      quantity: 0,
      minQuantity: 100,
      expiryDate: '2025-08-15',
      manufacturer: 'DiabetCare',
      price: '₹3.00',
      status: 'out-of-stock'
    },
    {
      id: 'D-005',
      name: 'Aspirin 75mg',
      category: 'Antiplatelet',
      batchNo: 'B2024015',
      quantity: 300,
      minQuantity: 100,
      expiryDate: '2026-01-20',
      manufacturer: 'CardioMed',
      price: '₹1.50',
      status: 'safe'
    },
    {
      id: 'D-006',
      name: 'Omeprazole 20mg',
      category: 'Antacid',
      batchNo: 'B2023098',
      quantity: 30,
      minQuantity: 100,
      expiryDate: '2025-03-15',
      manufacturer: 'GastroHealth',
      price: '₹4.00',
      status: 'expiring'
    },
    {
      id: 'D-007',
      name: 'Cetirizine 10mg',
      category: 'Antihistamine',
      batchNo: 'B2024020',
      quantity: 200,
      minQuantity: 80,
      expiryDate: '2025-11-30',
      manufacturer: 'AllergyFree',
      price: '₹2.00',
      status: 'safe'
    },
    {
      id: 'D-008',
      name: 'Atorvastatin 10mg',
      category: 'Cholesterol',
      batchNo: 'B2024025',
      quantity: 60,
      minQuantity: 100,
      expiryDate: '2025-07-10',
      manufacturer: 'HeartCare',
      price: '₹6.50',
      status: 'low-stock'
    }
  ])

  const getStatusInfo = status => {
    switch (status) {
      case 'safe':
        return {
          color:
            'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200',
          dotColor: 'bg-emerald-500',
          label: 'In Stock'
        }
      case 'low-stock':
        return {
          color:
            'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200',
          dotColor: 'bg-blue-500',
          label: 'Low Stock'
        }
      case 'expiring':
        return {
          color:
            'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border-yellow-200',
          dotColor: 'bg-yellow-500',
          label: 'Expiring Soon'
        }
      case 'out-of-stock':
        return {
          color:
            'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200',
          dotColor: 'bg-red-500',
          label: 'Out of Stock'
        }
      default:
        return {
          color:
            'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200',
          dotColor: 'bg-gray-500',
          label: 'Unknown'
        }
    }
  }

  // Action handlers
  const handleViewDetails = (drug) => {
    setSelectedDrug(drug)
    setShowViewModal(true)
  }

  const handleEdit = (drug) => {
    setSelectedDrug(drug)
    setEditFormData({
      name: drug.name,
      category: drug.category,
      batchNo: drug.batchNo,
      quantity: drug.quantity.toString(),
      minQuantity: drug.minQuantity.toString(),
      expiryDate: drug.expiryDate,
      manufacturer: drug.manufacturer,
      price: drug.price
    })
    setShowEditModal(true)
  }

  const handleRestock = (drug) => {
    setSelectedDrug(drug)
    setRestockQuantity('')
    setShowRestockModal(true)
  }

  const handleDelete = (drug) => {
    setSelectedDrug(drug)
    setShowDeleteModal(true)
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const confirmEdit = () => {
    if (selectedDrug) {
      const quantity = parseInt(editFormData.quantity)
      const minQuantity = parseInt(editFormData.minQuantity)
      
      // Determine status based on quantity
      let status = 'safe'
      if (quantity === 0) {
        status = 'out-of-stock'
      } else if (quantity < minQuantity) {
        status = 'low-stock'
      }

      setDrugs(drugs.map(drug => {
        if (drug.id === selectedDrug.id) {
          return {
            ...drug,
            name: editFormData.name,
            category: editFormData.category,
            batchNo: editFormData.batchNo,
            quantity: quantity,
            minQuantity: minQuantity,
            expiryDate: editFormData.expiryDate,
            manufacturer: editFormData.manufacturer,
            price: editFormData.price,
            status: status
          }
        }
        return drug
      }))
      setShowEditModal(false)
    }
  }

  const confirmRestock = () => {
    if (selectedDrug && restockQuantity) {
      const quantity = parseInt(restockQuantity)
      if (!isNaN(quantity) && quantity > 0) {
        setDrugs(drugs.map(drug => {
          if (drug.id === selectedDrug.id) {
            const newQuantity = drug.quantity + quantity
            return {
              ...drug,
              quantity: newQuantity,
              status: newQuantity >= drug.minQuantity ? 'safe' : drug.status
            }
          }
          return drug
        }))
        setShowRestockModal(false)
        setRestockQuantity('')
      }
    }
  }

  const confirmDelete = () => {
    if (selectedDrug) {
      setDrugs(drugs.filter(drug => drug.id !== selectedDrug.id))
      setShowDeleteModal(false)
    }
  }

  // Calculate stats
  const totalDrugs = drugs.length
  const lowStockCount = drugs.filter(d => d.status === 'low-stock').length
  const expiringCount = drugs.filter(d => d.status === 'expiring').length
  const outOfStockCount = drugs.filter(d => d.status === 'out-of-stock').length

  // Filter drugs
  const filteredDrugs = drugs.filter(drug => {
    const matchesSearch =
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'low-stock' && drug.status === 'low-stock') ||
      (filterStatus === 'expiring-soon' && drug.status === 'expiring')

    return matchesSearch && matchesFilter
  })

  const clearFilters = () => {
    setSearchTerm('')
    setFilterStatus('all')
  }

  const hasActiveFilters = searchTerm || filterStatus !== 'all'

  return (
    <div className='flex-1 h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/30'>
      <div className='h-full flex flex-col'>
        {/* Header - Professional & Clean */}
        <div className='bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-6 shadow-sm'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-4'>
                <Pill className='h-10 w-10 font-bold text-emerald-600' />

                <div>
                  <h2 className='text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                    Drug Inventory
                  </h2>
                  <p className='text-gray-500 mt-0.5 text-sm'>
                    Pharmaceutical stock management system
                  </p>
                </div>
              </div>
              <Button
                size='lg'
                className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-6 rounded-lg'
              >
                <Plus className='h-5 w-5 mr-2' />
                Add New Drug
              </Button>
            </div>

            {/* Search and Filters */}
            <div className='flex flex-col md:flex-row gap-3'>
              <div className='flex-1'>
                <div className='relative'>
                  <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    placeholder='Search drugs, batch numbers, or categories...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='pl-12 h-11 border-gray-200 focus:ring-2 focus:ring-emerald-400 bg-white shadow-sm rounded-lg'
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
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-300 hover:border-emerald-400'
                        : 'text-gray-600 bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  >
                    <Filter className='h-4 w-4 mr-2' />
                    {filterStatus === 'all'
                      ? 'All Status'
                      : filterStatus === 'low-stock'
                      ? 'Low Stock'
                      : 'Expiring Soon'}
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
                        className='w-full text-left px-4 py-3 text-sm hover:bg-orange-50 transition-colors flex items-center gap-2'
                        onClick={() => {
                          setFilterStatus('low-stock')
                          setShowStatusDropdown(false)
                        }}
                      >
                        <span className='w-2 h-2 rounded-full bg-orange-500'></span>
                        Low Stock
                      </button>
                      <button
                        className='w-full text-left px-4 py-3 text-sm hover:bg-yellow-50 transition-colors flex items-center gap-2'
                        onClick={() => {
                          setFilterStatus('expiring-soon')
                          setShowStatusDropdown(false)
                        }}
                      >
                        <span className='w-2 h-2 rounded-full bg-yellow-500'></span>
                        Expiring Soon
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
                  <span className='inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm border border-emerald-200'>
                    <Search className='h-3 w-3' />
                    {searchTerm}
                    <X
                      className='h-3.5 w-3.5 cursor-pointer hover:text-emerald-900'
                      onClick={() => setSearchTerm('')}
                    />
                  </span>
                )}
                {filterStatus !== 'all' && (
                  <span className='inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm border border-emerald-200'>
                    <Filter className='h-3 w-3' />
                    {filterStatus === 'low-stock'
                      ? 'Low Stock'
                      : 'Expiring Soon' }
                    <X
                      className='h-3.5 w-3.5 cursor-pointer hover:text-emerald-900'
                      onClick={() => setFilterStatus('all')}
                    />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats Row - Clean & Professional */}
        <div className='px-8 py-6 bg-gradient-to-r from-white to-gray-50/50'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
              <Card className='border border-gray-200 hover:border-emerald-300 transition-all duration-300 bg-white'>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm text-gray-500 mb-1'>
                        Total Inventory
                      </p>
                      <p className='text-3xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                        {totalDrugs}
                      </p>
                      <p className='text-xs text-gray-400 mt-1'>Active drugs</p>
                    </div>
                    <div className='bg-gradient-to-br from-emerald-100 to-teal-100 p-3.5 rounded-xl'>
                      <Package className='h-7 w-7 text-emerald-600' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='border border-gray-200 hover:border-orange-300 transition-all duration-300 bg-white'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm text-gray-500 mb-1'>Low Stock</p>
                      <p className='text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        {lowStockCount}
                      </p>
                      <p className='text-xs text-blue-500 mt-1'>
                        Needs restock
                      </p>
                    </div>
                    <div className='bg-gradient-to-br from-blue-100 to-purple-100 p-3.5 rounded-xl'>
                      <TrendingDown className='h-7 w-7 text-blue-600' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='border border-gray-200 hover:border-yellow-300 transition-all duration-300 bg-white'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm text-gray-500 mb-1'>
                        Expiring Soon
                      </p>
                      <p className='text-3xl font-semibold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent'>
                        {expiringCount}
                      </p>
                      <p className='text-xs text-yellow-600 mt-1'>
                        Within 6 months
                      </p>
                    </div>
                    <div className='bg-gradient-to-br from-yellow-100 to-amber-100 p-3.5 rounded-xl'>
                      <Clock className='h-7 w-7 text-yellow-600' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='border border-gray-200 hover:border-red-300 transition-all duration-300 bg-white'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm text-gray-500 mb-1'>Out of Stock</p>
                      <p className='text-3xl font-semibold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent'>
                        {outOfStockCount}
                      </p>
                      <p className='text-xs text-red-500 mt-1'>Urgent action</p>
                    </div>
                    <div className='bg-gradient-to-br from-red-100 to-rose-100 p-3.5 rounded-xl'>
                      <AlertTriangle className='h-7 w-7 text-red-600' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Inventory Table - Professional & Clean */}
        <div className='flex-1 overflow-auto px-8 py-4'>
          <div className='max-w-7xl mx-auto'>
            <Card className='border-0 shadow-lg overflow-hidden bg-white'>
              <CardContent className='p-0'>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-gradient-to-r from-green-100 to-teal-100 border-b border-gray-200'>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>
                          Drug Information
                        </th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>
                          Category
                        </th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>
                          Batch Details
                        </th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>
                          Stock Level
                        </th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>
                          Expiry Date
                        </th>
                        <th className='px-6 py-4 text-left text-sm text-gray-600'>
                          Status
                        </th>
                        <th className='px-6 py-4 text-center text-sm text-gray-600'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {filteredDrugs.map((drug, index) => {
                        const statusInfo = getStatusInfo(drug.status)
                        return (
                          <tr
                            key={drug.id}
                            className={`${
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                            } hover:bg-emerald-50/20 transition-colors duration-150`}
                          >
                            <td className='px-6 py-4'>
                              <div className='flex items-center gap-3'>
                                <div className='bg-gradient-to-br from-emerald-100 to-teal-100 p-2 rounded-lg'>
                                  <Pill className='h-5 w-5 text-emerald-600' />
                                </div>
                                <div>
                                  <p className='text-gray-900 font-medium'>
                                    {drug.name}
                                  </p>
                                  <div className='flex items-center gap-2 mt-0.5'>
                                    <span className='text-xs text-gray-400 font-mono'>
                                      {drug.id}
                                    </span>
                                    <span className='text-gray-300'>•</span>
                                    <span className='text-xs text-emerald-600 font-medium'>
                                      {drug.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <span className='inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs border border-emerald-200'>
                                {drug.category}
                              </span>
                            </td>
                            <td className='px-6 py-4'>
                              <div>
                                <p className='text-gray-900 font-mono font-medium text-sm'>
                                  {drug.batchNo}
                                </p>
                                <p className='text-xs text-gray-500 mt-0.5'>
                                  {drug.manufacturer}
                                </p>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <div>
                                <div className='flex items-baseline gap-1.5 mb-1.5'>
                                  <p
                                    className={`text-lg font-semibold ${
                                      drug.quantity === 0
                                        ? 'text-red-600'
                                        : drug.quantity < drug.minQuantity
                                        ? 'text-orange-600'
                                        : 'text-emerald-600'
                                    }`}
                                  >
                                    {drug.quantity}
                                  </p>
                                  <span className='text-xs text-gray-500'>
                                    units
                                  </span>
                                </div>
                                <div className='w-full bg-gray-100 rounded-full h-1.5 mb-1'>
                                  <div
                                    className={`h-1.5 rounded-full transition-all ${
                                      drug.quantity === 0
                                        ? 'bg-red-500'
                                        : drug.quantity < drug.minQuantity
                                        ? 'bg-orange-500'
                                        : 'bg-emerald-500'
                                    }`}
                                    style={{
                                      width: `${Math.min(
                                        (drug.quantity / drug.minQuantity) *
                                          100,
                                        100
                                      )}%`
                                    }}
                                  ></div>
                                </div>
                                <p className='text-xs text-gray-400'>
                                  Min: {drug.minQuantity}
                                </p>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <div className='flex items-center gap-2'>
                                <Calendar className='h-4 w-4 text-gray-400' />
                                <p className='text-sm text-gray-700'>
                                  {drug.expiryDate}
                                </p>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border ${statusInfo.color}`}
                              >
                                <span
                                  className={`w-2 h-2 rounded-full ${statusInfo.dotColor}`}
                                ></span>
                                {statusInfo.label}
                              </span>
                            </td>
                            <td className='px-6 py-4'>
                              <div className='flex items-center justify-center gap-1.5'>
                                <button
                                  onClick={() => handleViewDetails(drug)}
                                  className='inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow'
                                  title='View Details'
                                >
                                  <Eye className='h-4 w-4' />
                                </button>
                                <button
                                  onClick={() => handleRestock(drug)}
                                  className='inline-flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow'
                                  title='Restock'
                                >
                                  <RefreshCw className='h-4 w-4' />
                                </button>
                                <button
                                  onClick={() => handleEdit(drug)}
                                  className='inline-flex items-center justify-center h-9 w-9 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200 hover:border-amber-300 transition-all duration-200 shadow-sm hover:shadow'
                                  title='Edit'
                                >
                                  <Edit className='h-4 w-4' />
                                </button>
                                <button
                                  onClick={() => handleDelete(drug)}
                                  className='inline-flex items-center justify-center h-9 w-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow'
                                  title='Delete'
                                >
                                  <Trash2 className='h-4 w-4' />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredDrugs.length === 0 && (
                  <div className='text-center py-16'>
                    <div className='bg-gradient-to-br from-emerald-100 to-teal-100 p-6 rounded-2xl inline-block mb-4'>
                      <Package className='h-16 w-16 text-emerald-600' />
                    </div>
                    <p className='text-lg font-medium text-gray-700'>
                      No drugs found
                    </p>
                    <p className='text-sm text-gray-500 mt-1'>
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && selectedDrug && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-2xl font-semibold text-gray-900'>Drug Details</h3>
              <button onClick={() => setShowViewModal(false)} className='text-gray-400 hover:text-gray-600'>
                <X className='h-6 w-6' />
              </button>
            </div>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-500'>Drug Name</p>
                  <p className='text-base font-medium text-gray-900'>{selectedDrug.name}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Drug ID</p>
                  <p className='text-base font-medium text-gray-900 font-mono'>{selectedDrug.id}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Category</p>
                  <p className='text-base font-medium text-gray-900'>{selectedDrug.category}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Manufacturer</p>
                  <p className='text-base font-medium text-gray-900'>{selectedDrug.manufacturer}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Batch Number</p>
                  <p className='text-base font-medium text-gray-900 font-mono'>{selectedDrug.batchNo}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Price</p>
                  <p className='text-base font-medium text-gray-900'>{selectedDrug.price}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Current Quantity</p>
                  <p className='text-base font-medium text-gray-900'>{selectedDrug.quantity} units</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Minimum Quantity</p>
                  <p className='text-base font-medium text-gray-900'>{selectedDrug.minQuantity} units</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Expiry Date</p>
                  <p className='text-base font-medium text-gray-900'>{selectedDrug.expiryDate}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Status</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs border ${getStatusInfo(selectedDrug.status).color}`}>
                    <span className={`w-2 h-2 rounded-full ${getStatusInfo(selectedDrug.status).dotColor}`}></span>
                    {getStatusInfo(selectedDrug.status).label}
                  </span>
                </div>
              </div>
            </div>
            <div className='mt-6 flex justify-end'>
              <Button onClick={() => setShowViewModal(false)} className='bg-gray-200 text-gray-700 hover:bg-gray-300'>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {showRestockModal && selectedDrug && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-2xl font-semibold text-gray-900'>Restock Drug</h3>
              <button onClick={() => setShowRestockModal(false)} className='text-gray-400 hover:text-gray-600'>
                <X className='h-6 w-6' />
              </button>
            </div>
            <div className='space-y-4'>
              <div>
                <p className='text-sm text-gray-500'>Drug Name</p>
                <p className='text-base font-medium text-gray-900'>{selectedDrug.name}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Current Quantity</p>
                <p className='text-base font-medium text-gray-900'>{selectedDrug.quantity} units</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Quantity to Add
                </label>
                <Input
                  type='number'
                  min='1'
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(e.target.value)}
                  placeholder='Enter quantity'
                  className='w-full'
                />
              </div>
            </div>
            <div className='mt-6 flex gap-3 justify-end'>
              <Button 
                onClick={() => setShowRestockModal(false)} 
                variant='outline'
                className='border-gray-200 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmRestock}
                className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white'
              >
                Confirm Restock
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedDrug && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-2xl font-semibold text-red-600'>Delete Drug</h3>
              <button onClick={() => setShowDeleteModal(false)} className='text-gray-400 hover:text-gray-600'>
                <X className='h-6 w-6' />
              </button>
            </div>
            <div className='mb-6'>
              <p className='text-gray-700'>Are you sure you want to delete this drug?</p>
              <p className='text-base font-medium text-gray-900 mt-2'>{selectedDrug.name}</p>
              <p className='text-sm text-gray-500 mt-1'>This action cannot be undone.</p>
            </div>
            <div className='flex gap-3 justify-end'>
              <Button 
                onClick={() => setShowDeleteModal(false)} 
                variant='outline'
                className='border-gray-200 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmDelete}
                className='bg-red-600 hover:bg-red-700 text-white'
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Drug Modal */}
      {showEditModal && selectedDrug && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-2xl font-semibold text-gray-900'>Edit Drug</h3>
              <button onClick={() => setShowEditModal(false)} className='text-gray-400 hover:text-gray-600'>
                <X className='h-6 w-6' />
              </button>
            </div>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Drug Name
                  </label>
                  <Input
                    name='name'
                    value={editFormData.name}
                    onChange={handleEditInputChange}
                    placeholder='Enter drug name'
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Category
                  </label>
                  <Input
                    name='category'
                    value={editFormData.category}
                    onChange={handleEditInputChange}
                    placeholder='Enter category'
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Batch Number
                  </label>
                  <Input
                    name='batchNo'
                    value={editFormData.batchNo}
                    onChange={handleEditInputChange}
                    placeholder='Enter batch number'
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Manufacturer
                  </label>
                  <Input
                    name='manufacturer'
                    value={editFormData.manufacturer}
                    onChange={handleEditInputChange}
                    placeholder='Enter manufacturer'
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Current Quantity
                  </label>
                  <Input
                    type='number'
                    name='quantity'
                    min='0'
                    value={editFormData.quantity}
                    onChange={handleEditInputChange}
                    placeholder='Enter quantity'
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Minimum Quantity
                  </label>
                  <Input
                    type='number'
                    name='minQuantity'
                    min='0'
                    value={editFormData.minQuantity}
                    onChange={handleEditInputChange}
                    placeholder='Enter minimum quantity'
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Expiry Date
                  </label>
                  <Input
                    type='date'
                    name='expiryDate'
                    value={editFormData.expiryDate}
                    onChange={handleEditInputChange}
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Price
                  </label>
                  <Input
                    name='price'
                    value={editFormData.price}
                    onChange={handleEditInputChange}
                    placeholder='Enter price (e.g., ₹2.50)'
                    className='w-full'
                  />
                </div>
              </div>
              <div className='bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4'>
                <p className='text-sm text-amber-800'>
                  <span className='font-medium'>Note:</span> The drug status will be automatically updated based on the quantity values you provide.
                </p>
              </div>
            </div>
            <div className='mt-6 flex gap-3 justify-end'>
              <Button 
                onClick={() => setShowEditModal(false)} 
                variant='outline'
                className='border-gray-200 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmEdit}
                className='bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
              >
                <Edit className='h-4 w-4 mr-2' />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
