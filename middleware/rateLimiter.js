import rateLimit  from "express-rate-limit";

const limiter = rateLimit({
windowMs: 15 * 60 * 1000, //เป็นการกำหนดให้ฝั่งหน้าบ้านยิงคำขอโดยกำหนดเวลาที่15นาที 15*60*1000 = 900,000 มิลลิวินาที
max : 100, //กำหนดจำนวนคำขอใน15นาที ส่งได้มากสุดที่ 100 คำขอ
standardHeaders: true, //ส่งข้อมูล rate limit กลับใน header (ตามมาตรฐาน RFC)
legacyHeaders: false, //ไม่ส่ง header เก่าแบบ 'X-RateLimit-*'

});
export default limiter;