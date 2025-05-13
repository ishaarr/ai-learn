export default function Hero() {
  return (
    <section className="text-center py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-blue-500 font-medium mb-2">New</p>
        <p className="mb-6 text-sm text-gray-600">Tubeguruji.com All new Apps</p>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          AI-Powered <span className="text-blue-600">Exam Prep</span> <br />
          Material Generator
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
        </p>

        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Get Started
          </button>
          <button className="bg-gray-200 px-6 py-3 rounded-md font-medium">
            Watch Video
          </button>
        </div>

        <div className="mt-10 flex justify-center space-x-8 text-gray-500">
          <p>📺 YouTube</p>
          <p>🚀 Product Hunt</p>
          <p>👽 Reddit</p>
        </div>
      </div>
    </section>
  );
}
