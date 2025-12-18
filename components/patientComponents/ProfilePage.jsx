'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  User, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  Edit2,
  Save,
  X,
  Heart,
  AlertCircle,
  Activity,
  Lock,
  Shield,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle,
  Droplet,
  UserCircle
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingMedical, setIsEditingMedical] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    name: 'John Anderson',
    age: 34,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'john.anderson@email.com',
    address: '123 Medical Street, Healthcare City, HC 12345',
    emergencyContact: '+91 98765 11111',
    emergencyName: 'Jane Anderson'
  })

  const [medicalInfo, setMedicalInfo] = useState({
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts', 'Dust'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    height: '175 cm',
    weight: '78 kg'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleProfileSave = () => {
    setIsEditingProfile(false)
  }

  const handleMedicalSave = () => {
    setIsEditingMedical(false)
  }

  const handlePasswordChange = () => {
    setShowPasswordModal(false)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleLogoutAll = () => {
    setShowLogoutModal(false)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Profile Management</h1>
          <p className='text-gray-600'>Manage your personal and medical information</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column - Profile Overview */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Profile Card */}
            <div className='bg-white rounded-2xl border-2 border-blue-300 p-6'>
              <div className='text-center'>
                <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4'>
                  <UserCircle className='h-16 w-16 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900 mb-1'>{profileData.name}</h2>
                <p className='text-gray-600 mb-4'>{profileData.email}</p>
                <div className='inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full border border-red-200'>
                  <Droplet className='h-5 w-5 text-red-600' />
                  <span className='font-bold text-red-600'>{medicalInfo.bloodGroup}</span>
                </div>
              </div>

              <div className='mt-6 pt-6 border-t border-gray-200 space-y-3'>
                <div className='flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-200'>
                  <Calendar className='h-5 w-5 text-blue-600' />
                  <span className='text-sm font-medium text-gray-900'>{profileData.age} years old</span>
                </div>
                <div className='flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-200'>
                  <User className='h-5 w-5 text-blue-600' />
                  <span className='text-sm font-medium text-gray-900'>{profileData.gender}</span>
                </div>
                <div className='flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-200'>
                  <Phone className='h-5 w-5 text-blue-600' />
                  <span className='text-sm font-medium text-gray-900'>{profileData.phone}</span>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className='bg-white rounded-2xl border-2 border-gray-300 p-6'>
              <div className='flex items-center gap-2 mb-4'>
                <Shield className='h-6 w-6 text-blue-600' />
                <h3 className='text-lg font-bold text-gray-900'>Security</h3>
              </div>

              <div className='space-y-3'>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className='w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all group'
                >
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform'>
                      <Lock className='h-5 w-5 text-white' />
                    </div>
                    <div className='text-left'>
                      <p className='font-semibold text-gray-900'>Change Password</p>
                      <p className='text-xs text-gray-600'>Update your password</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className='w-full flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 rounded-xl transition-all group'
                >
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-red-500 rounded-lg group-hover:scale-110 transition-transform'>
                      <LogOut className='h-5 w-5 text-white' />
                    </div>
                    <div className='text-left'>
                      <p className='font-semibold text-gray-900'>Logout All Devices</p>
                      <p className='text-xs text-gray-600'>Sign out everywhere</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className='mt-6 pt-6 border-t border-gray-200'>
                <h4 className='font-semibold text-gray-900 mb-3 text-sm'>Security Tips</h4>
                <ul className='space-y-2 text-xs text-gray-600'>
                  {[
                    'Use a strong, unique password',
                    'Never share your credentials',
                    'Enable two-factor authentication',
                    'Review login activity regularly'
                  ].map((tip, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <CheckCircle className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Profile Details Section */}
            <div className='bg-white rounded-xl border-2 border-gray-300'>
              <div className='p-6 border-b border-gray-200 bg-cyan-50 rounded-xl'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-blue-100 rounded-lg'>
                      <User className='h-6 w-6 text-blue-600' />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-gray-900'>Profile Details</h2>
                      <p className='text-sm text-gray-600'>Personal information and contact details</p>
                    </div>
                  </div>
                  {!isEditingProfile ? (
                    <Button
                      onClick={() => setIsEditingProfile(true)}
                      className='bg-blue-600 hover:bg-blue-700 text-white'
                    >
                      <Edit2 className='h-4 w-4 mr-2' />
                      Edit
                    </Button>
                  ) : (
                    <div className='flex gap-2'>
                      <Button
                        onClick={handleProfileSave}
                        className='bg-green-600 hover:bg-green-700 text-white'
                      >
                        <Save className='h-4 w-4 mr-2' />
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditingProfile(false)}
                        variant='outline'
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Full Name</label>
                    {isEditingProfile ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className='border-gray-300'
                      />
                    ) : (
                      <p className='text-gray-900 font-medium py-2 px-3 bg-blue-50 rounded-lg border border-blue-200'>{profileData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Age</label>
                    {isEditingProfile ? (
                      <Input
                        type='number'
                        value={profileData.age}
                        onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                        className='border-gray-300'
                      />
                    ) : (
                      <p className='text-gray-900 font-medium py-2 px-3 bg-blue-50 rounded-lg border border-blue-200'>{profileData.age} years</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Gender</label>
                    {isEditingProfile ? (
                      <select
                        value={profileData.gender}
                        onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    ) : (
                      <p className='text-gray-900 font-medium py-2 px-3 bg-blue-50 rounded-lg border border-blue-200'>{profileData.gender}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Phone Number</label>
                    {isEditingProfile ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className='border-gray-300'
                      />
                    ) : (
                      <p className='text-gray-900 font-medium py-2 px-3 bg-blue-50 rounded-lg border border-blue-200'>{profileData.phone}</p>
                    )}
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
                    {isEditingProfile ? (
                      <Input
                        type='email'
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className='border-gray-300'
                      />
                    ) : (
                      <p className='text-gray-900 font-medium py-2 px-3 bg-blue-50 rounded-lg border border-blue-200'>{profileData.email}</p>
                    )}
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Address</label>
                    {isEditingProfile ? (
                      <Input
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        className='border-gray-300'
                      />
                    ) : (
                      <p className='text-gray-900 font-medium py-2 px-3 bg-blue-50 rounded-lg border border-blue-200'>{profileData.address}</p>
                    )}
                  </div>
                </div>

                <div className='mt-6 pt-6 border-t border-gray-200'>
                  <h3 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    <AlertCircle className='h-5 w-5 text-amber-600' />
                    Emergency Contact
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>Contact Name</label>
                      {isEditingProfile ? (
                        <Input
                          value={profileData.emergencyName}
                          onChange={(e) => setProfileData({...profileData, emergencyName: e.target.value})}
                          className='border-gray-300'
                        />
                      ) : (
                        <p className='text-gray-900 font-medium py-2 px-3 bg-amber-50 rounded-lg border border-amber-200'>{profileData.emergencyName}</p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>Contact Phone</label>
                      {isEditingProfile ? (
                        <Input
                          value={profileData.emergencyContact}
                          onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                          className='border-gray-300'
                        />
                      ) : (
                        <p className='text-gray-900 font-medium py-2 px-3 bg-amber-50 rounded-lg border border-amber-200'>{profileData.emergencyContact}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className='bg-white rounded-2xl border-2 border-red-300'>
              <div className='p-6 border-b border-gray-200 bg-red-50 rounded-2xl'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-red-100 rounded-lg'>
                      <Heart className='h-6 w-6 text-red-600' />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-gray-900'>Medical Information</h2>
                      <p className='text-sm text-gray-600'>Health details and medical history</p>
                    </div>
                  </div>
                  {!isEditingMedical ? (
                    <Button
                      onClick={() => setIsEditingMedical(true)}
                      className='bg-red-600 hover:bg-red-700 text-white'
                    >
                      <Edit2 className='h-4 w-4 mr-2' />
                      Edit
                    </Button>
                  ) : (
                    <div className='flex gap-2'>
                      <Button
                        onClick={handleMedicalSave}
                        className='bg-green-600 hover:bg-green-700 text-white'
                      >
                        <Save className='h-4 w-4 mr-2' />
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditingMedical(false)}
                        variant='outline'
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Blood Group</label>
                    {isEditingMedical ? (
                      <select
                        value={medicalInfo.bloodGroup}
                        onChange={(e) => setMedicalInfo({...medicalInfo, bloodGroup: e.target.value})}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                          <option key={bg}>{bg}</option>
                        ))}
                      </select>
                    ) : (
                      <div className='flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200'>
                        <Droplet className='h-5 w-5 text-red-600' />
                        <span className='font-bold text-red-600'>{medicalInfo.bloodGroup}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Height</label>
                    {isEditingMedical ? (
                      <Input
                        value={medicalInfo.height}
                        onChange={(e) => setMedicalInfo({...medicalInfo, height: e.target.value})}
                        className='border-gray-300'
                      />
                    ) : (
                      <p className='text-gray-900 font-medium py-2'>{medicalInfo.height}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Weight</label>
                    {isEditingMedical ? (
                      <Input
                        value={medicalInfo.weight}
                        onChange={(e) => setMedicalInfo({...medicalInfo, weight: e.target.value})}
                        className='border-gray-300'
                      />
                    ) : (
                      <p className='text-gray-900 font-medium py-2'>{medicalInfo.weight}</p>
                    )}
                  </div>
                </div>

                <div className='space-y-6'>
                  <div>
                    <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                      <AlertCircle className='h-5 w-5 text-orange-600' />
                      Allergies
                    </label>
                    <div className='flex flex-wrap gap-2'>
                      {medicalInfo.allergies.map((allergy, index) => (
                        <span key={index} className='inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-300'>
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                      <Activity className='h-5 w-5 text-purple-600' />
                      Chronic Conditions
                    </label>
                    <div className='flex flex-wrap gap-2'>
                      {medicalInfo.chronicConditions.map((condition, index) => (
                        <span key={index} className='inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold border border-purple-300'>
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full'>
            <div className='p-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <h3 className='text-xl font-bold text-gray-900'>Change Password</h3>
                <button 
                  onClick={() => setShowPasswordModal(false)} 
                  className='text-gray-400 hover:text-gray-600 transition-colors'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-4'>
              {['current', 'new', 'confirm'].map((type) => (
                <div key={type}>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    {type === 'current' ? 'Current Password' : type === 'new' ? 'New Password' : 'Confirm New Password'}
                  </label>
                  <div className='relative'>
                    <Input
                      type={
                        type === 'current' ? (showCurrentPassword ? 'text' : 'password') :
                        type === 'new' ? (showNewPassword ? 'text' : 'password') :
                        (showConfirmPassword ? 'text' : 'password')
                      }
                      className='pr-10 border-gray-300'
                      placeholder={`Enter ${type} password`}
                    />
                    <button
                      onClick={() => {
                        if (type === 'current') setShowCurrentPassword(!showCurrentPassword)
                        else if (type === 'new') setShowNewPassword(!showNewPassword)
                        else setShowConfirmPassword(!showConfirmPassword)
                      }}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                      {(type === 'current' ? showCurrentPassword : type === 'new' ? showNewPassword : showConfirmPassword) ? 
                        <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='p-6 border-t border-gray-200 flex gap-3'>
              <Button
                onClick={() => setShowPasswordModal(false)}
                variant='outline'
                className='flex-1'
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasswordChange}
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white'
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Logout All Devices Modal */}
      {showLogoutModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl border-2 border-red-400 max-w-md w-full'>
            <div className='p-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <h3 className='text-xl font-bold text-gray-900'>Logout All Devices</h3>
                <button 
                  onClick={() => setShowLogoutModal(false)} 
                  className='text-gray-400 hover:text-gray-600 transition-colors'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6'>
              <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
                <div className='flex items-start gap-3'>
                  <AlertCircle className='h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5' />
                  <div>
                    <h4 className='font-bold text-gray-900 mb-2'>Are you sure?</h4>
                    <p className='text-sm text-gray-600'>
                      This action will sign you out from all devices where you're currently logged in. 
                      You'll need to sign in again on each device.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-6 border-t border-gray-200 flex gap-3'>
              <Button
                onClick={() => setShowLogoutModal(false)}
                variant='outline'
                className='flex-1'
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogoutAll}
                className='flex-1 bg-red-600 hover:bg-red-700 text-white'
              >
                Logout All Devices
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
