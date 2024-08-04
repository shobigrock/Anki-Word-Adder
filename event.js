'use strict';

{
  // インストール時に実行(右クリック時のメニュー追加)
  chrome.runtime.onInstalled.addListener(() => {
    const parent = chrome.contextMenus.create({  
      id: 'parent',
      title: 'Anki Word Adder'
    });
    chrome.contextMenus.create({
      id: 'child1',
      parentId: 'parent',
      title: '選択単語を登録デッキ1に追加'
    });
    chrome.contextMenus.create({
      id: 'child2',
      parentId: 'parent',
      title: '子メニュー2'
    });
    chrome.contextMenus.create({
      id: 'child3',
      parentId: 'parent',
      title: '子メニュー3'
    });
  });

  // メニューをクリック時に実行
  chrome.contextMenus.onClicked.addListener((item, tab) => {
    if (item.selectionText) {
      const selectedText = item.selectionText;
      console.log('選択されたテキスト:', selectedText);
      
      // ここで選択されたテキストを使用して処理を行う
      // 例: Ankiに追加する関数を呼び出すなど
      if (item.menuItemId === 'child1') {
        addToAnki(selectedText, 'word on thesis');
      }
    }
  });

  async function sendToAnki(text, definition, example, deck) {
    const ankiConnectUrl = 'http://localhost:8765';
    const note = {
      deckName: deck,
      modelName: 'Basic',
      fields: {
        Front: text,
        Back: `定義: ${definition}\n\n例文: ${example}`
      },
      options: {
        allowDuplicate: false,
        duplicateScope: 'deck'
      },
      tags: ['AnkiWordAdder']
    };
  
    const payload = {
      action: 'addNote',
      version: 6,
      params: {
        note: note
      }
    };
  
    try {
      const response = await fetch(ankiConnectUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error('Ankiへの追加に失敗しました');
      }
  
      const result = await response.json();
      console.log('Ankiに追加されました:', result);
    } catch (error) {
      console.error('Ankiへの追加中にエラーが発生しました:', error);
    }
  }

   // Ankiに追加する関数の例（実際の実装は別途必要）
   async function addToAnki(text, deck) {
    console.log(`"${text}" を ${deck} に追加します`);
    
    // 環境変数で管理したい(セキュリティのため)
    const apiKey = '223dfc34e8msh129cd7ea69dd403p1bc295jsn5b2bff09e53a';
    const url = `https://wordsapiv1.p.rapidapi.com/words/${encodeURIComponent(text)}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      });
  
      if (!response.ok) {
        throw new Error('APIリクエストに失敗しました');
      }
  
      const data = await response.json();
  
      const definition = data.results[0]?.definition || '定義が見つかりません';
      const example = data.results[0]?.examples?.[0] || '例文が見つかりません';
  
      console.log('定義:', definition);
      console.log('例文:', example);
  
      // ここでAnkiにカードを追加するロジックを実装
      sendToAnki(text, definition, example, deck);
  
    } catch (error) {
      console.error('エラー:', error);
    }
  }
}
