import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Flame, Drumstick, Egg, Wheat, Salad } from "lucide-react";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/predict`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center 
      bg-gradient-to-br from-gray-50 to-gray-100 
      dark:from-gray-900 dark:to-gray-800 
      text-gray-800 dark:text-gray-100 
      p-6 transition-colors">
      
      <h1 className="text-4xl font-extrabold mb-6 drop-shadow flex items-center gap-2">
        🍴 AI Food Recognition
      </h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-4 
        bg-white/70 dark:bg-gray-800/70 
        backdrop-blur-lg shadow-xl p-6 rounded-2xl transition-colors"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 rounded w-64 dark:bg-gray-900 dark:border-gray-700"
        />
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-xl shadow-md"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow 
          hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Analyzing..." : "Upload & Predict"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-100 dark:bg-red-900/50 
          border border-red-300 dark:border-red-700 
          text-red-700 dark:text-red-300 
          px-4 py-3 rounded-xl shadow">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 w-full max-w-5xl grid md:grid-cols-2 gap-6"
        >
          {/* Nutrition Facts */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg 
            shadow-lg rounded-2xl p-6 transition-colors">
            <h2 className="text-2xl font-bold mb-4">
              Prediction:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {result.prediction}
              </span>
            </h2>
            <h3 className="text-xl font-semibold mb-4">🍽️ Nutrition Facts</h3>
            {result.nutrition ? (
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Flame className="text-orange-500" />{" "}
                  <span>Calories: {result.nutrition.calories}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Drumstick className="text-red-500" />{" "}
                  <span>Protein: {result.nutrition.protein} g</span>
                </li>
                <li className="flex items-center gap-2">
                  <Egg className="text-green-500" />{" "}
                  <span>Fat: {result.nutrition.fat} g</span>
                </li>
                <li className="flex items-center gap-2">
                  <Wheat className="text-yellow-600" />{" "}
                  <span>Carbs: {result.nutrition.carbs} g</span>
                </li>
              </ul>
            ) : (
              <p>No nutrition info available.</p>
            )}
          </div>

          {/* Recipe */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg 
            shadow-lg rounded-2xl p-6 transition-colors">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Salad className="text-green-500" /> Healthy Recipe Suggestion
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>
                {result.recipe}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
