'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  User,
  Store,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Key,
  LogOut,
  Edit,
  Save,
  X,
  CheckCircle,
  Building,
  Users,
  Briefcase,
  Calendar,
  Lock,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Activity
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditingStore, setIsEditingStore] = useState(false)
  const [isEditingStaff, setIsEditingStaff] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Store Information State
  const [storeInfo, setStoreInfo] = useState({
    storeName: 'MEDICORE Pharmacy',
    licenseNumber: 'DL-MH-2024-12345',
    gstNumber: '27XXXXX1234X1ZX',
    phone: '+91 1234567890',
    email: 'contact@medicore.com',
    address: '123 Healthcare Street, Medical District, Mumbai - 400001',
    establishedYear: '2020',
    operatingHours: '8:00 AM - 10:00 PM'
  })

  const [tempStoreInfo, setTempStoreInfo] = useState({ ...storeInfo })

  // Staff Information State
  const [staffInfo, setStaffInfo] = useState({
    name: 'Dr. Rajesh Kumar',
    role: 'Senior Pharmacist',
    empId: 'EMP-2024-001',
    qualification: 'B.Pharm, M.Pharm',
    experience: '8 years',
    shiftTiming: '9:00 AM - 6:00 PM',
    joinDate: '2022-01-15',
    phone: '+91 9876543210',
    email: 'rajesh.kumar@medicore.com',
    specialization: 'Clinical Pharmacy'
  })

  const [tempStaffInfo, setTempStaffInfo] = useState({ ...staffInfo })

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Handle Store Edit
  const handleSaveStore = () => {
    setStoreInfo({ ...tempStoreInfo })
    setIsEditingStore(false)
  }

  const handleCancelStoreEdit = () => {
    setTempStoreInfo({ ...storeInfo })
    setIsEditingStore(false)
  }

  // Handle Staff Edit
  const handleSaveStaff = () => {
    setStaffInfo({ ...tempStaffInfo })
    setIsEditingStaff(false)
  }

  const handleCancelStaffEdit = () => {
    setTempStaffInfo({ ...staffInfo })
    setIsEditingStaff(false)
  }

  // Handle Password Change
  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill all password fields')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New password and confirm password do not match')
      return
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }

    // In real app, this would call an API
    alert('Password changed successfully!\n\nYour password has been updated.')
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setShowChangePassword(false)
  }

  // Handle Logout All Sessions
  const handleLogoutAll = () => {
    if (confirm('Are you sure you want to logout from all devices?\n\nThis will end all active sessions and you will need to login again.')) {
      // In real app, this would call an API
      alert('All sessions logged out successfully!\n\nYou will be redirected to login page.')
    }
  }

  return (
    <div className='p-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3'>
          <User className='h-10 w-10 text-blue-600' />
          Profile Management
        </h1>
        <p className='text-gray-600'>Manage store and staff information</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column - Store & Staff Info */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Store Information */}
          <div className='bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden'>
            <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Store className='h-8 w-8' />
                  <div>
                    <h2 className='text-2xl font-bold'>Store Information</h2>
                    <p className='text-sm text-blue-100'>Pharmacy details and licensing</p>
                  </div>
                </div>
                {!isEditingStore ? (
                  <Button
                    onClick={() => setIsEditingStore(true)}
                    className='bg-white text-blue-600 hover:bg-blue-50'
                  >
                    <Edit className='h-4 w-4 mr-2' />
                    Edit
                  </Button>
                ) : (
                  <div className='flex gap-2'>
                    <Button
                      onClick={handleSaveStore}
                      className='bg-green-600 hover:bg-green-700 text-white'
                    >
                      <Save className='h-4 w-4 mr-2' />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelStoreEdit}
                      className='bg-red-600 hover:bg-red-700 text-white'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className='p-6 space-y-4'>
              {/* Store Name */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  <Building className='h-4 w-4 text-blue-600' />
                  Store Name
                </label>
                {isEditingStore ? (
                  <Input
                    value={tempStoreInfo.storeName}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, storeName: e.target.value })}
                    className='h-11'
                  />
                ) : (
                  <p className='text-gray-900 font-bold text-lg bg-gray-50 p-3 rounded-lg'>{storeInfo.storeName}</p>
                )}
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {/* License Number */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <FileText className='h-4 w-4 text-blue-600' />
                    Drug License Number
                  </label>
                  {isEditingStore ? (
                    <Input
                      value={tempStoreInfo.licenseNumber}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, licenseNumber: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 font-mono bg-blue-50 p-3 rounded-lg border border-blue-200'>{storeInfo.licenseNumber}</p>
                  )}
                </div>

                {/* GST Number */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <FileText className='h-4 w-4 text-blue-600' />
                    GST Number
                  </label>
                  {isEditingStore ? (
                    <Input
                      value={tempStoreInfo.gstNumber}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, gstNumber: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 font-mono bg-blue-50 p-3 rounded-lg border border-blue-200'>{storeInfo.gstNumber}</p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {/* Phone */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Phone className='h-4 w-4 text-blue-600' />
                    Contact Number
                  </label>
                  {isEditingStore ? (
                    <Input
                      value={tempStoreInfo.phone}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, phone: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{storeInfo.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-blue-600' />
                    Email Address
                  </label>
                  {isEditingStore ? (
                    <Input
                      value={tempStoreInfo.email}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, email: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{storeInfo.email}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-blue-600' />
                  Store Address
                </label>
                {isEditingStore ? (
                  <Input
                    value={tempStoreInfo.address}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, address: e.target.value })}
                    className='h-11'
                  />
                ) : (
                  <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{storeInfo.address}</p>
                )}
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {/* Established Year */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-blue-600' />
                    Established Year
                  </label>
                  {isEditingStore ? (
                    <Input
                      value={tempStoreInfo.establishedYear}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, establishedYear: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{storeInfo.establishedYear}</p>
                  )}
                </div>

                {/* Operating Hours */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-blue-600' />
                    Operating Hours
                  </label>
                  {isEditingStore ? (
                    <Input
                      value={tempStoreInfo.operatingHours}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, operatingHours: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{storeInfo.operatingHours}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Staff Information */}
          <div className='bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden'>
            <div className='bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Users className='h-8 w-8' />
                  <div>
                    <h2 className='text-2xl font-bold'>Staff Information</h2>
                    <p className='text-sm text-purple-100'>Pharmacist details and credentials</p>
                  </div>
                </div>
                {!isEditingStaff ? (
                  <Button
                    onClick={() => setIsEditingStaff(true)}
                    className='bg-white text-purple-600 hover:bg-purple-50'
                  >
                    <Edit className='h-4 w-4 mr-2' />
                    Edit
                  </Button>
                ) : (
                  <div className='flex gap-2'>
                    <Button
                      onClick={handleSaveStaff}
                      className='bg-green-600 hover:bg-green-700 text-white'
                    >
                      <Save className='h-4 w-4 mr-2' />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelStaffEdit}
                      className='bg-red-600 hover:bg-red-700 text-white'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className='p-6 space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                {/* Name */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <User className='h-4 w-4 text-purple-600' />
                    Pharmacist Name
                  </label>
                  {isEditingStaff ? (
                    <Input
                      value={tempStaffInfo.name}
                      onChange={(e) => setTempStaffInfo({ ...tempStaffInfo, name: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 font-bold text-lg bg-purple-50 p-3 rounded-lg border border-purple-200'>{staffInfo.name}</p>
                  )}
                </div>

                {/* Employee ID */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <FileText className='h-4 w-4 text-purple-600' />
                    Employee ID
                  </label>
                  <p className='text-gray-900 font-mono bg-gray-50 p-3 rounded-lg'>{staffInfo.empId}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {/* Role */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Briefcase className='h-4 w-4 text-purple-600' />
                    Role / Position
                  </label>
                  {isEditingStaff ? (
                    <Input
                      value={tempStaffInfo.role}
                      onChange={(e) => setTempStaffInfo({ ...tempStaffInfo, role: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{staffInfo.role}</p>
                  )}
                </div>

                {/* Shift Timing */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-purple-600' />
                    Shift Timing
                  </label>
                  {isEditingStaff ? (
                    <Input
                      value={tempStaffInfo.shiftTiming}
                      onChange={(e) => setTempStaffInfo({ ...tempStaffInfo, shiftTiming: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg flex items-center gap-2'>
                      <Clock className='h-4 w-4 text-purple-600' />
                      {staffInfo.shiftTiming}
                    </p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {/* Qualification */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <FileText className='h-4 w-4 text-purple-600' />
                    Qualification
                  </label>
                  {isEditingStaff ? (
                    <Input
                      value={tempStaffInfo.qualification}
                      onChange={(e) => setTempStaffInfo({ ...tempStaffInfo, qualification: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{staffInfo.qualification}</p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-purple-600' />
                    Experience
                  </label>
                  {isEditingStaff ? (
                    <Input
                      value={tempStaffInfo.experience}
                      onChange={(e) => setTempStaffInfo({ ...tempStaffInfo, experience: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{staffInfo.experience}</p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {/* Phone */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Phone className='h-4 w-4 text-purple-600' />
                    Contact Number
                  </label>
                  {isEditingStaff ? (
                    <Input
                      value={tempStaffInfo.phone}
                      onChange={(e) => setTempStaffInfo({ ...tempStaffInfo, phone: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{staffInfo.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-purple-600' />
                    Email Address
                  </label>
                  {isEditingStaff ? (
                    <Input
                      value={tempStaffInfo.email}
                      onChange={(e) => setTempStaffInfo({ ...tempStaffInfo, email: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{staffInfo.email}</p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {/* Join Date */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-purple-600' />
                    Join Date
                  </label>
                  <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{staffInfo.joinDate}</p>
                </div>

                {/* Specialization */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <ShieldCheck className='h-4 w-4 text-purple-600' />
                    Specialization
                  </label>
                  {isEditingStaff ? (
                    <Input
                      value={tempStaffInfo.specialization}
                      onChange={(e) => setTempStaffInfo({ ...tempStaffInfo, specialization: e.target.value })}
                      className='h-11'
                    />
                  ) : (
                    <p className='text-gray-900 bg-gray-50 p-3 rounded-lg'>{staffInfo.specialization}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Security Settings */}
        <div className='space-y-6'>
          {/* Security Card */}
          <div className='bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6 shadow-lg'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='p-3 bg-red-600 rounded-xl'>
                <Shield className='h-8 w-8 text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>Security</h2>
                <p className='text-sm text-gray-600'>Manage account security</p>
              </div>
            </div>

            {/* Change Password Button */}
            <Button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className='w-full h-14 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white text-lg mb-4'
            >
              <Key className='h-5 w-5 mr-2' />
              Change Password
            </Button>

            {/* Change Password Form */}
            {showChangePassword && (
              <div className='space-y-4 mb-4 p-4 bg-white rounded-lg border-2 border-orange-200'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Current Password</label>
                  <div className='relative'>
                    <Input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className='h-11 pr-10'
                      placeholder='Enter current password'
                    />
                    <button
                      type='button'
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                      {showCurrentPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>New Password</label>
                  <div className='relative'>
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className='h-11 pr-10'
                      placeholder='Enter new password'
                    />
                    <button
                      type='button'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                      {showNewPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Confirm New Password</label>
                  <div className='relative'>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className='h-11 pr-10'
                      placeholder='Confirm new password'
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                      {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                    </button>
                  </div>
                </div>

                <div className='p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                  <p className='text-xs text-blue-800 flex items-start gap-2'>
                    <AlertCircle className='h-4 w-4 mt-0.5 flex-shrink-0' />
                    <span>Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.</span>
                  </p>
                </div>

                <Button
                  onClick={handleChangePassword}
                  className='w-full h-12 bg-green-600 hover:bg-green-700 text-white'
                >
                  <CheckCircle className='h-5 w-5 mr-2' />
                  Update Password
                </Button>
              </div>
            )}

            {/* Logout All Sessions */}
            <Button
              onClick={handleLogoutAll}
              className='w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg'
            >
              <LogOut className='h-5 w-5 mr-2' />
              Logout All Sessions
            </Button>

            <div className='mt-4 p-4 bg-white rounded-lg border-2 border-red-200'>
              <p className='text-xs text-red-800 flex items-start gap-2'>
                <AlertCircle className='h-4 w-4 mt-0.5 flex-shrink-0' />
                <span>This will end all active sessions on all devices. You will need to login again on all devices.</span>
              </p>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className='bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md'>
            <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <Activity className='h-5 w-5 text-blue-600' />
              Account Status
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200'>
                <span className='text-sm text-gray-700'>Account Status</span>
                <span className='text-sm font-bold text-green-600 flex items-center gap-1'>
                  <CheckCircle className='h-4 w-4' />
                  Active
                </span>
              </div>
              <div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200'>
                <span className='text-sm text-gray-700'>License Status</span>
                <span className='text-sm font-bold text-blue-600 flex items-center gap-1'>
                  <ShieldCheck className='h-4 w-4' />
                  Valid
                </span>
              </div>
              <div className='flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200'>
                <span className='text-sm text-gray-700'>Last Login</span>
                <span className='text-sm font-bold text-purple-600'>Today, 9:30 AM</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200'>
                <span className='text-sm text-gray-700'>Active Sessions</span>
                <span className='text-sm font-bold text-orange-600'>2 devices</span>
              </div>
            </div>
          </div>

          {/* Help Card */}
          <div className='bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6'>
            <h3 className='text-lg font-bold text-gray-900 mb-3'>Need Help?</h3>
            <p className='text-sm text-gray-600 mb-4'>Contact support for any profile or account related issues.</p>
            <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
              <Mail className='h-4 w-4 mr-2' />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
