import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY

# 1. Register Fonts
pdfmetrics.registerFont(TTFont('Segoe', r'C:\Windows\Fonts\segoeui.ttf'))
pdfmetrics.registerFont(TTFont('Segoe-Bold', r'C:\Windows\Fonts\segoeuib.ttf'))
pdfmetrics.registerFont(TTFont('Segoe-Italic', r'C:\Windows\Fonts\segoeuii.ttf'))

addMapping('Segoe', 0, 0, 'Segoe')
addMapping('Segoe', 1, 0, 'Segoe-Bold')
addMapping('Segoe', 0, 1, 'Segoe-Italic')
addMapping('Segoe', 1, 1, 'Segoe-Bold')

OUTPUT_PDF = 'public/556_resume.pdf'
PAGE_WIDTH, PAGE_HEIGHT = A4 # 595.28 x 841.89

# Color Palette
DARK_BG = colors.HexColor('#0C0E14')        # Deep Charcoal Slate
LIGHT_BG = colors.HexColor('#F8F9FA')       # Crisp Off-White
DARK_SPLIT_X = 378.0                        # Balanced Column Boundary

TEXT_WHITE = colors.HexColor('#FFFFFF')
TEXT_MUTED = colors.HexColor('#94A3B8')      # Slate 400
TEXT_LIGHT = colors.HexColor('#CBD5E1')      # Slate 300
TEXT_ACCENT = colors.HexColor('#38BDF8')     # Sky 400
LINE_DARK = colors.HexColor('#1E293B')       # Slate 800

TEXT_DARK = colors.HexColor('#0F172A')       # Slate 900
TEXT_DARK_MUTED = colors.HexColor('#475569') # Slate 600
BRAND_BLUE = colors.HexColor('#2563EB')      # Blue 600
LINE_LIGHT = colors.HexColor('#E2E8F0')      # Slate 200

c = canvas.Canvas(OUTPUT_PDF, pagesize=A4)
c.setTitle("Bhone Myat Hein - Flutter Specialist Resume")
c.setAuthor("Bhone Myat Hein")
c.setSubject("Software Engineer / Flutter Specialist Resume")

# ─────────────────────────────────────────────────────────────────────────────
# 1. Backgrounds
# ─────────────────────────────────────────────────────────────────────────────
c.setFillColor(DARK_BG)
c.rect(0, 0, DARK_SPLIT_X, PAGE_HEIGHT, fill=True, stroke=False)

c.setFillColor(LIGHT_BG)
c.rect(DARK_SPLIT_X, 0, PAGE_WIDTH - DARK_SPLIT_X, PAGE_HEIGHT, fill=True, stroke=False)

# Thin vertical subtle divider
c.setStrokeColor(colors.HexColor('#E2E8F0'))
c.setLineWidth(0.5)
c.line(DARK_SPLIT_X, 0, DARK_SPLIT_X, PAGE_HEIGHT)

# ─────────────────────────────────────────────────────────────────────────────
# 2. Header (Top Left on Dark BG)
# ─────────────────────────────────────────────────────────────────────────────
c.setFillColor(TEXT_WHITE)
c.setFont('Segoe-Bold', 23)
c.drawString(38, 774, "BHONE MYAT HEIN")

c.setFillColor(TEXT_ACCENT)
c.setFont('Segoe-Bold', 9.5)
c.drawString(39, 756, "FLUTTER SPECIALIST  ·  MOBILE DEVELOPER")

# Divider line under title
c.setStrokeColor(colors.HexColor('#334155'))
c.setLineWidth(1)
c.line(38, 744, 236, 744)

# ─────────────────────────────────────────────────────────────────────────────
# 3. Profile Photo (Top Right spanning across split)
# ─────────────────────────────────────────────────────────────────────────────
photo_x = 258.0
photo_w = 238.0
photo_h = 238.0
photo_y = 502.0

photo_path = 'public/resume_profile_square.jpg'
if os.path.exists(photo_path):
    c.drawImage(photo_path, photo_x, photo_y, width=photo_w, height=photo_h, mask='auto')
    c.setStrokeColor(colors.HexColor('#334155'))
    c.setLineWidth(1)
    c.rect(photo_x, photo_y, photo_w, photo_h, fill=False, stroke=True)

# ─────────────────────────────────────────────────────────────────────────────
# 4. About Me (Left of Photo)
# ─────────────────────────────────────────────────────────────────────────────
c.setFillColor(TEXT_WHITE)
c.setFont('Segoe-Bold', 11.5)
c.drawString(38, 720, "About Me")

styles = getSampleStyleSheet()
about_style = ParagraphStyle(
    'AboutStyle',
    parent=styles['Normal'],
    fontName='Segoe',
    fontSize=8.1,
    leading=11.6,
    textColor=TEXT_LIGHT,
    alignment=TA_LEFT
)

