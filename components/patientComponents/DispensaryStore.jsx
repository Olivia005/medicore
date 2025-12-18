'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  ShoppingCart, 
  Search, 
  Pill, 
  Package, 
  CheckCircle,
  X,
  Plus,
  Minus,
  Trash2,
  Calendar,
  CreditCard,
  Truck,
  Filter
} from 'lucide-react'

export default function DispensaryStore() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Sample medicines data
  const medicines = [
    {
      id: 1,
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      price: 150,
      stock: 'In Stock',
      stockCount: 45,
      description: 'Antibiotic for bacterial infections',
      manufacturer: 'PharmaCorp'
    },
    {
      id: 2,
      name: 'Paracetamol 650mg',
      category: 'Pain Relief',
      price: 50,
      stock: 'In Stock',
      stockCount: 120,
      description: 'Pain reliever and fever reducer',
      manufacturer: 'MediLife'
    },
    {
      id: 3,
      name: 'Lisinopril 10mg',
      category: 'Blood Pressure',
      price: 280,
      stock: 'In Stock',
      stockCount: 30,
      description: 'ACE inhibitor for hypertension',
      manufacturer: 'CardioMed'
    },
    {
      id: 4,
      name: 'Omeprazole 20mg',
      category: 'Digestive',
      price: 180,
      stock: 'In Stock',
      stockCount: 60,
      description: 'Proton pump inhibitor',
      manufacturer: 'GastroHealth'
    },
    {
      id: 5,
      name: 'Metformin 500mg',
      category: 'Diabetes',
      price: 120,
      stock: 'Low Stock',
      stockCount: 8,
      description: 'Diabetes medication',
      manufacturer: 'DiabCare'
    },
    {
      id: 6,
      name: 'Cetirizine 10mg',
      category: 'Allergy',
      price: 80,
      stock: 'In Stock',
      stockCount: 95,
      description: 'Antihistamine for allergies',
      manufacturer: 'AllerFree'
    },
    {
      id: 7,
      name: 'Atorvastatin 20mg',
      category: 'Cholesterol',
      price: 320,
      stock: 'In Stock',
      stockCount: 40,
      description: 'Statin for cholesterol management',
      manufacturer: 'CardioMed'
    },
    {
      id: 8,
      name: 'Azithromycin 250mg',
      category: 'Antibiotics',
      price: 200,
      stock: 'Out of Stock',
      stockCount: 0,
      description: 'Macrolide antibiotic',
      manufacturer: 'PharmaCorp'
    }
  ]

  // Sample order history
  const orderHistory = [
    {
      id: 'ORD-2024-001',
      date: '2024-12-15',
      items: [
        { name: 'Paracetamol 650mg', quantity: 2, price: 50 },
        { name: 'Cetirizine 10mg', quantity: 1, price: 80 }
      ],
      total: 180,
      status: 'Delivered'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-12-10',
      items: [
        { name: 'Amoxicillin 500mg', quantity: 1, price: 150 }
      ],
      total: 150,
      status: 'Delivered'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-12-18',
      items: [
        { name: 'Omeprazole 20mg', quantity: 1, price: 180 },
        { name: 'Lisinopril 10mg', quantity: 1, price: 280 }
      ],
      total: 460,
      status: 'Processing'
    },
    {
      id: 'ORD-2024-004',
      date: '2024-12-05',
      items: [
        { name: 'Metformin 500mg', quantity: 3, price: 120 }
      ],
      total: 360,
      status: 'Delivered'
    }
  ]

  const categories = ['All', 'Antibiotics', 'Pain Relief', 'Blood Pressure', 'Digestive', 'Diabetes', 'Allergy', 'Cholesterol']

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory
    return matchesSearch && matchesCategory
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

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getStatusBadge = (status) => {
    const styles = {
      'Delivered': 'bg-green-100 text-green-700 border-green-200',
      'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
      'Shipped': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'Cancelled': 'bg-red-100 text-red-700 border-red-200'
    }
    return styles[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const getStockBadge = (stock) => {
    const styles = {
      'In Stock': 'bg-green-100 text-green-700 border-green-200',
      'Low Stock': 'bg-amber-100 text-amber-700 border-amber-200',
      'Out of Stock': 'bg-red-100 text-red-700 border-red-200'
    }
    return styles[stock] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2'>
              🏥 Dispensary Store
            </h1>
            <p className='text-gray-600'>Browse and purchase medicines online</p>
          </div>
          <Button
            onClick={() => setShowCart(true)}
            className='bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 relative'
          >
            <ShoppingCart className='h-5 w-5 mr-2' />
            Cart
            {cart.length > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold'>
                {cart.length}
              </span>
            )}
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className='p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <Input
                placeholder='Search medicines...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400'
              />
            </div>
            <div className='flex items-center gap-2'>
              <Filter className='h-5 w-5 text-gray-500' />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 bg-white'
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='relative overflow-hidden shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-10 -mr-16 -mt-16 transform scale-125'></div>
            <div className='p-6 relative z-10'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-semibold text-gray-600 mb-1'>Available Medicines</p>
                  <p className='text-3xl font-bold text-gray-900'>285</p>
                  <p className='text-xs text-emerald-600 font-medium mt-1'>8 categories</p>
                </div>
                <div className='bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-2xl'>
                  <Pill className='h-8 w-8 text-emerald-600' />
                </div>
              </div>
            </div>
          </Card>

          <Card className='relative overflow-hidden shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-10 -mr-16 -mt-16 transform scale-125'></div>
            <div className='p-6 relative z-10'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-semibold text-gray-600 mb-1'>Total Orders</p>
                  <p className='text-3xl font-bold text-gray-900'>{orderHistory.length}</p>
                  <p className='text-xs text-blue-600 font-medium mt-1'>This month</p>
                </div>
                <div className='bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl'>
                  <Package className='h-8 w-8 text-blue-600' />
                </div>
              </div>
            </div>
          </Card>

          <Card className='relative overflow-hidden shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full opacity-10 -mr-16 -mt-16 transform scale-125'></div>
            <div className='p-6 relative z-10'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-semibold text-gray-600 mb-1'>Cart Items</p>
                  <p className='text-3xl font-bold text-gray-900'>{cart.length}</p>
                  <p className='text-xs text-cyan-600 font-medium mt-1'>₹{getTotalAmount().toLocaleString()}</p>
                </div>
                <div className='bg-gradient-to-br from-cyan-100 to-cyan-200 p-4 rounded-2xl'>
                  <ShoppingCart className='h-8 w-8 text-cyan-600' />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Medicine Grid */}
        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <Pill className='h-6 w-6 text-emerald-600' />
            Available Medicines
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {filteredMedicines.map(medicine => (
              <Card key={medicine.id} className='shadow-lg border-0 bg-white overflow-hidden'>
                <div className='h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400'></div>
                <div className='p-5 space-y-4'>
                  <div>
                    <h3 className='font-semibold text-lg text-gray-900 mb-1'>
                      {medicine.name}
                    </h3>
                    <p className='text-sm text-gray-500'>{medicine.category}</p>
                  </div>

                  <div className='flex items-center justify-between'>
                    <p className='text-2xl font-bold text-gray-900'>₹{medicine.price}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStockBadge(medicine.stock)}`}>
                      {medicine.stock}
                    </span>
                  </div>

                  <div className='text-xs text-gray-500'>
                    Stock: {medicine.stockCount} units
                  </div>

                  <Button
                    onClick={() => addToCart(medicine)}
                    disabled={medicine.stock === 'Out of Stock'}
                    className={`w-full ${
                      medicine.stock === 'Out of Stock'
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-md hover:shadow-lg'
                    } text-white transition-all duration-200`}
                  >
                    <ShoppingCart className='h-4 w-4 mr-2' />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Order History */}
        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <Package className='h-6 w-6 text-blue-600' />
            Order History
          </h2>
          <Card className='shadow-lg border-0 overflow-hidden bg-white/80 backdrop-blur-sm'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50 border-b border-gray-200'>
                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700'>Order ID</th>
                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700'>Date</th>
                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700'>Items</th>
                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700'>Total Amount</th>
                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700'>Status</th>
                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order, index) => (
                    <tr 
                      key={order.id} 
                      className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-cyan-50/30 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{order.id}</td>
                      <td className='px-6 py-4 text-sm text-gray-600 flex items-center gap-2'>
                        <Calendar className='h-4 w-4 text-blue-500' />
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-600'>{order.items.length} items</td>
                      <td className='px-6 py-4 text-sm font-bold text-gray-900'>₹{order.total.toLocaleString()}</td>
                      <td className='px-6 py-4'>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <Button
                          onClick={() => handleViewOrder(order)}
                          size='sm'
                          className='bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200'
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 p-6 rounded-t-3xl shadow-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-2xl'>
                    <ShoppingCart className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white'>Shopping Cart</h3>
                    <p className='text-sm text-emerald-100'>{cart.length} items</p>
                  </div>
                </div>
                <button onClick={() => setShowCart(false)} className='text-white hover:text-emerald-100 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-xl'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 max-h-[60vh] overflow-y-auto'>
              {cart.length === 0 ? (
                <div className='text-center py-12'>
                  <ShoppingCart className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                  <p className='text-gray-500 text-lg'>Your cart is empty</p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {cart.map(item => (
                    <div key={item.id} className='flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-emerald-200 hover:shadow-md transition-all duration-200'>
                      <div className='flex-1'>
                        <h4 className='font-semibold text-gray-900'>{item.name}</h4>
                        <p className='text-sm text-gray-600'>{item.category}</p>
                        <p className='text-lg font-bold text-gray-900 mt-1'>₹{item.price}</p>
                      </div>
                      <div className='flex items-center gap-3 bg-white rounded-lg p-2 shadow-sm'>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className='p-1 hover:bg-red-100 rounded-lg transition-colors'
                        >
                          <Minus className='h-4 w-4 text-red-600' />
                        </button>
                        <span className='w-8 text-center font-bold text-gray-900'>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className='p-1 hover:bg-emerald-100 rounded-lg transition-colors'
                        >
                          <Plus className='h-4 w-4 text-emerald-600' />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='p-2 hover:bg-red-100 rounded-lg transition-colors'
                      >
                        <Trash2 className='h-5 w-5 text-red-600' />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className='border-t border-gray-200 p-6 bg-gradient-to-r from-emerald-50 to-cyan-50'>
                <div className='flex items-center justify-between mb-4'>
                  <span className='text-lg font-bold text-gray-900'>Total Amount:</span>
                  <span className='text-2xl font-bold text-gray-900'>₹{getTotalAmount().toLocaleString()}</span>
                </div>
                <Button className='w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-200'>
                  <CreditCard className='h-5 w-5 mr-2' />
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 p-6 rounded-t-3xl shadow-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-2xl'>
                    <Package className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white'>Order Details</h3>
                    <p className='text-sm text-emerald-100'>{selectedOrder.id}</p>
                  </div>
                </div>
                <button onClick={() => setShowOrderDetails(false)} className='text-white hover:text-emerald-100 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-xl'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 max-h-[70vh] overflow-y-auto space-y-6'>
              {/* Order Info */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200 hover:shadow-md transition-all duration-200'>
                  <p className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-emerald-600' />
                    Order Date
                  </p>
                  <p className='font-semibold text-gray-900'>{new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
                <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200'>
                  <p className='text-sm text-gray-600 mb-1 flex items-center gap-2'>
                    <Truck className='h-4 w-4 text-blue-600' />
                    Status
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <Package className='h-5 w-5 text-emerald-600' />
                  Order Items
                </h4>
                <div className='bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-gray-200 overflow-hidden'>
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-gradient-to-r from-emerald-100 to-cyan-100 border-b border-emerald-200'>
                        <th className='px-4 py-3 text-left text-sm font-bold text-gray-700'>Medicine</th>
                        <th className='px-4 py-3 text-center text-sm font-bold text-gray-700'>Quantity</th>
                        <th className='px-4 py-3 text-right text-sm font-bold text-gray-700'>Price</th>
                        <th className='px-4 py-3 text-right text-sm font-bold text-gray-700'>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className='border-b border-emerald-100 hover:bg-white/50 transition-colors'>
                          <td className='px-4 py-3 text-sm text-gray-900 font-medium'>{item.name}</td>
                          <td className='px-4 py-3 text-sm text-gray-600 text-center'>{item.quantity}</td>
                          <td className='px-4 py-3 text-sm text-gray-600 text-right'>₹{item.price}</td>
                          <td className='px-4 py-3 text-sm font-bold text-gray-900 text-right'>₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total */}
              <div className='bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50 rounded-xl p-4 border-2 border-emerald-200 shadow-md'>
                <div className='flex items-center justify-between'>
                  <span className='text-lg font-bold text-gray-900'>Total Amount</span>
                  <span className='text-2xl font-bold text-gray-900'>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className='border-t border-gray-200 p-6 flex gap-3'>
              <Button 
                onClick={() => setShowOrderDetails(false)}
                variant='outline'
                className='flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200'
              >
                Close
              </Button>
              <Button className='flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200'>
                <Truck className='h-4 w-4 mr-2' />
                Track Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
