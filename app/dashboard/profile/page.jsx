export default function ProfilePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Account</h1>
      <p className="text-gray-600 mb-8">Manage your account info.</p>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Profile Avatar */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                P
              </div>
              <button className="text-sm text-blue-500 hover:underline">Update profile</button>
            </div>

            {/* Username */}
            <div>
              <label className="text-sm text-gray-500">Username</label>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">p_ishvt</span>
                <button className="text-sm text-blue-500 hover:underline">Update username</button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-500">Email addresses</label>
              <div className="flex justify-between items-center">
                <span className="text-lg">isha30sk@gmail.com</span>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">Primary</span>
              </div>
              <button className="mt-1 text-sm text-blue-500 hover:underline">+ Add email address</button>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-500">Phone numbers</label>
              <div className="flex justify-between items-center">
                <span className="text-lg">+91 98919-00145</span>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">Primary</span>
              </div>
              <button className="mt-1 text-sm text-blue-500 hover:underline">+ Add phone number</button>
            </div>

            {/* Connected Accounts */}
            <div>
              <label className="text-sm text-gray-500">Connected accounts</label>
              <button className="text-sm text-blue-500 hover:underline">+ Connect account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
