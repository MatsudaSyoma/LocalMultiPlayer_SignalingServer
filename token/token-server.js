const express = require('express');
const cors = require('cors');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const PORT = 3000;

const APP_ID = "26356e4789c3407caf8e2b3d168d41b5";
const APP_CERTIFICATE = "9009d8c5f3d8450e9c6d9d352238f46d"; // Agora Console で確認
const CHANNEL_NAME = "test";

// ✅ CORSの設定を追加
app.use(cors({
    origin: 'http://localhost', // フロントエンドのURLに合わせてください
    methods: ['GET'],
}));

app.get('/token', (req, res) => {
    const uid = parseInt(req.query.uid) || 0;
    const role = RtcRole.PUBLISHER;
    const expireTime = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTimestamp + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        CHANNEL_NAME,
        uid,
        role,
        privilegeExpireTime
    );

    res.send(token);
});

app.listen(PORT, () => {
    console.log(`Token server running on http://localhost:${PORT}`);
});
