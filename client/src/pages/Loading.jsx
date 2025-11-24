function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      {/* Vòng tròn loading */}
      <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

      {/* Text chính */}
      <h2 className="animate-pulse text-xl font-semibold text-blue-700">
        Đợi chút nhá...
      </h2>

      {/* Info bên dưới */}
      <div className="mt-6 space-y-1 text-center text-sm text-gray-600">
        <p>💬 Liên hệ hỗ trợ nếu bạn bị treo quá lâu</p>
        <p>
          Email:{" "}
          <span className="font-medium text-blue-700">contact@eris.app</span>
        </p>
        <p>
          Hotline:{" "}
          <span className="font-medium text-blue-700">0123 456 789</span>
        </p>
      </div>
    </div>
  );
}

export default Loading;
