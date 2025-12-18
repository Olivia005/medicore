'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Filter,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Wallet,
  Smartphone,
  FileText,
  Package,
  AlertTriangle,
  Calendar,
  DollarSign,
  X,
  Printer,
  Download,
  CheckCircle,
  Pill,
  Clock,
  Shield,
  Tag,
  TrendingDown,
  Info,
  User,
  Phone,
  Mail,
  MapPin,
  Percent,
  AlertCircle
} from 'lucide-react'

export default function BuyOrderPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterBrand, setFilterBrand] = useState('all')
  const [cart, setCart] = useState([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMode, setPaymentMode] = useState('cash')
  const [showInvoice, setShowInvoice] = useState(false)
  const [invoiceData, setInvoiceData] = useState(null)

  // Sample medicines data
  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 650mg',
      category: 'Pain Relief',
      brand: 'Crocin',
      price: 15,
      stock: 500,
      expiryDate: '2026-12-31',
      description: 'Fever and pain relief',
      dosage: '1-2 tablets every 4-6 hours',
      requiresPrescription: false
    },
    {
      id: 2,
      name: 'Amoxicillin 500mg',
      category: 'Antibiotic',
      brand: 'Amoxil',
      price: 450,
      stock: 120,
      expiryDate: '2025-06-30',
      description: 'Bacterial infection treatment',
      dosage: 'As prescribed by doctor',
      requiresPrescription: true
    },
    {
      id: 3,
      name: 'Vitamin D3 60K',
      category: 'Supplement',
      brand: 'HealthVit',
      price: 250,
      stock: 200,
      expiryDate: '2027-03-15',
      description: 'Vitamin D supplement',
      dosage: '1 capsule weekly',
      requiresPrescription: false
    },
    {
      id: 4,
      name: 'Cetrizine 10mg',
      category: 'Allergy',
      brand: 'Ceteze',
      price: 80,
      stock: 300,
      expiryDate: '2026-09-20',
      description: 'Allergy relief',
      dosage: '1 tablet daily',
      requiresPrescription: false
    },
    {
      id: 5,
      name: 'Omeprazole 20mg',
      category: 'Gastric',
      brand: 'Omez',
      price: 120,
      stock: 180,
      expiryDate: '2026-11-10',
      description: 'Acid reflux treatment',
      dosage: '1 capsule before breakfast',
      requiresPrescription: false
    },
    {
      id: 6,
      name: 'Azithromycin 500mg',
      category: 'Antibiotic',
      brand: 'Azee',
      price: 280,
      stock: 90,
      expiryDate: '2025-04-15',
      description: 'Antibiotic for respiratory infections',
      dosage: 'As prescribed by doctor',
      requiresPrescription: true
    },
    {
      id: 7,
      name: 'Multivitamin Tablets',
      category: 'Supplement',
      brand: 'Revital',
      price: 350,
      stock: 250,
      expiryDate: '2027-01-20',
      description: 'Daily multivitamin supplement',
      dosage: '1 tablet daily after meal',
      requiresPrescription: false
    },
    {
      id: 8,
      name: 'Insulin Pen',
      category: 'Diabetic',
      brand: 'Lantus',
      price: 1200,
      stock: 45,
      expiryDate: '2025-08-30',
      description: 'Long-acting insulin',
      dosage: 'As prescribed by doctor',
      requiresPrescription: true
    },
    {
      id: 9,
      name: 'Cough Syrup',
      category: 'Respiratory',
      brand: 'Benadryl',
      price: 120,
      stock: 150,
      expiryDate: '2026-05-25',
      description: 'Relief from cough and cold',
      dosage: '2 teaspoons 3 times daily',
      requiresPrescription: false
    },
    {
      id: 10,
      name: 'Blood Pressure Medicine',
      category: 'Cardiac',
      brand: 'Telma',
      price: 180,
      stock: 8,
      expiryDate: '2025-03-10',
      description: 'Blood pressure management',
      dosage: '1 tablet daily',
      requiresPrescription: true
    },
    {
      id: 11,
      name: 'Aspirin 75mg',
      category: 'Cardiac',
      brand: 'Ecosprin',
      price: 50,
      stock: 400,
      expiryDate: '2027-02-28',
      description: 'Heart health and blood thinner',
      dosage: '1 tablet daily',
      requiresPrescription: false
    },
    {
      id: 12,
      name: 'Calcium Tablets',
      category: 'Supplement',
      brand: 'Shelcal',
      price: 180,
      stock: 220,
      expiryDate: '2026-10-15',
      description: 'Bone health supplement',
      dosage: '1 tablet twice daily',
      requiresPrescription: false
    }
  ]

  const getExpiryWarning = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) {
      return { level: 'expired', message: 'EXPIRED', color: 'red' }
    } else if (daysUntilExpiry < 90) {
      return { level: 'warning', message: `Expires in ${daysUntilExpiry} days`, color: 'orange' }
    } else if (daysUntilExpiry < 180) {
      return { level: 'caution', message: `Expires in ${Math.floor(daysUntilExpiry / 30)} months`, color: 'yellow' }
    }
    return { level: 'safe', message: 'Good expiry', color: 'green' }
  }

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return { status: 'Out of Stock', color: 'red', icon: AlertTriangle }
    } else if (stock < 50) {
      return { status: 'Low Stock', color: 'orange', icon: AlertTriangle }
    }
    return { status: 'In Stock', color: 'green', icon: CheckCircle }
  }

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || medicine.category === filterCategory
    const matchesBrand = filterBrand === 'all' || medicine.brand === filterBrand
    
    return matchesSearch && matchesCategory && matchesBrand
  })

  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id)
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }])
    }
  }

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.05 // 5% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleCheckout = () => {
    const invoice = {
      invoiceNumber: 'INV-' + Date.now(),
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN'),
      items: cart,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      paymentMode: paymentMode
    }
    
    setInvoiceData(invoice)
    setShowInvoice(true)
    setCart([])
    setShowCheckout(false)
  }

  const categories = ['all', ...new Set(medicines.map(m => m.category))]
  const brands = ['all', ...new Set(medicines.map(m => m.brand))]

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-blue-100 rounded-xl'>
                <ShoppingCart className='h-8 w-8 text-blue-600' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>Buy / Order Medicine</h1>
                <p className='text-gray-600'>Counter sales & patient medicine purchase</p>
              </div>
            </div>
            
            {/* Cart Badge */}
            <div className='relative'>
              <Button
                onClick={() => {
                  if (cart.length > 0) {
                    setShowCheckout(!showCheckout)
                  } else {
                    alert('Your cart is empty! Add some medicines to continue.')
                  }
                }}
                className={`${
                  cart.length > 0 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 hover:bg-gray-500'
                } text-white relative transition-all duration-300`}
                size='lg'
              >
                <ShoppingCart className='h-5 w-5 mr-2' />
                View Cart
                {cart.length > 0 && (
                  <span className='absolute -top-2 -right-2 bg-orange-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold animate-pulse'>
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
              
              {/* Cart Summary Tooltip */}
              {cart.length > 0 && (
                <div className='absolute top-full right-0 mt-2 bg-white border-2 border-blue-300 rounded-lg shadow-lg p-3 min-w-[200px] z-10'>
                  <div className='text-sm text-gray-700 space-y-1'>
                    <div className='flex justify-between font-semibold'>
                      <span>Items:</span>
                      <span className='text-blue-600'>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>
                    <div className='flex justify-between font-semibold border-t pt-1'>
                      <span>Total:</span>
                      <span className='text-green-600'>₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className='bg-white border-2 border-gray-200 rounded-xl p-6 mb-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Filter className='h-5 w-5 text-blue-600' />
            <h3 className='text-lg font-bold text-gray-900'>Search & Filters</h3>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                placeholder='Search by medicine name or brand...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 border-gray-300'
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium'
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Brand Filter */}
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium'
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand === 'all' ? 'All Brands' : brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Medicine Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {filteredMedicines.map((medicine) => {
            const expiryWarning = getExpiryWarning(medicine.expiryDate)
            const stockStatus = getStockStatus(medicine.stock)
            const StockIcon = stockStatus.icon

            return (
              <div 
                key={medicine.id} 
                className='bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-lg transition-all duration-300'
              >
                {/* Medicine Header */}
                <div className='mb-3'>
                  <div className='flex items-start justify-between mb-2'>
                    <Pill className='h-8 w-8 text-blue-600' />
                    {medicine.requiresPrescription && (
                      <span className='px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-300 flex items-center gap-1'>
                        <Shield className='h-3 w-3' />
                        Rx
                      </span>
                    )}
                  </div>
                  <h3 className='font-bold text-gray-900 text-lg mb-1'>{medicine.name}</h3>
                  <p className='text-sm text-gray-600'>{medicine.description}</p>
                </div>

                {/* Category & Brand */}
                <div className='flex items-center gap-2 mb-3'>
                  <span className='px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full border border-purple-300'>
                    {medicine.category}
                  </span>
                  <span className='px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-300'>
                    {medicine.brand}
                  </span>
                </div>

                {/* Price */}
                <div className='mb-3'>
                  <div className='flex items-baseline gap-1'>
                    
                    <span className='text-2xl font-bold text-black'>₹{medicine.price}</span>
                    <span className='text-sm text-gray-500'>per unit</span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className='mb-3'>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 ${
                    stockStatus.color === 'green' ? 'bg-green-50 border-green-300 text-green-700' :
                    stockStatus.color === 'orange' ? 'bg-orange-50 border-orange-300 text-orange-700' :
                    'bg-red-50 border-red-300 text-red-700'
                  }`}>
                    <StockIcon className='h-4 w-4' />
                    <span className='text-sm font-semibold'>{stockStatus.status}</span>
                    <span className='text-sm'>({medicine.stock} units)</span>
                  </div>
                </div>

                {/* Expiry Warning */}
                <div className='mb-3'>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 ${
                    expiryWarning.color === 'green' ? 'bg-green-50 border-green-300 text-green-700' :
                    expiryWarning.color === 'yellow' ? 'bg-yellow-50 border-yellow-300 text-yellow-700' :
                    expiryWarning.color === 'orange' ? 'bg-orange-50 border-orange-300 text-orange-700' :
                    'bg-red-50 border-red-300 text-red-700'
                  }`}>
                    <Calendar className='h-4 w-4' />
                    <span className='text-xs font-semibold'>{expiryWarning.message}</span>
                  </div>
                </div>

                {/* Dosage Info */}
                <div className='mb-4 p-2 bg-gray-50 rounded-lg'>
                  <p className='text-xs text-gray-600 flex items-start gap-1'>
                    <Clock className='h-3 w-3 mt-0.5' />
                    <span>{medicine.dosage}</span>
                  </p>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => addToCart(medicine)}
                  disabled={medicine.stock === 0}
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Add to Cart
                </Button>
              </div>
            )
          })}
        </div>

        {filteredMedicines.length === 0 && (
          <div className='text-center py-16 bg-white rounded-xl border-2 border-gray-200'>
            <Package className='h-16 w-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-xl font-bold text-gray-900 mb-2'>No Medicines Found</h3>
            <p className='text-gray-600'>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Checkout Sidebar */}
      {showCheckout && cart.length > 0 && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end'>
          <div className='bg-white h-full w-full max-w-lg overflow-y-auto shadow-2xl'>
            {/* Header */}
            <div className='sticky top-0 bg-blue-600 text-white p-6 border-b-2 border-blue-700'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-white/20 rounded-lg'>
                    <ShoppingCart className='h-6 w-6' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold'>Shopping Cart</h3>
                    <p className='text-sm text-blue-100'>{cart.length} items</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className='text-white hover:text-blue-100 transition-colors'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Prescription Alert */}
              {cart.some(item => item.requiresPrescription) && (
                <div className='p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl'>
                  <div className='flex items-start gap-3'>
                    <AlertCircle className='h-6 w-6 text-red-600 mt-0.5 flex-shrink-0' />
                    <div>
                      <h4 className='font-bold text-red-900 mb-1'>Prescription Required</h4>
                      <p className='text-sm text-red-700 mb-2'>
                        Your cart contains medicines that require a valid prescription:
                      </p>
                      <ul className='text-sm text-red-800 space-y-1'>
                        {cart
                          .filter(item => item.requiresPrescription)
                          .map(item => (
                            <li key={item.id} className='flex items-center gap-2'>
                              <Pill className='h-3 w-3' />
                              {item.name}
                            </li>
                          ))}
                      </ul>
                      <p className='text-xs text-red-600 mt-3 font-semibold'>
                        ⚠️ Upload prescription before checkout or remove these items
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Type Selection */}
              <div className='p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl'>
                <h4 className='font-bold text-purple-900 mb-4 flex items-center gap-2 text-lg'>
                  <Package className='h-5 w-5 text-purple-600' />
                  Order Type
                </h4>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='p-4 bg-white rounded-lg border-2 border-purple-500 shadow-md'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center'>
                        <CheckCircle className='h-4 w-4 text-white' />
                      </div>
                      <span className='font-bold text-purple-900'>Counter Sale</span>
                    </div>
                    <p className='text-xs text-purple-700'>Immediate pickup from dispensary</p>
                  </div>
                  
                  <div className='p-4 bg-gray-100 rounded-lg border-2 border-gray-300 opacity-60 cursor-not-allowed'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='h-5 w-5 rounded-full bg-gray-400 flex items-center justify-center'>
                        <Package className='h-4 w-4 text-white' />
                      </div>
                      <span className='font-bold text-gray-600'>Home Delivery</span>
                    </div>
                    <p className='text-xs text-gray-500'>Coming Soon</p>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className='space-y-3'>
                {cart.map((item) => (
                  <div key={item.id} className='bg-white border-2 border-gray-200 rounded-lg p-4'>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex-1'>
                        <h4 className='font-bold text-gray-900'>{item.name}</h4>
                        <p className='text-sm text-gray-600'>{item.brand}</p>
                        <p className='text-lg font-bold text-green-600 mt-1'>₹{item.price} × {item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='text-red-600 hover:text-red-700 p-1'
                      >
                        <Trash2 className='h-5 w-5' />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className='flex items-center gap-3'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => updateQuantity(item.id, -1)}
                        className='border-gray-300'
                      >
                        <Minus className='h-3 w-3' />
                      </Button>
                      <span className='text-lg font-bold text-gray-900 min-w-[3rem] text-center'>
                        {item.quantity}
                      </span>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => updateQuantity(item.id, 1)}
                        className='border-gray-300'
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className='h-3 w-3' />
                      </Button>
                      <div className='flex-1 text-right'>
                        <span className='text-xl font-bold text-blue-600'>
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Details */}
              <div className='bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-xl p-5 shadow-md'>
                <h4 className='font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg'>
                  <User className='h-5 w-5 text-purple-600' />
                  Customer Details
                </h4>
                <div className='space-y-3'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      Customer Name *
                    </label>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                      <Input
                        placeholder='Enter customer name'
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className='pl-10 border-purple-300 focus:border-purple-500'
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      Phone Number *
                    </label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                      <Input
                        placeholder='Enter phone number'
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className='pl-10 border-purple-300 focus:border-purple-500'
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-4 p-3 bg-purple-100 border border-purple-300 rounded-lg'>
                  <p className='text-xs text-purple-800 flex items-start gap-2'>
                    <Info className='h-4 w-4 flex-shrink-0 mt-0.5' />
                    <span>
                      Customer information is required for maintaining medical records.
                    </span>
                  </p>
                </div>
              </div>

              {/* Discount Section */}
              <div className='bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-5 shadow-md'>
                <div className='flex items-center justify-between mb-3'>
                  <h4 className='font-bold text-gray-900 flex items-center gap-2 text-lg'>
                    <Tag className='h-5 w-5 text-green-600' />
                    Apply Discount
                  </h4>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={applyDiscount}
                      onChange={(e) => {
                        setApplyDiscount(e.target.checked)
                        if (!e.target.checked) setDiscountPercent(0)
                      }}
                      className='w-5 h-5 text-green-600 rounded'
                    />
                    <span className='text-sm font-semibold text-gray-700'>Enable</span>
                  </label>
                </div>
                {applyDiscount && (
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      Discount Percentage
                    </label>
                    <div className='flex items-center gap-2'>
                      <div className='relative flex-1'>
                        <Percent className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                        <Input
                          type='number'
                          placeholder='Enter discount %'
                          value={discountPercent}
                          onChange={(e) => {
                            const val = Math.min(100, Math.max(0, Number(e.target.value)))
                            setDiscountPercent(val)
                          }}
                          className='pl-10 border-green-300 focus:border-green-500'
                          min='0'
                          max='100'
                        />
                      </div>
                      <div className='text-right min-w-[100px]'>
                        <p className='text-xs text-gray-600'>You save</p>
                        <p className='text-lg font-bold text-green-600'>
                          ₹{calculateDiscount().toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Summary */}
              <div className='bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 rounded-xl p-5 shadow-md'>
                <h4 className='font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg'>
                  <FileText className='h-5 w-5 text-blue-600' />
                  Bill Summary
                </h4>
                <div className='space-y-3'>
                  <div className='flex justify-between text-gray-700'>
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                    <span className='font-semibold text-lg'>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  {applyDiscount && calculateDiscount() > 0 && (
                    <div className='flex justify-between text-green-700'>
                      <span className='flex items-center gap-2'>
                        <TrendingDown className='h-4 w-4' />
                        Discount ({discountPercent}%):
                      </span>
                      <span className='font-semibold text-lg'>-₹{calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className='flex justify-between text-gray-700'>
                    <span>GST (5%):</span>
                    <span className='font-semibold text-lg'>₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <div className='border-t-2 border-gray-300 pt-3 flex justify-between items-center'>
                    <span className='text-xl font-bold text-gray-900'>Grand Total:</span>
                    <div className='text-right'>
                      <span className='text-3xl font-bold text-green-600 drop-shadow-sm'>
                        ₹{calculateTotal().toFixed(2)}
                      </span>
                      <p className='text-xs text-gray-600 mt-1'>Inclusive of all taxes</p>
                    </div>
                  </div>
                </div>
                <div className='mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg'>
                  <p className='text-xs text-blue-700 flex items-center gap-2'>
                    <Info className='h-3 w-3' />
                    All prices are final. GST is included in the total amount.
                  </p>
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <h4 className='font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg'>
                  <CreditCard className='h-5 w-5 text-blue-600' />
                  Select Payment Mode
                </h4>
                <div className='grid grid-cols-2 gap-3'>
                  <button
                    onClick={() => setPaymentMode('cash')}
                    className={`p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-300 transform hover:scale-105 ${
                      paymentMode === 'cash'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg'
                        : 'border-gray-300 hover:border-blue-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className={`p-3 rounded-full ${
                      paymentMode === 'cash' ? 'bg-blue-200' : 'bg-gray-100'
                    }`}>
                      <Wallet className='h-7 w-7' />
                    </div>
                    <span className='font-bold'>Cash</span>
                  </button>

                  <button
                    onClick={() => setPaymentMode('upi')}
                    className={`p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-300 transform hover:scale-105 ${
                      paymentMode === 'upi'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg'
                        : 'border-gray-300 hover:border-blue-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className={`p-3 rounded-full ${
                      paymentMode === 'upi' ? 'bg-blue-200' : 'bg-gray-100'
                    }`}>
                      <Smartphone className='h-7 w-7' />
                    </div>
                    <span className='font-bold'>UPI</span>
                  </button>

                  <button
                    onClick={() => setPaymentMode('card')}
                    className={`p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-300 transform hover:scale-105 ${
                      paymentMode === 'card'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg'
                        : 'border-gray-300 hover:border-blue-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className={`p-3 rounded-full ${
                      paymentMode === 'card' ? 'bg-blue-200' : 'bg-gray-100'
                    }`}>
                      <CreditCard className='h-7 w-7' />
                    </div>
                    <span className='font-bold'>Card</span>
                  </button>

                  <button
                    onClick={() => setPaymentMode('insurance')}
                    className={`p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-300 transform hover:scale-105 ${
                      paymentMode === 'insurance'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg'
                        : 'border-gray-300 hover:border-blue-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className={`p-3 rounded-full ${
                      paymentMode === 'insurance' ? 'bg-blue-200' : 'bg-gray-100'
                    }`}>
                      <Shield className='h-7 w-7' />
                    </div>
                    <span className='font-bold'>Insurance</span>
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg py-7 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300'
              >
                <CheckCircle className='h-6 w-6 mr-2' />
                Complete Checkout - ₹{calculateTotal().toFixed(2)}
              </Button>
              
              {/* Security Notice */}
              <div className='p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                <p className='text-xs text-blue-700 text-center flex items-center justify-center gap-2'>
                  <Shield className='h-4 w-4' />
                  Secure payment • 100% Safe & Encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoice && invoiceData && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
            {/* Invoice Header */}
            <div className='bg-green-600 text-white p-6 rounded-t-xl'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-white/20 rounded-lg'>
                    <CheckCircle className='h-8 w-8' />
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold'>Payment Successful!</h3>
                    <p className='text-sm text-green-100'>Invoice generated successfully</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowInvoice(false)
                    setInvoiceData(null)
                  }}
                  className='text-white hover:text-green-100'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-8' id='invoice-content'>
              {/* Invoice Details */}
              <div className='border-b-2 border-gray-200 pb-6 mb-6'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h4 className='text-3xl font-bold text-gray-900 mb-2'>MEDICORE</h4>
                    <p className='text-gray-600'>Medical Store & Pharmacy</p>
                    <p className='text-sm text-gray-500'>123 Healthcare Street, Medical District</p>
                    <p className='text-sm text-gray-500'>Phone: +91 1234567890</p>
                    <p className='text-sm text-gray-500'>Email: sales@medicore.com</p>
                  </div>
                  <div className='text-right'>
                    <div className='bg-blue-100 text-blue-900 px-4 py-2 rounded-lg mb-2'>
                      <p className='text-sm font-semibold'>Invoice Number</p>
                      <p className='text-lg font-bold'>{invoiceData.invoiceNumber}</p>
                    </div>
                    <p className='text-sm text-gray-600'>Date: {invoiceData.date}</p>
                    <p className='text-sm text-gray-600'>Time: {invoiceData.time}</p>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              {invoiceData.customerName && (
                <div className='bg-purple-50 border-2 border-purple-200 rounded-xl p-5 mb-6'>
                  <h5 className='font-bold text-purple-900 mb-3 flex items-center gap-2'>
                    <User className='h-5 w-5' />
                    Customer Details
                  </h5>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <p className='text-purple-700 font-semibold'>Name:</p>
                      <p className='text-purple-900'>{invoiceData.customerName}</p>
                    </div>
                    <div>
                      <p className='text-purple-700 font-semibold'>Phone:</p>
                      <p className='text-purple-900'>{invoiceData.customerPhone}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Items Table */}
              <table className='w-full mb-6'>
                <thead>
                  <tr className='bg-gray-100 border-b-2 border-gray-300'>
                    <th className='px-4 py-3 text-left text-sm font-bold text-gray-700'>Item</th>
                    <th className='px-4 py-3 text-center text-sm font-bold text-gray-700'>Qty</th>
                    <th className='px-4 py-3 text-right text-sm font-bold text-gray-700'>Price</th>
                    <th className='px-4 py-3 text-right text-sm font-bold text-gray-700'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={index} className='border-b border-gray-200'>
                      <td className='px-4 py-3'>
                        <p className='font-semibold text-gray-900'>{item.name}</p>
                        <p className='text-sm text-gray-600'>{item.brand}</p>
                      </td>
                      <td className='px-4 py-3 text-center font-semibold'>{item.quantity}</td>
                      <td className='px-4 py-3 text-right'>₹{item.price.toFixed(2)}</td>
                      <td className='px-4 py-3 text-right font-semibold'>₹{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className='border-t-2 border-gray-300 pt-4 space-y-2'>
                <div className='flex justify-between text-gray-700'>
                  <span>Subtotal:</span>
                  <span className='font-semibold'>₹{invoiceData.subtotal.toFixed(2)}</span>
                </div>
                {invoiceData.discount > 0 && (
                  <div className='flex justify-between text-green-700'>
                    <span className='flex items-center gap-2'>
                      <TrendingDown className='h-4 w-4' />
                      Discount ({((invoiceData.discount / invoiceData.subtotal) * 100).toFixed(0)}%):
                    </span>
                    <span className='font-semibold'>- ₹{invoiceData.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className='flex justify-between text-gray-700'>
                  <span>GST (5%):</span>
                  <span className='font-semibold'>₹{invoiceData.tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-300'>
                  <span>Total Paid:</span>
                  <span className='text-green-600'>₹{invoiceData.total.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm text-gray-600'>
                  <span>Payment Mode:</span>
                  <span className='font-semibold uppercase'>{invoiceData.paymentMode}</span>
                </div>
                {invoiceData.discount > 0 && (
                  <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
                    <p className='text-sm text-green-800 font-semibold flex items-center gap-2'>
                      <Tag className='h-4 w-4' />
                      You saved ₹{invoiceData.discount.toFixed(2)} on this purchase!
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className='mt-8 pt-6 border-t-2 border-gray-200 text-center text-sm text-gray-600'>
                <p className='font-semibold mb-2'>Thank you for your purchase!</p>
                <p className='mb-2'>For any queries, please contact us at support@medicore.com</p>
                <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                  <p className='text-xs text-blue-800 font-semibold mb-1'>Store Policy:</p>
                  <p className='text-xs text-blue-700'>
                    • No returns on medicines without proper authorization<br/>
                    • Please check expiry dates before purchase<br/>
                    • Keep prescription for future reference
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 p-6 bg-gray-50 rounded-b-xl border-t-2 border-gray-200'>
              <Button
                onClick={() => window.print()}
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white'
              >
                <Printer className='h-4 w-4 mr-2' />
                Print Invoice
              </Button>
              <Button
                onClick={() => {
                  // In a real app, this would trigger a download
                  alert('Download functionality would be implemented here')
                }}
                variant='outline'
                className='flex-1 border-blue-300 text-blue-600 hover:bg-blue-50'
              >
                <Download className='h-4 w-4 mr-2' />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
