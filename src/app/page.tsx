"use client";

import { useState } from "react";

export default function Home() {
  const [redirectURL, setRedirectURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!redirectURL) {
      alert("URL을 입력해주세요.");
      return;
    }

    setIsLoading(true); // 로딩 상태 시작
    try {
      const response = await fetch(
        "https://zksnirpbgoppgoprlfdw.supabase.co/functions/v1/api/shortPath/v1/shortPath",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ redirectURL }),
        }
      );

      if (!response.ok) {
        throw new Error("URL 단축에 실패했습니다.");
      }

      const data = await response.json();
      setShortenedURL(`${window.location.origin}/${data.shortPath}`);
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">단축 URL 생성기</h1>
      <div className="flex items-center w-full max-w-md space-x-2">
        <input
          type="text"
          placeholder="단축할 URL을 입력하세요"
          value={redirectURL}
          onChange={(e) => setRedirectURL(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "로딩 중..." : "생성"}
        </button>
      </div>
      {isLoading && (
        <div className="mt-4 text-gray-500">URL을 단축하는 중입니다...</div>
      )}
      {shortenedURL && !isLoading && (
        <div className="mt-6 text-center">
          <p className="text-gray-700">단축된 URL:</p>
          <a
            href={shortenedURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-lg"
          >
            {shortenedURL}
          </a>
        </div>
      )}
    </div>
  );
}
