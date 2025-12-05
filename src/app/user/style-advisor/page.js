"use client";
import { useState } from "react";
import { getSuggestion } from "@/api/apiHandler";

export default function StyleAdvisor() {
  const [form, setForm] = useState({
    skinTone: "",
    gender: "",
    bodyType: "",
    occasion: "",
  });

  const [suggestion, setSuggestion] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = `Suggest clothing styles and colors for a ${form.gender} with ${form.skinTone} skin tone and ${form.bodyType} body type for a ${form.occasion}.`;
    const encodedPrompt = encodeURIComponent(prompt);
    const chatLink = `https://chat.openai.com/?q=${encodedPrompt}`;
    window.open(chatLink, "_blank");
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">🧥 Style Advisor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="skinTone" placeholder="Skin tone (e.g., wheatish)" onChange={handleChange} className="border p-2 w-full" required />
        <input name="gender" placeholder="Gender" onChange={handleChange} className="border p-2 w-full" required />
        <input name="bodyType" placeholder="Body type (e.g., athletic)" onChange={handleChange} className="border p-2 w-full" required />
        <input name="occasion" placeholder="Occasion (e.g., wedding)" onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-black text-white px-4 py-2">Get Style Tips</button>
      </form>

      <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded">{suggestion}</div>
    </div>
  );
}
