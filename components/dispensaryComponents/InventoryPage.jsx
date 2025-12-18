'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Filter,
  Package,
  AlertTriangle,
  Calendar,
  TrendingDown,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  PackageX,
  Clock,
  CheckCircle,
  AlertCircle,
  Pill,
  FileText,
  BarChart3,
  DollarSign
} from 'lucide-react'

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    category: 'General',
    batch: '',
    stock: '',
    minStock: '',
    expiry: '',
    price: '',
    manufacturer: ''
  })

  // Sample inventory data
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'General',
      batch: 'BATCH001',
      stock: 450,
      minStock: 100,
      expiry: '2026-03-15',
      status: 'In Stock',
      price: 5.50,
      manufacturer: 'PharmaCorp'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotic',
      batch: 'BATCH002',
      stock: 75,
      minStock: 100,
      expiry: '2025-08-20',
      status: 'Low Stock',
      price: 12.00,
      manufacturer: 'MediLife'
    },
    {
      id: 3,
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      batch: 'BATCH003',
      stock: 0,
      minStock: 50,
      expiry: '2026-01-10',
      status: 'Out of Stock',
      price: 8.75,
      manufacturer: 'HealthPlus'
    },
    {
      id: 4,
      name: 'Cough Syrup',
      category: 'Syrup',
      batch: 'BATCH004',
      stock: 200,
      minStock: 80,
      expiry: '2025-12-25',
      status: 'Expiring Soon',
      price: 45.00,
      manufacturer: 'WellCare'
    },
    {
      id: 5,
      name: 'Vitamin D3',
      category: 'Supplement',
      batch: 'BATCH005',
      stock: 320,
      minStock: 150,
      expiry: '2027-06-30',
      status: 'In Stock',
      price: 25.00,
      manufacturer: 'VitaHealth'
    },
    {
      id: 6,
      name: 'Aspirin 75mg',
      category: 'Cardiovascular',
      batch: 'BATCH006',
      stock: 85,
      minStock: 100,
      expiry: '2026-02-14',
      status: 'Low Stock',
      price: 6.25,
      manufacturer: 'CardioCare'
    },
    {
      id: 7,
      name: 'Cetirizine 10mg',
      category: 'Antihistamine',
      batch: 'BATCH007',
      stock: 180,
      minStock: 100,
      expiry: '2025-12-30',
      status: 'Expiring Soon',
      price: 4.50,
      manufacturer: 'AllergyFree'
    },
    {
      id: 8,
      name: 'Metformin 500mg',
      category: 'Diabetes',
      batch: 'BATCH008',
      stock: 0,
      minStock: 120,
      expiry: '2026-05-18',
      status: 'Out of Stock',
      price: 15.00,
      manufacturer: 'DiabeCare'
    }
  ])

  // Calculate stats
  const stats = {
    total: inventory.length,
    lowStock: inventory.filter(item => item.stock > 0 && item.stock <= item.minStock).length,
    expiringSoon: inventory.filter(item => {
      const today = new Date()
      const expiryDate = new Date(item.expiry)
      const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24))
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0
    }).length,
    outOfStock: inventory.filter(item => item.stock === 0).length
  }

  // Filter inventory
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get status badge
  const getStatusBadge = (status, stock, expiry) => {
    if (status === 'Out of Stock') {
      return <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit'>
        <PackageX className='h-3 w-3' />
        Out of Stock
      </span>
    } else if (status === 'Low Stock') {
      return <span className='px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit'>
        <AlertTriangle className='h-3 w-3' />
        Low Stock
      </span>
    } else if (status === 'Expiring Soon') {
      return <span className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit'>
        <Clock className='h-3 w-3' />
        Expiring Soon
      </span>
    } else {
      return <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit'>
        <CheckCircle className='h-3 w-3' />
        In Stock
      </span>
    }
  }

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const days = Math.floor((expiry - today) / (1000 * 60 * 60 * 24))
    return days
  }

  // Handle add medicine
  const handleAddMedicine = () => {
    const newMedicine = {
      id: inventory.length + 1,
      name: formData.name,
      category: formData.category,
      batch: formData.batch,
      stock: parseInt(formData.stock),
      minStock: parseInt(formData.minStock),
      expiry: formData.expiry,
      price: parseFloat(formData.price),
      manufacturer: formData.manufacturer,
      status: parseInt(formData.stock) === 0 ? 'Out of Stock' : 
              parseInt(formData.stock) <= parseInt(formData.minStock) ? 'Low Stock' : 
              getDaysUntilExpiry(formData.expiry) <= 30 ? 'Expiring Soon' : 'In Stock'
    }
    setInventory([...inventory, newMedicine])
    setShowAddModal(false)
    resetForm()
  }

  // Handle update medicine
  const handleUpdateMedicine = () => {
    const updatedInventory = inventory.map(item => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          name: formData.name,
          category: formData.category,
          batch: formData.batch,
          stock: parseInt(formData.stock),
          minStock: parseInt(formData.minStock),
          expiry: formData.expiry,
          price: parseFloat(formData.price),
          manufacturer: formData.manufacturer,
          status: parseInt(formData.stock) === 0 ? 'Out of Stock' : 
                  parseInt(formData.stock) <= parseInt(formData.minStock) ? 'Low Stock' : 
                  getDaysUntilExpiry(formData.expiry) <= 30 ? 'Expiring Soon' : 'In Stock'
        }
      }
      return item
    })
    setInventory(updatedInventory)
    setShowEditModal(false)
    setEditingItem(null)
    resetForm()
  }

  // Handle delete medicine
  const handleDeleteMedicine = (id) => {
    if (confirm('Are you sure you want to delete this medicine from inventory?')) {
      setInventory(inventory.filter(item => item.id !== id))
    }
  }

  // Open edit modal
  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      batch: item.batch,
      stock: item.stock.toString(),
      minStock: item.minStock.toString(),
      expiry: item.expiry,
      price: item.price.toString(),
      manufacturer: item.manufacturer
    })
    setShowEditModal(true)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: 'General',
      batch: '',
      stock: '',
      minStock: '',
      expiry: '',
      price: '',
      manufacturer: ''
    })
  }

  // Get alerts
  const alerts = [
    ...inventory.filter(item => item.status === 'Low Stock').map(item => ({
      type: 'Low Stock',
      message: `${item.name} (${item.batch}) - Only ${item.stock} units remaining`,
      icon: AlertTriangle,
      color: 'orange'
    })),
    ...inventory.filter(item => item.status === 'Expiring Soon').map(item => ({
      type: 'Expiring Soon',
      message: `${item.name} (${item.batch}) - Expires in ${getDaysUntilExpiry(item.expiry)} days`,
      icon: Clock,
      color: 'yellow'
    })),
    ...inventory.filter(item => item.status === 'Out of Stock').map(item => ({
      type: 'Out of Stock',
      message: `${item.name} (${item.batch}) - Restock immediately`,
      icon: PackageX,
      color: 'red'
    }))
  ]

  return (
    <div className='p-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3'>
          <Package className='h-10 w-10 text-blue-600' />
          Inventory Management
        </h1>
        <p className='text-gray-600'>Stock & expiry management system</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <Package className='h-10 w-10 text-blue-600' />
            <BarChart3 className='h-6 w-6 text-blue-400' />
          </div>
          <p className='text-blue-700 font-semibold mb-1'>Total Medicines</p>
          <p className='text-4xl font-bold text-blue-900'>{stats.total}</p>
          <p className='text-xs text-blue-600 mt-2'>Active inventory items</p>
        </div>

        <div className='bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <AlertTriangle className='h-10 w-10 text-orange-600' />
            <TrendingDown className='h-6 w-6 text-orange-400' />
          </div>
          <p className='text-orange-700 font-semibold mb-1'>Low Stock</p>
          <p className='text-4xl font-bold text-orange-900'>{stats.lowStock}</p>
          <p className='text-xs text-orange-600 mt-2'>Need reordering</p>
        </div>

        <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <Calendar className='h-10 w-10 text-yellow-600' />
            <Clock className='h-6 w-6 text-yellow-400' />
          </div>
          <p className='text-yellow-700 font-semibold mb-1'>Expiring Soon</p>
          <p className='text-4xl font-bold text-yellow-900'>{stats.expiringSoon}</p>
          <p className='text-xs text-yellow-600 mt-2'>Within 30 days</p>
        </div>

        <div className='bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <PackageX className='h-10 w-10 text-red-600' />
            <AlertCircle className='h-6 w-6 text-red-400' />
          </div>
          <p className='text-red-700 font-semibold mb-1'>Out of Stock</p>
          <p className='text-4xl font-bold text-red-900'>{stats.outOfStock}</p>
          <p className='text-xs text-red-600 mt-2'>Immediate action required</p>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className='mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6'>
          <h3 className='text-xl font-bold text-red-900 mb-4 flex items-center gap-2'>
            <AlertCircle className='h-6 w-6' />
            Active Alerts ({alerts.length})
          </h3>
          <div className='space-y-3 max-h-60 overflow-y-auto'>
            {alerts.map((alert, index) => {
              const Icon = alert.icon
              const bgColor = alert.color === 'red' ? 'bg-red-50 border-red-300' :
                             alert.color === 'orange' ? 'bg-orange-50 border-orange-300' :
                             'bg-yellow-50 border-yellow-300'
              const textColor = alert.color === 'red' ? 'text-red-800' :
                               alert.color === 'orange' ? 'text-orange-800' :
                               'text-yellow-800'
              
              return (
                <div key={index} className={`flex items-center gap-3 p-4 ${bgColor} border-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${textColor} flex-shrink-0`} />
                  <div className='flex-1'>
                    <p className={`font-semibold ${textColor} text-sm`}>{alert.type}</p>
                    <p className={`text-xs ${textColor} opacity-80`}>{alert.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Filters and Actions */}
      <div className='bg-white border-2 border-gray-200 rounded-xl p-6 mb-6 shadow-md'>
        <div className='flex flex-col md:flex-row gap-4 items-end'>
          {/* Search */}
          <div className='flex-1'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Search</label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                type='text'
                placeholder='Search by medicine name, batch, or manufacturer...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 h-12'
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className='w-full md:w-48'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
            >
              <option value='all'>All Categories</option>
              <option value='General'>General</option>
              <option value='Antibiotic'>Antibiotic</option>
              <option value='Pain Relief'>Pain Relief</option>
              <option value='Syrup'>Syrup</option>
              <option value='Supplement'>Supplement</option>
              <option value='Cardiovascular'>Cardiovascular</option>
              <option value='Antihistamine'>Antihistamine</option>
              <option value='Diabetes'>Diabetes</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className='w-full md:w-48'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
            >
              <option value='all'>All Status</option>
              <option value='In Stock'>In Stock</option>
              <option value='Low Stock'>Low Stock</option>
              <option value='Expiring Soon'>Expiring Soon</option>
              <option value='Out of Stock'>Out of Stock</option>
            </select>
          </div>

          {/* Add Button */}
          <Button
            onClick={() => setShowAddModal(true)}
            className='h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6'
          >
            <Plus className='h-5 w-5 mr-2' />
            Add Medicine
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className='bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-md'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gradient-to-r from-blue-600 to-blue-700 text-white'>
              <tr>
                <th className='px-6 py-4 text-left text-sm font-bold'>Medicine</th>
                <th className='px-6 py-4 text-left text-sm font-bold'>Category</th>
                <th className='px-6 py-4 text-left text-sm font-bold'>Batch No.</th>
                <th className='px-6 py-4 text-center text-sm font-bold'>Stock</th>
                <th className='px-6 py-4 text-left text-sm font-bold'>Expiry Date</th>
                <th className='px-6 py-4 text-left text-sm font-bold'>Status</th>
                <th className='px-6 py-4 text-right text-sm font-bold'>Price</th>
                <th className='px-6 py-4 text-center text-sm font-bold'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan='8' className='px-6 py-12 text-center'>
                    <Package className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                    <p className='text-gray-500 font-semibold'>No medicines found</p>
                    <p className='text-sm text-gray-400'>Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => {
                  const daysUntilExpiry = getDaysUntilExpiry(item.expiry)
                  return (
                    <tr key={item.id} className='hover:bg-blue-50 transition-colors'>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-blue-100 rounded-lg'>
                            <Pill className='h-5 w-5 text-blue-600' />
                          </div>
                          <div>
                            <p className='font-bold text-gray-900'>{item.name}</p>
                            <p className='text-xs text-gray-500'>{item.manufacturer}</p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold'>
                          {item.category}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='font-mono text-sm font-semibold text-gray-700'>{item.batch}</span>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <div className='flex flex-col items-center'>
                          <span className={`text-2xl font-bold ${
                            item.stock === 0 ? 'text-red-600' : 
                            item.stock <= item.minStock ? 'text-orange-600' : 
                            'text-green-600'
                          }`}>
                            {item.stock}
                          </span>
                          <span className='text-xs text-gray-500'>Min: {item.minStock}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-2'>
                          <Calendar className={`h-4 w-4 ${
                            daysUntilExpiry <= 30 ? 'text-red-600' : 'text-gray-400'
                          }`} />
                          <div>
                            <p className='font-semibold text-gray-900 text-sm'>{item.expiry}</p>
                            <p className={`text-xs ${
                              daysUntilExpiry <= 30 ? 'text-red-600 font-semibold' : 'text-gray-500'
                            }`}>
                              {daysUntilExpiry} days left
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        {getStatusBadge(item.status, item.stock, item.expiry)}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <div className='flex items-center justify-end gap-1'>
                          <DollarSign className='h-4 w-4 text-green-600' />
                          <span className='text-lg font-bold text-gray-900'>₹{item.price.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <Button
                            onClick={() => openEditModal(item)}
                            size='sm'
                            className='bg-blue-600 hover:bg-blue-700 text-white'
                          >
                            <Edit className='h-4 w-4' />
                          </Button>
                          <Button
                            onClick={() => handleDeleteMedicine(item.id)}
                            size='sm'
                            variant='destructive'
                            className='bg-red-600 hover:bg-red-700'
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
            <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Plus className='h-8 w-8' />
                  <div>
                    <h3 className='text-2xl font-bold'>Add New Medicine</h3>
                    <p className='text-sm text-blue-100'>Add medicine to inventory</p>
                  </div>
                </div>
                <button onClick={() => { setShowAddModal(false); resetForm(); }} className='text-white hover:text-blue-100'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Medicine Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='e.g., Paracetamol 500mg'
                    className='h-11'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className='w-full h-11 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
                  >
                    <option value='General'>General</option>
                    <option value='Antibiotic'>Antibiotic</option>
                    <option value='Pain Relief'>Pain Relief</option>
                    <option value='Syrup'>Syrup</option>
                    <option value='Supplement'>Supplement</option>
                    <option value='Cardiovascular'>Cardiovascular</option>
                    <option value='Antihistamine'>Antihistamine</option>
                    <option value='Diabetes'>Diabetes</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Batch Number *</label>
                  <Input
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    placeholder='e.g., BATCH009'
                    className='h-11'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Manufacturer *</label>
                  <Input
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    placeholder='e.g., PharmaCorp'
                    className='h-11'
                  />
                </div>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Stock Quantity *</label>
                  <Input
                    type='number'
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder='0'
                    className='h-11'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Min Stock Level *</label>
                  <Input
                    type='number'
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                    placeholder='0'
                    className='h-11'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Price (₹) *</label>
                  <Input
                    type='number'
                    step='0.01'
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder='0.00'
                    className='h-11'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Expiry Date *</label>
                <Input
                  type='date'
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  className='h-11'
                />
              </div>
            </div>

            <div className='flex gap-3 p-6 bg-gray-50 rounded-b-xl border-t-2 border-gray-200'>
              <Button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                variant='outline'
                className='flex-1 h-12'
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddMedicine}
                className='flex-1 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
              >
                <Save className='h-5 w-5 mr-2' />
                Add Medicine
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Medicine Modal */}
      {showEditModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
            <div className='bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-t-xl'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Edit className='h-8 w-8' />
                  <div>
                    <h3 className='text-2xl font-bold'>Update Medicine</h3>
                    <p className='text-sm text-orange-100'>Edit medicine details</p>
                  </div>
                </div>
                <button onClick={() => { setShowEditModal(false); setEditingItem(null); resetForm(); }} className='text-white hover:text-orange-100'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Medicine Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='e.g., Paracetamol 500mg'
                    className='h-11'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className='w-full h-11 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
                  >
                    <option value='General'>General</option>
                    <option value='Antibiotic'>Antibiotic</option>
                    <option value='Pain Relief'>Pain Relief</option>
                    <option value='Syrup'>Syrup</option>
                    <option value='Supplement'>Supplement</option>
                    <option value='Cardiovascular'>Cardiovascular</option>
                    <option value='Antihistamine'>Antihistamine</option>
                    <option value='Diabetes'>Diabetes</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Batch Number *</label>
                  <Input
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    placeholder='e.g., BATCH009'
                    className='h-11'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Manufacturer *</label>
                  <Input
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    placeholder='e.g., PharmaCorp'
                    className='h-11'
                  />
                </div>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Stock Quantity *</label>
                  <Input
                    type='number'
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder='0'
                    className='h-11'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Min Stock Level *</label>
                  <Input
                    type='number'
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                    placeholder='0'
                    className='h-11'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Price (₹) *</label>
                  <Input
                    type='number'
                    step='0.01'
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder='0.00'
                    className='h-11'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Expiry Date *</label>
                <Input
                  type='date'
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  className='h-11'
                />
              </div>
            </div>

            <div className='flex gap-3 p-6 bg-gray-50 rounded-b-xl border-t-2 border-gray-200'>
              <Button
                onClick={() => { setShowEditModal(false); setEditingItem(null); resetForm(); }}
                variant='outline'
                className='flex-1 h-12'
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateMedicine}
                className='flex-1 h-12 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'
              >
                <Save className='h-5 w-5 mr-2' />
                Update Medicine
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
