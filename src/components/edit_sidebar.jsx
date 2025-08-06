
import { Edit3, Type, List, Save , X } from 'lucide-react';

const Sidebar = ({
  editmaintitle,
  seteditmaintitle,
  editsubtitle,
  seteditsubtitle,
  benefits,
  setBenefits,
  setshowsidebar,
}) => {
  const handleBenefitChange = (index, field, value) => {
    const updated = [...benefits];
    updated[index][field] = value;
    setBenefits(updated);
  };

  const addBenefit = () => {
    setBenefits([...benefits, { title: '', subtitle: '' }]);
  };

  const removeBenefit = (index) => {
    if (benefits.length > 1) {
      const updated = benefits.filter((_, i) => i !== index);
      setBenefits(updated);
    }
  };

  return (
    <div className="relative h-full bg-white border-r border-gray-200 shadow-sm">

  <button
    onClick={() => setshowsidebar(false)}
    className="absolute top-3 right-3 text-red-600 hover:text-red-800 transition"
  >
    <X className="w-5 h-5" />
  </button>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Edit3 className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">Content Editor</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">Customize your page content</p>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-8 overflow-y-auto max-h-[calc(100vh-100px)]">
        {/* Main Headings Section */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Type className="w-4 h-4 text-gray-600" />
            <h2 className="text-lg font-medium text-gray-900">Page Headings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Title
              </label>
              <input
                type="text"
                value={editmaintitle}
                onChange={(e) => seteditmaintitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                placeholder="Enter your main title"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={editsubtitle}
                onChange={(e) => seteditsubtitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                placeholder="Enter your subtitle"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <List className="w-4 h-4 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Benefits</h2>
            </div>
            <button
              onClick={addBenefit}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              + Add
            </button>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Benefit {index + 1}
                  </span>
                  {benefits.length > 1 && (
                    <button
                      onClick={() => removeBenefit(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200 focus:outline-none"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={benefit.title}
                      onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-400 text-sm"
                      placeholder={`Enter benefit title`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      value={benefit.subtitle}
                      onChange={(e) => handleBenefitChange(index, 'subtitle', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-400 text-sm resize-none"
                      placeholder={`Enter benefit description`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-200">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm">
            <Save className="w-4 h-4" />
            <span onClick={()=>{
              setshowsidebar(false);
            }}>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;