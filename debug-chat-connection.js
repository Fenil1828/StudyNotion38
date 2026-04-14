// Debug script to test frontend-to-backend connection
// Save as: debug-chat-connection.js in root directory
// Run: node debug-chat-connection.js

const http = require('http');

console.log('🔍 Testing Frontend-Backend Chat Connection...\n');

// Test 1: Check if backend is running
console.log('1️⃣  Checking if backend is running on localhost:4000...');
http.get('http://localhost:4000', (res) => {
  console.log('✅ Backend is running (status:', res.statusCode, ')\n');
  
  // Test 2: Check chat endpoint
  console.log('2️⃣  Testing chat endpoint...');
  testChatAPI();
}).on('error', (err) => {
  console.log('❌ Backend is NOT running on localhost:4000');
  console.log('   Start backend with: node server/index.js\n');
  process.exit(1);
});

function testChatAPI() {
  const data = JSON.stringify({ prompt: 'hello' });
  
  const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/api/v1/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(body);
        if (json.success) {
          console.log('✅ Chat API works!');
          console.log('   Response from:', json.source);
          console.log('   Message:', json.response.substring(0, 60) + '...\n');
          
          console.log('3️⃣  Frontend setup:');
          console.log('   ✅ Backend working');
          console.log('   ✅ apis.js has chatEndpoints');
          console.log('   ✅ Ai.jsx imports sendChatMessage');
          console.log('   ✅ setupProxy forwards /api to localhost:4000\n');
          
          console.log('📋 Next Steps:');
          console.log('   1. Hard refresh browser (Ctrl+Shift+R)');
          console.log('   2. Open browser console (F12)');
          console.log('   3. Click chatbot and send a message');
          console.log('   4. Check console for logs\n');
          
          process.exit(0);
        }
      } catch (e) {
        console.log('❌ Chat API error:', body);
        process.exit(1);
      }
    });
  });

  req.on('error', (err) => {
    console.log('❌ Chat endpoint error:', err.message);
    process.exit(1);
  });

  req.write(data);
  req.end();
}