about_text = (
    "Production-focused <b>Flutter Specialist</b> dedicated to engineering clean, "
    "modular mobile applications with strict layer separation and predictable state management "
    "(Riverpod, BLoC, Provider).<br/><br/>"
    "Experienced in offline-first transactional pipelines (Isar, Sqflite), RESTful API "
    "integration (Dio), Firebase real-time backends, and live IoT hardware telemetry (ESP32).<br/><br/>"
    "Proven track record delivering published production apps on <b>APKPure</b> with responsive 60fps UX "
    "and automated test coverage."
)

p_about = Paragraph(about_text, about_style)
about_w = 205
w_a, h_a = p_about.wrap(about_w, 400)
p_about.drawOn(c, 38, 706 - h_a)

# ─────────────────────────────────────────────────────────────────────────────
# 5. Experience & Education Timeline (Left Column below Photo)
# ─────────────────────────────────────────────────────────────────────────────
cur_y = 480

c.setFillColor(TEXT_WHITE)
c.setFont('Segoe-Bold', 11.5)
c.drawString(38, cur_y, "Experience & Education")
cur_y -= 16

timeline_x = 44
timeline_start_y = cur_y - 2
timeline_end_y = 145
c.setStrokeColor(colors.HexColor('#334155'))
c.setLineWidth(1)
c.line(timeline_x, timeline_start_y, timeline_x, timeline_end_y)

def draw_node(y_pos):
    c.setFillColor(TEXT_ACCENT)
    c.circle(timeline_x, y_pos, 3.2, fill=True, stroke=False)
    c.setFillColor(DARK_BG)
    c.circle(timeline_x, y_pos, 1.6, fill=True, stroke=False)

intern_body_style = ParagraphStyle(
    'InternBody', parent=styles['Normal'],
    fontName='Segoe', fontSize=7.7, leading=10.6,
    textColor=TEXT_LIGHT
)

# ── Entry 1: San Dev Internship ──────────────────────────
draw_node(cur_y)
c.setFillColor(TEXT_WHITE)
c.setFont('Segoe-Bold', 9.2)
c.drawString(55, cur_y - 3, "Flutter Developer Intern")
c.setFillColor(TEXT_ACCENT)
c.setFont('Segoe-Bold', 8.2)
c.drawRightString(DARK_SPLIT_X - 18, cur_y - 3, "2025")

cur_y -= 13
c.setFillColor(TEXT_MUTED)
c.setFont('Segoe-Italic', 8.2)
c.drawString(55, cur_y, "San Dev  ·  Mobile Studio 1 Program")

cur_y -= 11
p1 = Paragraph(
    "• Translated complex Figma design specs into responsive Flutter interfaces with modular widgets.<br/>"
    "• Integrated REST APIs via Dio with token rotation, error interceptors, and typed JSON schemas.<br/>"
    "• Implemented reactive state management and collaborated closely in team code reviews.",
    intern_body_style
)
w, h = p1.wrap(DARK_SPLIT_X - 74, 200)
p1.drawOn(c, 55, cur_y - h)
cur_y -= (h + 14)

# ── Entry 2: Independent Software Engineering ─────────────
draw_node(cur_y)
c.setFillColor(TEXT_WHITE)
c.setFont('Segoe-Bold', 9.2)
c.drawString(55, cur_y - 3, "Independent Mobile Engineer")
c.setFillColor(TEXT_ACCENT)
c.setFont('Segoe-Bold', 8.2)
c.drawRightString(DARK_SPLIT_X - 18, cur_y - 3, "2024 – Present")

cur_y -= 13
c.setFillColor(TEXT_MUTED)
c.setFont('Segoe-Italic', 8.2)
c.drawString(55, cur_y, "Self-Directed  ·  Production Portfolio Releases")

cur_y -= 11
p2 = Paragraph(
    "• <b>PocketPilot:</b> Published live to APKPure; offline-first Isar NoSQL caching & Riverpod 3.<br/>"
    "• <b>Plant Monitoring:</b> ESP32 telemetry, MJPEG live video streaming & Gemini AI vision.<br/>"
    "• <b>Quick Puz:</b> 6-in-1 modular puzzle game engine validated with 38 automated test suites.",
    intern_body_style
)
w, h = p2.wrap(DARK_SPLIT_X - 74, 200)
p2.drawOn(c, 55, cur_y - h)
cur_y -= (h + 14)

