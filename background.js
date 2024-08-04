chrome.runtime.onMessage.addListener(async ({ word }) => {
  const translation = await fetchTranslationFromLLM(word); // 英次郎から和訳を取得
  const deckName = "words on thesis"; // Ankiのデッキ名
  const modelName = "Basic"; // Ankiのモデル名
  const ankiConnectUrl = "http://localhost:8765"; // AnkiConnectのURL

  const params = {
    action: "addNote",
    version: 6,
    params: {
      note: {
        deckName: deckName,
        modelName: modelName,
        fields: {
          Front: word,
          Back: translation
        },
        options: {
          allowDuplicate: false
        },
        tags: ["chrome_extension"]
      }
    }
  };

  try {
    const response = await fetch(ankiConnectUrl, {
      method: "POST",
      body: JSON.stringify(params)
    });
    const data = await response.json();
    if (data.error) {
      console.error("AnkiConnect error:", data.error);
    } else {
      console.log("Added word to Anki:", word);
    }
  } catch (error) {
    console.error("Error adding word to Anki:", error);
  }
});

async function fetchTranslationFromLLM(word) {
//   const apiUrl = "https://api-free.deepl.com/v2/translate"; 

//   const response = await fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: new URLSearchParams({
//          
// auth_key: "YOUR_DEEPL_API_KEY", // DeepL API FreeのAPIキー
//       text: word,
//       source_lang: "EN",
//       target_lang: "JA"
//     })
//   });

//   const data = await response.json();
//   return data.translations[0].text; // レスポンスから和訳を取得

  return "syoyu";
}

