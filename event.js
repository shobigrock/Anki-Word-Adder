'use strict';

{
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
  chrome.contextMenus.onClicked.addListener(item => {
    console.log(item);
    console.log(item.menuItemId);
  });
}
