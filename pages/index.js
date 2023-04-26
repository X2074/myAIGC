import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptsInput, setPromptsInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompts: promptsInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setPromptsInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>My AIGC image</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompts"
            placeholder="Enter some prompts"
            value={promptsInput}
            onChange={(e) => setPromptsInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        {/*<div className={styles.result}>{result}</div>*/}
        <div className={styles.result}>{result && <img src={result} alt="generated image" width="600" height="600"/>}</div>

      </main>
    </div>
  );
}


// import React from 'react';
//
// class DownloadButton extends React.Component {
//   downloadFile() {
//     // 发送文件下载请求
//     fetch('/api/download')
//         .then(response => response.blob())
//         .then(blob => {
//           // 创建文件下载链接
//           const url = window.URL.createObjectURL(new Blob([blob]));
//           const link = document.createElement('a');
//           link.href = url;
//           link.setAttribute('download', 'example.txt');
//
//           // 触发链接的点击事件
//           link.click();
//         });
//   }
//
//   render() {
//     return (
//         <button onClick={this.downloadFile}>下载文件</button>
//     );
//   }
// }
