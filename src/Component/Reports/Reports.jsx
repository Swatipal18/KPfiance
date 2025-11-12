import React from 'react'

export default function Reports() {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="text-center space-y-6 max-w-md">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>

                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">Reports</h2>
                    <p className="text-gray-500 text-lg">This page is under development</p>
                </div>

                <div className="pt-4">
                    <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                        Coming Soon
                    </div>
                </div>
            </div>
        </div>
    )
}
