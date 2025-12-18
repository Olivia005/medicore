'use client'
import { useState } from 'react'
import {
  Search,
  Filter,
  Plus,
  Settings,
  Eye,
  Edit,
  Lock,
  Unlock,
  Trash2,
  Key,
  Users,
  Shield,
  UserCheck,
  UserX,
  X,
  CheckCircle,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  Save,
  AlertCircle,
  Bell,
  FileText,
  DollarSign,
  Package,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Administration() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [activeTab, setActiveTab] = useState('details')

  // New User Form State
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Doctor',
    department: '',
    permissions: {
      dashboard: true,
      tests: false,
      billing: false,
      drugStock: false,
      administration: false
    }
  })

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    hospitalName: 'MediCore Laboratory',
    contactEmail: 'contact@medicore.com',
    contactPhone: '+91 98765 43210',
    gstNumber: '29ABCDE1234F1Z5',
    licenseNumber: 'ML/2024/12345',
    invoicePrefix: 'INV',
    currency: '₹',
    notifications: {
      lowStock: true,
      pendingPayment: true,
      testCompletion: true
    }
  })

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 'U-001',
      name: 'Dr. Anjali Mehta',
      role: 'Doctor',
      department: 'Cardiology',
      email: 'anjali@medilab.com',
      phone: '+91 98765 43210',
      status: 'active',
      lastLogin: '2024-12-18 09:30 AM',
      permissions: {
        dashboard: true,
        tests: true,
        billing: true,
        drugStock: false,
        administration: false
      }
    },
    {
      id: 'U-002',
      name: 'Dr. Rajesh Kumar',
      role: 'Admin',
      department: 'Administration',
      email: 'rajesh@medilab.com',
      phone: '+91 87654 32109',
      status: 'active',
      lastLogin: '2024-12-18 08:15 AM',
      permissions: {
        dashboard: true,
        tests: true,
        billing: true,
        drugStock: true,
        administration: true
      }
    },
    {
      id: 'U-003',
      name: 'Rahul Verma',
      role: 'Lab Tech',
      department: 'Pathology',
      email: 'rahul@medilab.com',
      phone: '+91 76543 21098',
      status: 'active',
      lastLogin: '2024-12-18 10:00 AM',
      permissions: {
        dashboard: true,
        tests: true,
        billing: false,
        drugStock: false,
        administration: false
      }
    },
    {
      id: 'U-004',
      name: 'Sneha Rao',
      role: 'Pharmacist',
      department: 'Drug Store',
      email: 'sneha@medilab.com',
      phone: '+91 65432 10987',
      status: 'inactive',
      lastLogin: '2024-12-10 03:45 PM',
      permissions: {
        dashboard: true,
        tests: false,
        billing: false,
        drugStock: true,
        administration: false
      }
    },
    {
      id: 'U-005',
      name: 'Priya Sharma',
      role: 'Receptionist',
      department: 'Front Desk',
      email: 'priya@medilab.com',
      phone: '+91 54321 09876',
      status: 'active',
      lastLogin: '2024-12-18 08:00 AM',
      permissions: {
        dashboard: true,
        tests: false,
        billing: true,
        drugStock: false,
        administration: false
      }
    },
    {
      id: 'U-006',
      name: 'Dr. Arun Patel',
      role: 'Doctor',
      department: 'Neurology',
      email: 'arun@medilab.com',
      phone: '+91 43210 98765',
      status: 'active',
      lastLogin: '2024-12-17 05:20 PM',
      permissions: {
        dashboard: true,
        tests: true,
        billing: true,
        drugStock: false,
        administration: false
      }
    },
    {
      id: 'U-007',
      name: 'Kavita Reddy',
      role: 'Lab Tech',
      department: 'Microbiology',
      email: 'kavita@medilab.com',
      phone: '+91 32109 87654',
      status: 'suspended',
      lastLogin: '2024-12-15 02:30 PM',
      permissions: {
        dashboard: true,
        tests: true,
        billing: false,
        drugStock: false,
        administration: false
      }
    },
    {
      id: 'U-008',
      name: 'Amit Singh',
      role: 'Admin',
      department: 'Administration',
      email: 'amit@medilab.com',
      phone: '+91 21098 76543',
      status: 'active',
      lastLogin: '2024-12-18 09:45 AM',
      permissions: {
        dashboard: true,
        tests: true,
        billing: true,
        drugStock: true,
        administration: true
      }
    }
  ])

  // Calculate stats
  const totalUsers = users.length
  const activeAdmins = users.filter(u => u.role === 'Admin' && u.status === 'active').length
  const labTechs = users.filter(u => u.role === 'Lab Tech').length
  const inactiveAccounts = users.filter(u => u.status === 'inactive' || u.status === 'suspended').length

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  // Handle user actions
  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowUserModal(true)
    setActiveTab('details')
  }

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        }
      }
      return user
    }))
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({
        ...selectedUser,
        status: selectedUser.status === 'active' ? 'inactive' : 'active'
      })
    }
  }

  const handleResetPassword = (user) => {
    alert(`Password reset link sent to ${user.email}`)
  }

  const handleDeleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(u => u.id !== userId))
      setShowUserModal(false)
    }
  }

  const handleUpdateUser = () => {
    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u))
    setShowUserModal(false)
    alert('User updated successfully!')
  }

  const handleCreateUser = () => {
    const newUser = {
      id: `U-${String(users.length + 1).padStart(3, '0')}`,
      name: newUserForm.name,
      email: newUserForm.email,
      phone: newUserForm.phone,
      role: newUserForm.role,
      department: newUserForm.department,
      status: 'active',
      lastLogin: 'Never',
      permissions: newUserForm.permissions
    }
    
    setUsers([newUser, ...users])
    setShowAddUserModal(false)
    // Reset form
    setNewUserForm({
      name: '',
      email: '',
      phone: '',
      role: 'Doctor',
      department: '',
      permissions: {
        dashboard: true,
        tests: false,
        billing: false,
        drugStock: false,
        administration: false
      }
    })
    alert('User created successfully!')
  }

  const handleSaveSettings = () => {
    setShowSettingsModal(false)
    alert('System settings saved successfully!')
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200'>
            <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
            Active
          </span>
        )
      case 'inactive':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200'>
            <span className='w-1.5 h-1.5 rounded-full bg-red-500'></span>
            Inactive
          </span>
        )
      case 'suspended':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200'>
            <span className='w-1.5 h-1.5 rounded-full bg-yellow-500'></span>
            Suspended
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className='flex-1 h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/20 to-indigo-50/30 relative'>
      {/* Decorative Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2'></div>
      </div>

      <div className='h-full overflow-y-auto relative z-10'>
        <div className='p-8 max-w-[1600px] mx-auto space-y-8'>
          {/* Header */}
          <div className='bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 relative overflow-hidden'>
            {/* Subtle gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5'></div>
            
            <div className='relative z-10'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-5'>
                  <div className='relative'>
                    <div className='absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl blur opacity-60'></div>
                    <div className='relative bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 p-4 rounded-2xl shadow-lg'>
                      <Shield className='h-9 w-9 text-white' />
                    </div>
                  </div>
                  <div>
                    <h2 className='text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-1'>
                      Administration
                    </h2>
                    <p className='text-gray-600 text-sm font-medium'>
                      Manage users, roles, permissions, and system settings
                    </p>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <Button
                    size='lg'
                    variant='outline'
                    className='border-2 border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400 hover:shadow-lg px-6 rounded-xl transition-all duration-300 font-semibold'
                    onClick={() => setShowSettingsModal(true)}
                  >
                    <Settings className='h-5 w-5 mr-2' />
                    System Settings
                  </Button>
                  <Button
                    size='lg'
                    className='bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-600 hover:from-purple-600 hover:via-indigo-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 px-6 rounded-xl font-semibold'
                    onClick={() => setShowAddUserModal(true)}
                  >
                    <Plus className='h-5 w-5 mr-2' />
                    Add User
                  </Button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  <div className='relative group'>
                    <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors' />
                    <Input
                      placeholder='Search by Name / Email / Role...'
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className='pl-12 h-12 border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 bg-white hover:border-gray-300 shadow-sm rounded-xl font-medium transition-all duration-200'
                    />
                  </div>
                </div>
                
                {/* Role Filter */}
                <div className='relative'>
                  <Button
                    variant='outline'
                    className='h-12 px-5 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 rounded-xl shadow-sm min-w-[200px] justify-between font-semibold transition-all duration-200'
                    onClick={() => {
                      setShowRoleDropdown(!showRoleDropdown)
                      setShowStatusDropdown(false)
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      <Filter className='h-4 w-4 text-purple-500' />
                      <span className='text-sm text-gray-700'>
                        {filterRole === 'all' ? 'All Roles' : filterRole}
                      </span>
                    </div>
                  </Button>
                  {showRoleDropdown && (
                    <div className='absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-10 overflow-hidden'>
                      {['all', 'Admin', 'Doctor', 'Lab Tech', 'Pharmacist', 'Receptionist'].map(role => (
                        <button
                          key={role}
                          onClick={() => {
                            setFilterRole(role)
                            setShowRoleDropdown(false)
                          }}
                          className='w-full px-4 py-3 text-left text-sm font-medium hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 text-gray-700'
                        >
                          {role === 'all' ? 'All Roles' : role}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Filter */}
                <div className='relative'>
                  <Button
                    variant='outline'
                    className='h-12 px-5 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 rounded-xl shadow-sm min-w-[200px] justify-between font-semibold transition-all duration-200'
                    onClick={() => {
                      setShowStatusDropdown(!showStatusDropdown)
                      setShowRoleDropdown(false)
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      <Filter className='h-4 w-4 text-indigo-500' />
                      <span className='text-sm text-gray-700'>
                        {filterStatus === 'all' ? 'All Status' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                      </span>
                    </div>
                  </Button>
                  {showStatusDropdown && (
                    <div className='absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-10 overflow-hidden'>
                      {['all', 'active', 'inactive', 'suspended'].map(status => (
                        <button
                          key={status}
                          onClick={() => {
                            setFilterStatus(status)
                            setShowStatusDropdown(false)
                          }}
                          className='w-full px-4 py-3 text-left text-sm font-medium hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 text-gray-700'
                        >
                          {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Total Users */}
            <Card className='group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-2xl overflow-hidden relative'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-xl'>
                    <Users className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-right'>
                    <p className='text-3xl font-bold'>{totalUsers}</p>
                  </div>
                </div>
                <h3 className='text-sm font-semibold text-white/90'>Total Users</h3>
                <p className='text-xs text-white/70 mt-1'>All staff members</p>
              </CardContent>
            </Card>

            {/* Active Admins */}
            <Card className='group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 text-white rounded-2xl overflow-hidden relative'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-xl'>
                    <Shield className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-right'>
                    <p className='text-3xl font-bold'>{activeAdmins}</p>
                  </div>
                </div>
                <h3 className='text-sm font-semibold text-white/90'>Active Admins</h3>
                <p className='text-xs text-white/70 mt-1'>With full access</p>
              </CardContent>
            </Card>

            {/* Lab Technicians */}
            <Card className='group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 text-white rounded-2xl overflow-hidden relative'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-xl'>
                    <Activity className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-right'>
                    <p className='text-3xl font-bold'>{labTechs}</p>
                  </div>
                </div>
                <h3 className='text-sm font-semibold text-white/90'>Lab Technicians</h3>
                <p className='text-xs text-white/70 mt-1'>Active technicians</p>
              </CardContent>
            </Card>

            {/* Inactive Accounts */}
            <Card className='group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white rounded-2xl overflow-hidden relative'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>
              <CardContent className='p-6 relative z-10'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-xl'>
                    <UserX className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-right'>
                    <p className='text-3xl font-bold'>{inactiveAccounts}</p>
                  </div>
                </div>
                <h3 className='text-sm font-semibold text-white/90'>Inactive Accounts</h3>
                <p className='text-xs text-white/70 mt-1'>Need attention</p>
              </CardContent>
            </Card>
          </div>

          {/* User Management Table */}
          <div className='bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden'>
            <div className='p-8 border-b-2 border-gray-100 bg-gradient-to-r from-purple-50/50 to-indigo-50/50'>
              <div className='flex items-center gap-3'>
                <div className='bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg'>
                  <Users className='h-5 w-5 text-white' />
                </div>
                <div>
                  <h3 className='text-2xl font-extrabold text-gray-900'>User Management</h3>
                  <p className='text-sm text-gray-600 mt-0.5 font-medium'>
                    {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>
            </div>
            
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gradient-to-r from-purple-100/70 to-indigo-100/70'>
                    <th className='px-6 py-5 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider'>
                      User ID
                    </th>
                    <th className='px-6 py-5 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider'>
                      Name
                    </th>
                    <th className='px-6 py-5 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider'>
                      Role
                    </th>
                    <th className='px-6 py-5 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider'>
                      Department
                    </th>
                    <th className='px-6 py-5 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider'>
                      Email
                    </th>
                    <th className='px-6 py-5 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-5 text-right text-xs font-extrabold text-gray-800 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y-2 divide-gray-100'>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className='hover:bg-gradient-to-r hover:from-purple-50/70 hover:to-indigo-50/70 transition-all duration-200 group'>
                      <td className='px-6 py-5 whitespace-nowrap'>
                        <span className='text-sm font-bold text-gray-900'>{user.id}</span>
                      </td>
                      <td className='px-6 py-5 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <div className='w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-200'>
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <span className='text-sm font-semibold text-gray-900 group-hover:text-purple-700 transition-colors'>{user.name}</span>
                        </div>
                      </td>
                      <td className='px-6 py-5 whitespace-nowrap'>
                        <span className='inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-2 border-purple-200 shadow-sm'>
                          {user.role}
                        </span>
                      </td>
                      <td className='px-6 py-5 whitespace-nowrap'>
                        <span className='text-sm text-gray-700 font-medium'>{user.department}</span>
                      </td>
                      <td className='px-6 py-5 whitespace-nowrap'>
                        <span className='text-sm text-gray-600 font-medium'>{user.email}</span>
                      </td>
                      <td className='px-6 py-5 whitespace-nowrap'>
                        {getStatusBadge(user.status)}
                      </td>
                      <td className='px-6 py-5 whitespace-nowrap text-right'>
                        <div className='flex items-center justify-end gap-2'>
                          <button
                            onClick={() => handleViewUser(user)}
                            className='p-2.5 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:shadow-md group/btn'
                            title='View Profile'
                          >
                            <Eye className='h-4 w-4 text-blue-600 group-hover/btn:scale-110 transition-transform' />
                          </button>
                          <button
                            onClick={() => handleViewUser(user)}
                            className='p-2.5 hover:bg-indigo-100 rounded-xl transition-all duration-200 hover:shadow-md group/btn'
                            title='Edit User'
                          >
                            <Edit className='h-4 w-4 text-indigo-600 group-hover/btn:scale-110 transition-transform' />
                          </button>
                          <button
                            onClick={() => handleResetPassword(user)}
                            className='p-2.5 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:shadow-md group/btn'
                            title='Reset Password'
                          >
                            <Key className='h-4 w-4 text-purple-600 group-hover/btn:scale-110 transition-transform' />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            className={`p-2.5 hover:bg-${user.status === 'active' ? 'orange' : 'emerald'}-100 rounded-xl transition-all duration-200 hover:shadow-md group/btn`}
                            title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {user.status === 'active' ? (
                              <Lock className='h-4 w-4 text-orange-600 group-hover/btn:scale-110 transition-transform' />
                            ) : (
                              <Unlock className='h-4 w-4 text-emerald-600 group-hover/btn:scale-110 transition-transform' />
                            )}
                          </button>
                          {user.role !== 'Admin' && (
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className='p-2.5 hover:bg-red-100 rounded-xl transition-all duration-200 hover:shadow-md group/btn'
                              title='Delete User'
                            >
                              <Trash2 className='h-4 w-4 text-red-600 group-hover/btn:scale-110 transition-transform' />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className='text-center py-12'>
                <UserX className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                <p className='text-gray-500 font-medium'>No users found</p>
                <p className='text-sm text-gray-400 mt-1'>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Details/Edit Modal */}
      {showUserModal && selectedUser && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300'>
            <div className='sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl'>
                    {selectedUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold text-gray-900'>{selectedUser.name}</h3>
                    <p className='text-sm text-gray-500'>{selectedUser.role} • {selectedUser.department}</p>
                  </div>
                </div>
                <button onClick={() => setShowUserModal(false)} className='text-gray-400 hover:text-gray-600 transition-colors'>
                  <X className='h-6 w-6' />
                </button>
              </div>

              {/* Tabs */}
              <div className='flex gap-2 mt-6'>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'details'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  User Details
                </button>
                <button
                  onClick={() => setActiveTab('permissions')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'permissions'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Permissions
                </button>
              </div>
            </div>

            <div className='p-6'>
              {activeTab === 'details' && (
                <div className='space-y-6'>
                  {/* Basic Info */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                      <Input
                        value={selectedUser.name}
                        onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                        className='w-full'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>User ID</label>
                      <Input value={selectedUser.id} disabled className='w-full bg-gray-50' />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                        <Input
                          value={selectedUser.email}
                          onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                          className='pl-10 w-full'
                        />
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Phone</label>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                        <Input
                          value={selectedUser.phone}
                          onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                          className='pl-10 w-full'
                        />
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Role</label>
                      <select
                        value={selectedUser.role}
                        onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                        className='w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent'
                      >
                        <option value='Admin'>Admin</option>
                        <option value='Doctor'>Doctor</option>
                        <option value='Lab Tech'>Lab Tech</option>
                        <option value='Pharmacist'>Pharmacist</option>
                        <option value='Receptionist'>Receptionist</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Department</label>
                      <div className='relative'>
                        <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                        <Input
                          value={selectedUser.department}
                          onChange={(e) => setSelectedUser({...selectedUser, department: e.target.value})}
                          className='pl-10 w-full'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status & Last Login */}
                  <div className='bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Status</p>
                        <div className='flex items-center gap-2'>
                          {getStatusBadge(selectedUser.status)}
                          <Button
                            size='sm'
                            onClick={() => handleToggleStatus(selectedUser.id)}
                            className='ml-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                          >
                            {selectedUser.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Last Login</p>
                        <div className='flex items-center gap-2 text-gray-600'>
                          <Clock className='h-4 w-4' />
                          <span className='text-sm'>{selectedUser.lastLogin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'permissions' && (
                <div className='space-y-4'>
                  <div className='bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6'>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className='h-5 w-5 text-blue-600 mt-0.5' />
                      <div>
                        <p className='text-sm font-medium text-blue-900'>Permission Management</p>
                        <p className='text-xs text-blue-700 mt-1'>
                          Control what this user can access and manage in the system
                        </p>
                      </div>
                    </div>
                  </div>

                  {[
                    { key: 'dashboard', label: 'Dashboard Access', icon: Activity, desc: 'View analytics and overview' },
                    { key: 'tests', label: 'Tests Management', icon: FileText, desc: 'Create and manage lab tests' },
                    { key: 'billing', label: 'Billing Access', icon: DollarSign, desc: 'Handle invoices and payments' },
                    { key: 'drugStock', label: 'Drug Stock Control', icon: Package, desc: 'Manage pharmacy inventory' },
                    { key: 'administration', label: 'Administration Access', icon: Shield, desc: 'Full system control' }
                  ].map(permission => (
                    <div key={permission.key} className='flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors'>
                      <div className='flex items-center gap-4'>
                        <div className={`p-3 rounded-xl ${
                          selectedUser.permissions[permission.key]
                            ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                            : 'bg-gray-200'
                        }`}>
                          <permission.icon className={`h-5 w-5 ${
                            selectedUser.permissions[permission.key] ? 'text-white' : 'text-gray-500'
                          }`} />
                        </div>
                        <div>
                          <p className='font-medium text-gray-900'>{permission.label}</p>
                          <p className='text-xs text-gray-500'>{permission.desc}</p>
                        </div>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={selectedUser.permissions[permission.key]}
                          onChange={(e) => setSelectedUser({
                            ...selectedUser,
                            permissions: {
                              ...selectedUser.permissions,
                              [permission.key]: e.target.checked
                            }
                          })}
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className='sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl flex gap-3 justify-end'>
              <Button
                onClick={() => handleResetPassword(selectedUser)}
                variant='outline'
                className='border-orange-300 text-orange-700 hover:bg-orange-50'
              >
                <Key className='h-4 w-4 mr-2' />
                Reset Password
              </Button>
              <Button 
                onClick={() => setShowUserModal(false)} 
                variant='outline'
                className='border-gray-300 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateUser}
                className='bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white'
              >
                <Save className='h-4 w-4 mr-2' />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300'>
            <div className='sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-lg'>
                    <UserCheck className='h-6 w-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900'>Add New User</h3>
                </div>
                <button onClick={() => setShowAddUserModal(false)} className='text-gray-400 hover:text-gray-600 transition-colors'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Basic Info */}
              <div>
                <h4 className='text-sm font-bold text-gray-700 mb-4 flex items-center gap-2'>
                  <div className='w-1 h-5 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full'></div>
                  Basic Information
                </h4>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Full Name <span className='text-red-500'>*</span>
                    </label>
                    <Input
                      value={newUserForm.name}
                      onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})}
                      placeholder='Enter full name'
                      className='w-full'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email <span className='text-red-500'>*</span>
                    </label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                      <Input
                        type='email'
                        value={newUserForm.email}
                        onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
                        placeholder='user@medilab.com'
                        className='pl-10 w-full'
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone <span className='text-red-500'>*</span>
                    </label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                      <Input
                        value={newUserForm.phone}
                        onChange={(e) => setNewUserForm({...newUserForm, phone: e.target.value})}
                        placeholder='+91 98765 43210'
                        className='pl-10 w-full'
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Role <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={newUserForm.role}
                      onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
                      className='w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent'
                    >
                      <option value='Doctor'>Doctor</option>
                      <option value='Lab Tech'>Lab Tech</option>
                      <option value='Pharmacist'>Pharmacist</option>
                      <option value='Receptionist'>Receptionist</option>
                      <option value='Admin'>Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Department <span className='text-red-500'>*</span>
                    </label>
                    <div className='relative'>
                      <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                      <Input
                        value={newUserForm.department}
                        onChange={(e) => setNewUserForm({...newUserForm, department: e.target.value})}
                        placeholder='e.g., Cardiology'
                        className='pl-10 w-full'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className='text-sm font-bold text-gray-700 mb-4 flex items-center gap-2'>
                  <div className='w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full'></div>
                  Access Permissions
                </h4>
                <div className='space-y-3'>
                  {[
                    { key: 'dashboard', label: 'Dashboard Access', icon: Activity },
                    { key: 'tests', label: 'Tests Management', icon: FileText },
                    { key: 'billing', label: 'Billing Access', icon: DollarSign },
                    { key: 'drugStock', label: 'Drug Stock Control', icon: Package },
                    { key: 'administration', label: 'Administration Access', icon: Shield }
                  ].map(permission => (
                    <div key={permission.key} className='flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors'>
                      <div className='flex items-center gap-3'>
                        <permission.icon className='h-5 w-5 text-purple-600' />
                        <span className='font-medium text-gray-900'>{permission.label}</span>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={newUserForm.permissions[permission.key]}
                          onChange={(e) => setNewUserForm({
                            ...newUserForm,
                            permissions: {
                              ...newUserForm.permissions,
                              [permission.key]: e.target.checked
                            }
                          })}
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl flex gap-3 justify-end'>
              <Button 
                onClick={() => setShowAddUserModal(false)} 
                variant='outline'
                className='border-gray-300 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateUser}
                disabled={!newUserForm.name || !newUserForm.email || !newUserForm.phone || !newUserForm.department}
                className='bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white disabled:opacity-50'
              >
                <CheckCircle className='h-4 w-4 mr-2' />
                Create User
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* System Settings Modal */}
      {showSettingsModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300'>
            <div className='sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-2xl shadow-lg'>
                    <Settings className='h-6 w-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900'>System Settings</h3>
                </div>
                <button onClick={() => setShowSettingsModal(false)} className='text-gray-400 hover:text-gray-600 transition-colors'>
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Hospital Configuration */}
              <div>
                <h4 className='text-sm font-bold text-gray-700 mb-4 flex items-center gap-2'>
                  <div className='w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full'></div>
                  Hospital Configuration
                </h4>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Hospital / Lab Name</label>
                    <Input
                      value={systemSettings.hospitalName}
                      onChange={(e) => setSystemSettings({...systemSettings, hospitalName: e.target.value})}
                      className='w-full'
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Contact Email</label>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                        <Input
                          value={systemSettings.contactEmail}
                          onChange={(e) => setSystemSettings({...systemSettings, contactEmail: e.target.value})}
                          className='pl-10 w-full'
                        />
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Contact Phone</label>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                        <Input
                          value={systemSettings.contactPhone}
                          onChange={(e) => setSystemSettings({...systemSettings, contactPhone: e.target.value})}
                          className='pl-10 w-full'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>GST Number</label>
                      <Input
                        value={systemSettings.gstNumber}
                        onChange={(e) => setSystemSettings({...systemSettings, gstNumber: e.target.value})}
                        className='w-full'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>License Number</label>
                      <Input
                        value={systemSettings.licenseNumber}
                        onChange={(e) => setSystemSettings({...systemSettings, licenseNumber: e.target.value})}
                        className='w-full'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Invoice Prefix</label>
                      <Input
                        value={systemSettings.invoicePrefix}
                        onChange={(e) => setSystemSettings({...systemSettings, invoicePrefix: e.target.value})}
                        placeholder='INV'
                        className='w-full'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Currency</label>
                      <select
                        value={systemSettings.currency}
                        onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
                        className='w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent'
                      >
                        <option value='₹'>₹ (INR)</option>
                        <option value='$'>$ (USD)</option>
                        <option value='€'>€ (EUR)</option>
                        <option value='£'>£ (GBP)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <h4 className='text-sm font-bold text-gray-700 mb-4 flex items-center gap-2'>
                  <div className='w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full'></div>
                  Notification Settings
                </h4>
                <div className='space-y-3'>
                  {[
                    { key: 'lowStock', label: 'Low Stock Alerts', desc: 'Get notified when drug inventory is low' },
                    { key: 'pendingPayment', label: 'Payment Pending Alerts', desc: 'Notifications for overdue payments' },
                    { key: 'testCompletion', label: 'Test Report Completion Alerts', desc: 'Notify when test results are ready' }
                  ].map(notification => (
                    <div key={notification.key} className='flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors'>
                      <div className='flex items-center gap-3'>
                        <Bell className='h-5 w-5 text-orange-600' />
                        <div>
                          <p className='font-medium text-gray-900'>{notification.label}</p>
                          <p className='text-xs text-gray-500'>{notification.desc}</p>
                        </div>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={systemSettings.notifications[notification.key]}
                          onChange={(e) => setSystemSettings({
                            ...systemSettings,
                            notifications: {
                              ...systemSettings.notifications,
                              [notification.key]: e.target.checked
                            }
                          })}
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl flex gap-3 justify-end'>
              <Button 
                onClick={() => setShowSettingsModal(false)} 
                variant='outline'
                className='border-gray-300 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveSettings}
                className='bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 text-white'
              >
                <Save className='h-4 w-4 mr-2' />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
