export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Test Page</h1>
        <p className="text-lg text-gray-600">If you can see this, the basic Next.js setup is working!</p>
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Environment Check:</h2>
          <p className="text-sm text-gray-600">
            Stream API Key: {process.env.NEXT_PUBLIC_STREAM_API_KEY ? '✅ Set' : '❌ Missing'}
          </p>
          <p className="text-sm text-gray-600">
            Clerk Key: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? '✅ Set' : '❌ Missing'}
          </p>
        </div>
      </div>
    </div>
  );
}