# ── Entry 3: Education ───────────────────────────────────
draw_node(cur_y)
c.setFillColor(TEXT_WHITE)
c.setFont('Segoe-Bold', 9.2)
c.drawString(55, cur_y - 3, "Bachelor of Computer Science (B.C.Sc)")
c.setFillColor(TEXT_ACCENT)
c.setFont('Segoe-Bold', 8.2)
c.drawRightString(DARK_SPLIT_X - 18, cur_y - 3, "2022 – 2025")

cur_y -= 13
c.setFillColor(TEXT_MUTED)
c.setFont('Segoe-Italic', 8.2)
c.drawString(55, cur_y, "University of Computer Studies (Meiktila)")

cur_y -= 11
p3 = Paragraph(
    "• <b>Graduated:</b> January 2026  ·  <b>GPA:</b> 2.63 / 4.0<br/>"
    "• <b>Capstone Thesis:</b> Domestic Airline Ticket Reservation System (Flutter + Laravel REST API).<br/>"
    "• <i>Coursework:</i> University of Computer Studies (Loikaw) (2017 – 2020).",
    intern_body_style
)
w, h = p3.wrap(DARK_SPLIT_X - 74, 200)
p3.drawOn(c, 55, cur_y - h)
cur_y -= (h + 14)

# ── Entry 4: Training & Course ────────────────────────────
draw_node(cur_y)
c.setFillColor(TEXT_WHITE)
c.setFont('Segoe-Bold', 9.2)
c.drawString(55, cur_y - 3, "Flutter Basic Course & Certification")
c.setFillColor(TEXT_ACCENT)
c.setFont('Segoe-Bold', 8.2)
c.drawRightString(DARK_SPLIT_X - 18, cur_y - 3, "2024 – 2025")

cur_y -= 13
c.setFillColor(TEXT_MUTED)
c.setFont('Segoe-Italic', 8.2)
c.drawString(55, cur_y, "San Dev Training Center  ·  Foundation Certification")
cur_y -= 26

# ─────────────────────────────────────────────────────────────────────────────
# 6. Languages & Core Strengths (Bottom Left)
# ─────────────────────────────────────────────────────────────────────────────
c.setFillColor(TEXT_WHITE)
c.setFont('Segoe-Bold', 11)
c.drawString(38, cur_y, "Languages")

c.drawString(180, cur_y, "Core Engineering Strengths")
cur_y -= 14

# Language progress bars
langs = [
    ("Burmese", "Native / Fluent", 1.0),
    ("English", "B2 Upper-Int.", 0.75),
    ("Chinese", "Elementary", 0.35),
]

lang_y = cur_y
for name, level, pct in langs:
    c.setFillColor(colors.HexColor('#E2E8F0'))
    c.setFont('Segoe-Bold', 7.8)
    c.drawString(38, lang_y, name)
    c.setFillColor(TEXT_MUTED)
    c.setFont('Segoe', 7.3)
    c.drawString(84, lang_y, level)
    
    # Progress bar
    bar_x = 38
    bar_w = 115
    bar_h = 4
    c.setFillColor(colors.HexColor('#1E293B'))
    c.roundRect(bar_x, lang_y - 8, bar_w, bar_h, 2, fill=True, stroke=False)
    c.setFillColor(TEXT_ACCENT)
    c.roundRect(bar_x, lang_y - 8, bar_w * pct, bar_h, 2, fill=True, stroke=False)
    
    lang_y -= 19

# Core strengths bullet points
p_arch = Paragraph(
    "• <b>Clean Architecture:</b> Domain-driven layer separation.<br/>"
    "• <b>Offline Resilience:</b> Isar / Sqflite background sync.<br/>"
    "• <b>Testing Standards:</b> Widget & Unit test automation.<br/>"
    "• <b>Store Deployment:</b> Keystore signing & APKPure live.",
    ParagraphStyle(
        'ArchStyle', parent=styles['Normal'],
        fontName='Segoe', fontSize=7.4, leading=10.2,
        textColor=TEXT_LIGHT
    )
)
w_arch, h_arch = p_arch.wrap(DARK_SPLIT_X - 188, 80)
p_arch.drawOn(c, 180, cur_y - h_arch)


# ─────────────────────────────────────────────────────────────────────────────
# 7. Right Column (Light BG) - Below Photo
# ─────────────────────────────────────────────────────────────────────────────
rx = DARK_SPLIT_X + 18
rw = PAGE_WIDTH - rx - 18
ry = 480

# ── Contact & Profiles ─────────────────────────────────────
c.setFillColor(TEXT_DARK)
c.setFont('Segoe-Bold', 11.5)
c.drawString(rx, ry, "Contact & Profiles")
c.setStrokeColor(LINE_LIGHT)
c.setLineWidth(1)
c.line(rx, ry - 4, rx + rw, ry - 4)
ry -= 15

