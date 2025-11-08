export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              सफलतापूर्वक सबमिट भयो!
            </h1>
            <p className="text-green-100 text-lg">
              Successfully Submitted!
            </p>
          </div>

          {/* Success Content */}
          <div className="p-8 text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                ANTUF मा सामेल हुनुभएकोमा धन्यवाद
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Thank you for joining All Nepal Trade Union Federation
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">
                अर्को चरण | Next Steps:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>तपाईंको आवेदन प्राप्त भएको छ र समीक्षाधीन छ।</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Your application has been received and is under review.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>हामी छिट्टै तपाईंलाई सम्पर्क गर्नेछौं।</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>We will contact you shortly.</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">
                ध्यान दिनुहोस् | Please Note:
              </h3>
              <p className="text-gray-700">
                कृपया आफ्नो इमेल र फोन नम्बर नियमित रूपमा जाँच गर्नुहोस्। 
                हामी तपाईंलाई सदस्यता सम्बन्धी जानकारी पठाउनेछौं।
              </p>
              <p className="text-gray-700 mt-2">
                Please regularly check your email and phone. 
                We will send you membership-related information.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard/user"
                className="inline-block px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-md"
              >
                ड्यासबोर्डमा जानुहोस् | Go to Dashboard
              </a>
              <a
                href="/events"
                className="inline-block px-8 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors shadow-md"
              >
                कार्यक्रम हेर्नुहोस् | View Events
              </a>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-2">
                प्रश्नहरू छन्? | Have questions?
              </p>
              <p className="text-gray-700 font-medium">
                सम्पर्क: info@antuf.org | फोन: +977-01-XXXXXXX
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}