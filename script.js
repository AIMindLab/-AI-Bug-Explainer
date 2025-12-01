// ضع مفتاح API هنا بعد رفعه على GitHub:
const API_KEY = "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";

document.getElementById("send").onclick = async () => {
  const code = document.getElementById("code").value;
  const error = document.getElementById("error").value;

  if(!API_KEY || API_KEY === "YOUR_API_KEY_HERE"){
    document.getElementById("result").innerHTML = "❌ الرجاء إضافة مفتاح API في script.js";
    return;
  }

  const prompt = `الكود:
${code}

الخطأ:
${error}

اشرح لي المشكلة واعطني الحل.`;

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model:"grok-2-latest",
      messages:[{role:"user", content: prompt}]
    })
  });

  const data = await res.json();
  document.getElementById("result").innerHTML =
    data.choices?.[0]?.message?.content || "لم يصل رد.";
};
