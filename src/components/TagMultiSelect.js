import { useRef, useState, useEffect } from "react";

export default function TagMultiSelect({ tags, selectedTags, setSelectedTags }) {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState(selectedTags || []);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function handleTagToggle(tagId) {
    setTempSelected((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSelectedTags(tempSelected);
    setOpen(false);
  }

  const selectedNames =
    tags
      .filter((tag) => selectedTags.includes(tag.id))
      .map((tag) => tag.tag)
      .join(", ") || "Tags";

  return (
    <div className="relative z-[999]" ref={dropdownRef}>
      <button
        type="button"
        className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition hover:border-blue-400 min-w-[120px] text-left"
        onClick={() => setOpen((o) => !o)}
      >
        {selectedNames}
      </button>

      {open && (
        <div className="absolute left-0 z-[999] mt-2 w-56 bg-white border border-blue-100 rounded-xl shadow-xl p-4">
          <form onSubmit={handleSubmit}>
            <div className="max-h-48 overflow-y-auto flex flex-col gap-2">
              {tags.map((tag) => (
                <label
                  key={tag.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tempSelected.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-700">{tag.tag}</span>
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
