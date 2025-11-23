import React from 'react'

function ThreeSimpleStep() {
    return (
        <section className="py-16 px-4 bg-[#9BD9FE]"> {/* Changed background to white */}
            <div className="max-w-7xl mx-auto text-center">
                <h3 className="text-4xl font-semibold text-gray-800 mb-4">
                    Find Your Place in 3 Simple Steps
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    Your next home is just a few clicks away. We make the process transparent and fast.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-gray-50 p-8 rounded-xl shadow-xl border-t-4 border-indigo-600 border border-gray-100 hover:-translate-y-3 transition ease-linear duration-200">
                        <div className="text-4xl font-extrabold text-indigo-600 mb-3">01</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Search & Filter</h4>
                        <p className="text-gray-600">Use smart filters to narrow down PGs, flats, or rooms by location, price, and amenities.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="bg-gray-50 p-8 rounded-xl shadow-xl border-t-4 border-indigo-600 border border-gray-100 hover:-translate-y-3 transition ease-linear duration-200">
                        <div className="text-4xl font-extrabold text-cyan-600 mb-3 ">02</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Connect Directly</h4>
                        <p className="text-gray-600">Contact the verified property owner instantly via chat or call without any brokerage fees.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="bg-gray-50 p-8 rounded-xl shadow-xl border-t-4 border-indigo-600 border border-gray-100 hover:-translate-y-3 transition ease-linear duration-200">
                        <div className="text-4xl font-extrabold text-indigo-600 mb-3">03</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Book Securely</h4>
                        <p className="text-gray-600">Finalize your deal and secure your booking with our integrated, secure payment system.</p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ThreeSimpleStep