# 逢甲遇到佛（FSEEU） - 逢甲大學學生專屬的課程經驗匿名分享論壇

逢甲遇到佛是一個專為逢甲大學在校生設計的課程經驗分享論壇。此平台提供了一個匿名的交流空間，讓學生可以分享每堂課程的經驗與心得，或是提問有興趣的課程，以吸取同學們的寶貴資訊。

![MongoDB Version](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Mongodb Version](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## 特色功能
- **身分認證**：使用學號作為身分認證，僅限逢甲大學在校生使用。
- **匿名分享**：使用匿名形式發表貼文，讓使用者無需擔心隱私問題。
- **留言互動**：使用者可以透過留言與貼文作者互動，提出問題或分享意見。
- **愛心按讚**：使用者可以按下愛心表示喜歡，讓貼文更容易被其他人看到。
- **收藏功能**：使用者可以收藏喜歡的貼文，方便日後查看。
- **檢舉機制**：使用者可以檢舉帶有攻擊性或不適當的貼文，由管理員進行審核並採取必要措施。

## 使用技術
逢甲遇到佛使用了MEVN（MongoDB、Express、Vue.js、Node.js）架構開發。
- **MongoDB**：作為資料庫，儲存使用者資料、貼文內容等。
- **Express**：用於建立後端API和處理HTTP請求。
- **Vue.js**：作為前端框架，用於構建動態的用戶界面。
- **Node.js**：用於建立後端伺服器和處理服務端邏輯。

## 使用說明
1. 使用學號註冊或登入。
2. 瀏覽貼文列表，點擊標題查看詳細內容。
3. 發表新的貼文或在現有貼文下留言。
4. 按下愛心表示喜歡貼文，或將其收藏至個人收藏夾。
5. 如遇不當內容，可透過檢舉功能報告給管理員。

我們希望透過逢甲遇到佛平台，讓逢甲大學的學生們能夠更輕鬆地分享課程經驗，增進互相之間的溝通與交流，同時保持平台的客觀、理性和互相尊重的氛圍。

## 部署方式
1. `.env` 檔案設定
    ```
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    DB_COLLECTION_MAIN=
    DB_COLLECTION_POST=
    DB_COLLECTION_USERINFO=
    DB_COLLECTION_USERTOKEN=
    DB_COLLECTION_MODERATORTOKEN=

    JWT_SEC=
    PASS_SEC=
    ```
2. 安裝相依套件
    - backend
        ```bash
        npm install
        npm start
        ```
    - frontend
        ```bash
        npm install
        npm run serve
        ```
3. 開啟瀏覽器，前往 `http://localhost:8080/` 即可使用。

## Reference
- [使用 Node.js + express + postgres 建立一個後端服務 REST API](https://calvinegs.github.io/posts/nodejs-restapi-postgres/)
- [全端實作-MEVN](https://jacychu.medium.com/全端實作-mevn-1cfb97edae38)
