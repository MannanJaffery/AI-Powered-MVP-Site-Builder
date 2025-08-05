const Sidebar = ({
  editmaintitle,
  seteditmaintitle,
  editsubtitle,
  seteditsubtitle,
  benefits,
  setBenefits,
}) => {
  const handleBenefitChange = (index, field, value) => {
    const updated = [...benefits];
    updated[index][field] = value;
    setBenefits(updated);
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Edit Headings</h2>
      <input
        type="text"
        value={editmaintitle}
        onChange={(e) => seteditmaintitle(e.target.value)}
        className="mb-2 w-full px-2 py-1 border rounded"
        placeholder="Main Title"
      />
      <input
        type="text"
        value={editsubtitle}
        onChange={(e) => seteditsubtitle(e.target.value)}
        className="mb-4 w-full px-2 py-1 border rounded"
        placeholder="Subtitle"
      />

      <h2 className="text-lg font-semibold mb-2">Edit Benefits</h2>
      {benefits.map((benefit, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
            className="mb-1 w-full px-2 py-1 border rounded"
            placeholder={`Title ${index + 1}`}
          />
          <input
            type="text"
            value={benefit.subtitle}
            onChange={(e) => handleBenefitChange(index, 'subtitle', e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder={`Subtitle ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;




