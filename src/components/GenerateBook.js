import React, { useState } from "react";
import axios from "axios";
import "../App.css";


const GenerateBook = ({isOpen}) => {
  const [genre, setGenre] = useState("");
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const [activeAccordion, setActiveAccordion] = useState(isOpen);

  const handleAccordionClick = () => {
    // setActiveAccordion(activeAccordion === index ? null : index);
    setActiveAccordion(!activeAccordion);
  };

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

              content: "あなたは優れた作家です。ジャンルとキーワードから日本語の本を作成してください。入力されたジャンルとタイトル、本文をjson形式で生成してください。文字数:800~1600。改行はいれないでください。jsonのキーはgenre、title、content",
              // content: "あなたは優れた作家です。ジャンルとキーワードから日本語の本を作成してください。入力されたジャンルとタイトル、本文をjson形式で生成してください。文字数:20~70。改行はいれないでください。jsonのキーはgenre、title、content",
            },
            {
              role: "user",
              content: `ジャンル: ${genre}\nキーワード: ${keyword}`,
            },
          ],
          max_tokens: 1600,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
          },
        }
      );
      

      const responseData = response.data.choices[0].message.content;
      console.log("生成されたデータ:", responseData);

      const jsonResponse = JSON.parse(responseData);

      setTitle(jsonResponse.title);
      setContent(jsonResponse.content);
      


      // 生成されたデータをバックエンドに送信
      await axios.post(
        "https://fuwawa-back2.onrender.com/regist",
        {
          title: jsonResponse.title,
          genre: genre,
          content: jsonResponse.content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    } catch (error) {
      // エラーハンドリング
      console.error("Error generating book:", error);
      setError("本の生成中にエラーが発生しました。");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className={`title ${activeAccordion  ? "close" : ""}`}
        onClick={() => handleAccordionClick()}
      >生成</div>
      <div className="box" style={{ display: activeAccordion ? "block" : "none" }}>
        <label htmlFor="favoriteGenre">ジャンル：</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="選択無し">選択無し</option>
          <option value="SF">SF</option>
          <option value="学園">学園</option>
          <option value="ファンタジー">ファンタジー</option>
          <option value="ミステリー">ミステリー</option>
          <option value="恋愛">恋愛</option>
        </select><br/>

        <label htmlFor="bookInfo">詳細設定:</label><br/>
        <textarea value={keyword}
          onChange={(e) => setKeyword(e.target.value)} maxLength="300"
          placeholder="例：追加のジャンル,ラノベ調,登場キャラクター,環境 等（最大300文字）" 
        /><br/>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "生成中..." : "生成"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {title && (
        <div>
          <h2>タイトル</h2>
          <p>{title}</p>
          <h2>本文</h2>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateBook;
