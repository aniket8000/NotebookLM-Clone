import React from 'react'
import Loader from '../common/Loader'

export default function UploadProgress({ status = 'processing' }) {
  return (
    <div className="flex items-center gap-3 mt-3">
      <Loader size={18} />
      <div className="text-sm text-gray-600">Upload status: <span className="font-medium">{status}</span></div>
    </div>
  )
}
