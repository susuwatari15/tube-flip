# Chrome Web Store — Submission Content

Bản thảo để copy-paste vào Developer Dashboard. Điền y nguyên; phần nào cần bạn tự làm đã ghi rõ.

---

## 0. File tải lên (Package)
- **ZIP:** `youtube-video-rotation-v1.0.0.zip` (đã tạo ở gốc repo, 6 file, `manifest.json` ở gốc archive).
- Manifest đã đủ trường bắt buộc: `name`, `version` (1.0.0), `manifest_version` (3), `description`, `icons` (16/48/128).

---

## 1. Store listing

**Language (default):** English (United States)

**Extension name:**
```
YouTube Video Rotation
```

**Short description** (tối đa 132 ký tự):
```
Add rotate and flip buttons to the YouTube player. Turn any video 90° or mirror it right from the controls bar.
```

**Detailed description:**
```
YouTube Video Rotation adds three small buttons to the YouTube player controls, next to the Settings gear:

• Rotate — each click turns the video 90° clockwise (0° → 90° → 180° → 270°). At 90° and 270° the video is scaled to stay inside the player.
• Flip horizontal — mirror the video left-to-right.
• Flip vertical — mirror the video top-to-bottom.

Rotation and flip work together, so you can fix footage that was recorded sideways or mirrored.

The controls appear automatically on YouTube watch pages (youtube.com/watch). They are re-added after you navigate to another video, and the view resets when you open a new video.

Privacy: this extension does not collect, store, or transmit any data. It has no background servers, no analytics, and no account. It only changes how the video is displayed in your own browser using a CSS transform.
```

**Category:** Tools
*(phương án khác phù hợp: "Functionality & UI" hoặc "Entertainment")*

---

## 2. Graphic assets

| Asset | Yêu cầu | Trạng thái |
|-------|---------|-----------|
| Store icon | 128×128 PNG | ✅ Có sẵn: `icons/icon128.png` |
| Screenshot | 1280×800 **hoặc** 640×400 PNG/JPEG, tối thiểu 1 (tối đa 5) | ⏳ **Bạn cung cấp** |
| Small promo tile (tùy chọn) | 440×280 PNG/JPEG | ⏳ Tùy chọn — báo nếu muốn tôi tạo |
| Marquee promo tile (tùy chọn) | 1400×560 | ⏳ Tùy chọn |

Gợi ý nội dung screenshot: ảnh player YouTube đang mở, thấy rõ 3 nút rotate/flip cạnh nút Settings; nên có 1 ảnh trước khi xoay và 1 ảnh video đã xoay 90°.

---

## 3. Privacy practices (bắt buộc điền)

**Single purpose (mô tả mục đích duy nhất):**
```
This extension lets the user rotate (in 90° steps) and flip the currently playing YouTube video using buttons added to the player controls, by applying a CSS transform to the video element.
```

**Permission justifications:**
- Extension **không khai báo** trường `permissions` hay `host_permissions` nào → không cần justify quyền API.
- Có **host access** thông qua content script chạy trên `*://www.youtube.com/watch*`. Nếu Dashboard hỏi lý do host access, dùng:
```
The content script runs only on YouTube watch pages (youtube.com/watch) to inject rotate/flip buttons into the player and apply a CSS transform to the video element. This host access is required to modify the player UI on those pages. No page data is read, collected, or sent anywhere.
```
- Không dùng remote code → khi được hỏi "Are you using remote code?" chọn **No**.

**Data usage — khai báo (data disclosure):**
- Chọn **không thu thập** cho tất cả các loại dữ liệu (personally identifiable info, health, financial, authentication, personal communications, location, web history, user activity, website content).
- Tích 3 cam kết bắt buộc:
  - Không bán dữ liệu cho bên thứ ba.
  - Chỉ dùng/chuyển dữ liệu cho chức năng cốt lõi (không áp dụng vì không có dữ liệu).
  - Không dùng/chuyển dữ liệu để đánh giá tín dụng / cho vay.

**Privacy Policy URL:** không bắt buộc vì extension không thu thập dữ liệu và không dùng quyền nhạy cảm. (Nếu Dashboard vẫn bắt buộc một URL, cần tạo một trang chính sách đơn giản — báo tôi soạn giúp.)

---

## 4. Distribution / Submit
- **Visibility:** chọn Public / Unlisted / Private tùy ý (Public = ai cũng tìm được).
- **Regions:** All regions (mặc định).
- Bấm **Submit for review**. Vì extension không có permission nhạy cảm, thời gian duyệt thường nhanh (24h–vài ngày).

---

## Checklist trước khi Submit
- [ ] Đã test tay extension trên youtube.com/watch (rotate, flip, sau quảng cáo, fullscreen, đổi video).
- [ ] Upload `youtube-video-rotation-v1.0.0.zip`.
- [ ] Điền name + short + detailed description.
- [ ] Chọn category = Tools, language = English (US).
- [ ] Upload ≥1 screenshot (1280×800 hoặc 640×400).
- [ ] Điền Single purpose + host access justification.
- [ ] Khai báo data usage = không thu thập + tích 3 cam kết.
- [ ] Submit for review.
