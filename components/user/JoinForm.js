'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NepaliDatePicker from '../admin/event-calendar/NepaliDatePicker';

const JoinForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Personal Information
    nameEnglish: '',
    nameNepali: '',
    dobNepali: '',
    gender: '',
    address: '',
    district: '',
    province: '',
    municipality: '',
    wardNo: '',
    phone: '',
    email: '',
    // Work Information
    occupation: '',
    workplace: '',
    position: '',
    // Union Information
    unionName: '',
    membershipNumber: '',
    joinDate: '',
    // Additional Information
    recommendations: '',
    interests: '',
    skills: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dobNepali: date
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.nameEnglish || !formData.nameNepali || !formData.dobNepali || !formData.gender) {
        setError('कृपया सबै आवश्यक फिल्डहरू भर्नुहोस् / Please fill all required fields');
        return false;
      }
      if (!formData.phone || !formData.email) {
        setError('कृपया सम्पर्क विवरण भर्नुहोस् / Please fill contact details');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.occupation || !formData.workplace) {
        setError('कृपया कार्य विवरण भर्नुहोस् / Please fill work details');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      setError('');
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/user/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard/user/success');
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('सबमिट गर्न असफल भयो / Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          व्यक्तिगत जानकारी | Personal Information
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          कृपया आफ्नो व्यक्तिगत विवरण भर्नुहोस्
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            पूरा नाम (नेपालीमा) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nameNepali"
            value={formData.nameNepali}
            onChange={handleInputChange}
            placeholder="उदाहरण: राम बहादुर श्रेष्ठ"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name (English) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nameEnglish"
            value={formData.nameEnglish}
            onChange={handleInputChange}
            placeholder="Example: Ram Bahadur Shrestha"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जन्म मिति (नेपाली) <span className="text-red-500">*</span>
          </label>
          <NepaliDatePicker
            selectedDate={formData.dobNepali}
            onChange={handleDateChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            लिङ्ग | Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">छान्नुहोस् / Select</option>
            <option value="male">पुरुष | Male</option>
            <option value="female">महिला | Female</option>
            <option value="other">अन्य | Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            प्रदेश | Province <span className="text-red-500">*</span>
          </label>
          <select
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">प्रदेश छान्नुहोस्</option>
            <option value="कोशी">कोशी प्रदेश</option>
            <option value="मधेश">मधेश प्रदेश</option>
            <option value="बागमती">बागमती प्रदेश</option>
            <option value="गण्डकी">गण्डकी प्रदेश</option>
            <option value="लुम्बिनी">लुम्बिनी प्रदेश</option>
            <option value="कर्णाली">कर्णाली प्रदेश</option>
            <option value="सुदूरपश्चिम">सुदूरपश्चिम प्रदेश</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जिल्ला | District <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            placeholder="उदाहरण: काठमाडौं"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            गा.पा./न.पा. | Municipality
          </label>
          <input
            type="text"
            name="municipality"
            value={formData.municipality}
            onChange={handleInputChange}
            placeholder="उदाहरण: काठमाडौं महानगरपालिका"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            वडा नं | Ward No.
          </label>
          <input
            type="text"
            name="wardNo"
            value={formData.wardNo}
            onChange={handleInputChange}
            placeholder="उदाहरण: १२"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ठेगाना | Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="उदाहरण: टोल, सडक"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            फोन नम्बर | Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="९८********"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            इमेल | Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            आपतकालीन सम्पर्क व्यक्ति | Emergency Contact
          </label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            placeholder="नाम"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            आपतकालीन फोन | Emergency Phone
          </label>
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleInputChange}
            placeholder="९८********"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          कार्य सम्बन्धी जानकारी | Work Information
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          कृपया आफ्नो कार्य सम्बन्धी विवरण भर्नुहोस्
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            पेशा | Occupation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            placeholder="उदाहरण: शिक्षक, व्यापारी"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            कार्यस्थल | Workplace <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="workplace"
            value={formData.workplace}
            onChange={handleInputChange}
            placeholder="उदाहरण: ABC विद्यालय"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            पद | Position
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            placeholder="उदाहरण: प्रधानाध्यापक"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            सीप | Skills
          </label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="उदाहरण: कम्प्युटर, लेखन, वक्तृत्व"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          संघ सम्बन्धी जानकारी | Union Information
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          कृपया संघ सम्बन्धी विवरण भर्नुहोस्
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            संघको नाम | Union Name
          </label>
          <input
            type="text"
            name="unionName"
            value={formData.unionName}
            onChange={handleInputChange}
            placeholder="उदाहरण: नेपाल शिक्षक युनियन"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            सदस्यता नम्बर | Membership Number
          </label>
          <input
            type="text"
            name="membershipNumber"
            value={formData.membershipNumber}
            onChange={handleInputChange}
            placeholder="उदाहरण: 12345"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            रुचि | Interests
          </label>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
            placeholder="उदाहरण: खेलकुद, संगीत, सामाजिक सेवा"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            सिफारिस | Recommendations
          </label>
          <textarea
            name="recommendations"
            value={formData.recommendations}
            onChange={handleInputChange}
            placeholder="सिफारिस गर्ने व्यक्तिको नाम र सम्पर्क"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          ANTUF मा सामेल हुनुहोस्
        </h1>
        <p className="text-lg text-gray-600">
          Join All Nepal Trade Union Federation
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {step} of 3
          </span>
          <span className="text-sm font-medium text-gray-700">
            {step === 1 && 'व्यक्तिगत जानकारी'}
            {step === 2 && 'कार्य जानकारी'}
            {step === 3 && 'संघ जानकारी'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              step === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            ← पछाडि | Previous
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              अगाडि | Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                loading
                  ? 'bg-green-300 text-white cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {loading ? 'सबमिट गर्दै...' : 'सबमिट गर्नुहोस् | Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JoinForm;