contact_rows = [
    ("Phone", "+95 977 538 6728", "tel:+959775386728"),
    ("Email", "556bhonemyathein@gmail.com", "mailto:556bhonemyathein@gmail.com"),
    ("Website", "556bhonemyathein.tech", "https://556bhonemyathein.tech"),
    ("GitHub", "github.com/556bhonemyathein", "https://github.com/556bhonemyathein"),
    ("LinkedIn", "in/556bhonemyathein", "https://www.linkedin.com/in/556bhonemyathein/"),
    ("Location", "Yangon, Myanmar", None),
]

for label, val, link in contact_rows:
    c.setFillColor(BRAND_BLUE)
    c.setFont('Segoe-Bold', 7.8)
    c.drawString(rx, ry, label)
    
    c.setFillColor(TEXT_DARK)
    c.setFont('Segoe', 8.0)
    vx = rx + 44
    c.drawString(vx, ry, val)
    if link:
        vw = c.stringWidth(val, 'Segoe', 8.0)
        c.linkURL(link, (vx, ry - 2, vx + vw, ry + 9), relative=0)
    ry -= 13.0

ry -= 5

# ── Technical Skills ───────────────────────────────────────
c.setFillColor(TEXT_DARK)
c.setFont('Segoe-Bold', 11.5)
c.drawString(rx, ry, "Technical Skills")
c.setStrokeColor(LINE_LIGHT)
c.setLineWidth(1)
c.line(rx, ry - 4, rx + rw, ry - 4)
ry -= 13

skill_entries = [
    ("Flutter & Modern Dart", "Dart 3 records, Material 3, Cupertino, spring/physics animations"),
    ("State Management", "Riverpod, BLoC / Cubit, Provider, GetX, reactive streams"),
    ("Offline DB & Storage", "Isar NoSQL, Sqflite, Hive, SecureStorage, local-first cache"),
    ("Networking & Cloud", "REST APIs, Dio interceptors, JWT rotation, Firebase Auth & Firestore"),
    ("Architecture & Patterns", "Clean Architecture, Feature-First, MVVM, Repository pattern"),
    ("Hardware, IoT & DevOps", "ESP32 telemetry, MQTT, MJPEG stream, flutter_test, APKPure live"),
]

for title, desc in skill_entries:
    c.setFillColor(colors.HexColor('#0F172A'))
    c.setFont('Segoe-Bold', 7.9)
    c.drawString(rx, ry, f"•  {title}")
    ry -= 9.0
    
    p_sk = Paragraph(
        desc,
        ParagraphStyle(
            'SkStyle', parent=styles['Normal'],
            fontName='Segoe', fontSize=7.2, leading=9.0,
            textColor=TEXT_DARK_MUTED
        )
    )
    w_sk, h_sk = p_sk.wrap(rw - 10, 40)
    p_sk.drawOn(c, rx + 10, ry - h_sk)
    ry -= (h_sk + 5.0)

ry -= 5

# ── Featured Portfolio Projects ────────────────────────────
c.setFillColor(TEXT_DARK)
c.setFont('Segoe-Bold', 11.5)
c.drawString(rx, ry, "Featured Projects")
c.setStrokeColor(LINE_LIGHT)
c.setLineWidth(1)
c.line(rx, ry - 4, rx + rw, ry - 4)
ry -= 13

projects = [
    ("PocketPilot", "APKPure Release", "Personal finance app with offline-first Isar DB, Riverpod 3 & Dio retry."),
    ("Plant Monitoring", "IoT & Gemini AI", "ESP32 crop telemetry, live MJPEG stream & AI vision plant diagnosis."),
    ("Airline Ticket System", "B.C.Sc Capstone", "Domestic flight booking, seat locking, multi-wallets & thermal PDF pass."),
    ("Quick Puz", "6-in-1 Engine", "Modular puzzle suite with solvable parity math & 38 passing tests."),
]

for p_title, p_tag, p_desc in projects:
    c.setFillColor(colors.HexColor('#0F172A'))
    c.setFont('Segoe-Bold', 7.8)
    c.drawString(rx, ry, p_title)
    
    c.setFillColor(BRAND_BLUE)
    c.setFont('Segoe-Bold', 7.0)
    c.drawRightString(rx + rw, ry, p_tag)
    ry -= 8.5
    
    p_proj = Paragraph(
        p_desc,
        ParagraphStyle(
            'ProjStyle', parent=styles['Normal'],
            fontName='Segoe', fontSize=7.1, leading=8.8,
            textColor=TEXT_DARK_MUTED
        )
    )
    w_pr, h_pr = p_proj.wrap(rw - 4, 30)
    p_proj.drawOn(c, rx, ry - h_pr)
    ry -= (h_pr + 5.5)

c.save()
print(f"Generated {OUTPUT_PDF} successfully! Final ry = {ry}")

