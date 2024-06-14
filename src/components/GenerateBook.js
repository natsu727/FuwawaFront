import React, { useState } from "react";
import axios from "axios";

const GenerateBook = () => {
  const [genre, setGenre] = useState("SF");
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "あなたは優れた作家です。ジャンルとキーワードから日本語の本を作成してください。タイトルと入力されたジャンル、本文をjson形式で生成してください。文字数:800~1600",
            },
            {
              role: "user",
              content: `ジャンル: ${genre}\nキーワード: ${keyword}`,
            },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
          },
        }
      );

      const responseData = response.data;
      const generatedText = responseData.choices[0].message.content.split("\n");
      setTitle(generatedText[0]);
      setContent(generatedText.slice(1).join("\n"));
    } catch (error) {
      // エラーハンドリング
      console.error("Error generating book:", error);
      setError("本の生成中にエラーが発生しました。");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>本の生成</h1>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="SF">SF</option>
        <option value="ミステリー">ミステリー</option>
        <option value="恋愛">恋愛</option>
      </select>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="キーワード"
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "生成中..." : "生成"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {title && (
        <div>
          <h2>生成されたタイトル</h2>
          <p>{title}</p>
          <h2>生成された本文</h2>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateBook;

