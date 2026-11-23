"""Build the resume as HTML (rendered to PDF by render_pdf.cjs) and as an editable DOCX.

Usage (from this folder):
    python3 build_resume.py        # writes resume.html and ../Hammad_Toufeeq_Full_Stack_Developer.docx
    node render_pdf.cjs            # writes ../Hammad_Toufeeq_Full_Stack_Developer.pdf
"""
from html import escape
from pathlib import Path

from docx import Document
from docx.enum.text import WD_TAB_ALIGNMENT, WD_ALIGN_PARAGRAPH
from docx.opc.constants import RELATIONSHIP_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Mm, Pt, RGBColor

import content as C

HERE = Path(__file__).resolve().parent
OUT = HERE.parent
BASENAME = "Hammad_Toufeeq_Full_Stack_Developer"

FONT = "Calibri"
ACCENT = "1F3864"  # dark navy, used only on the name and section headings
BODY_PT, HEAD_PT, NAME_PT = 10.5, 11.5, 19
MARGIN_IN = 0.65


# ---------------------------------------------------------------- HTML / PDF
def build_html() -> str:
    e = escape
    # LinkedIn and GitHub on one line, Portfolio on the next, so no item is split across lines
    parts = [f'{e(label)}: <a href="{e(url)}">{e(url)}</a>' for label, url in C.LINKS]
    links = " | ".join(parts[:2]) + ("<br />" + " | ".join(parts[2:]) if parts[2:] else "")
    skills = "\n".join(f"  <p><b>{e(k)}:</b> {e(v)}</p>" for k, v in C.SKILLS)

    def entry(title, right, bullets):
        right_html = f'<span class="right">{e(right)}</span>' if right else ""
        items = "".join(f"<li>{e(b)}</li>" for b in bullets)
        return f'  <div class="entry"><div class="row"><b>{e(title)}</b>{right_html}</div><ul>{items}</ul></div>'

    exp = "\n".join(entry(t, d, b) for t, d, b in C.EXPERIENCE)
    proj = "\n".join(entry(t, "", b) for t, b in C.PROJECTS)
    edu_l, edu_r = C.EDUCATION

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Hammad Toufeeq - Full Stack Developer Resume</title>
<style>
  @page {{ size: A4; margin: {MARGIN_IN}in; }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: Calibri, Carlito, Arial, sans-serif; font-size: {BODY_PT}pt; line-height: 1.22; color: #000; }}
  a {{ color: inherit; text-decoration: none; }}
  h1 {{ font-size: {NAME_PT}pt; color: #{ACCENT}; text-align: center; letter-spacing: 0.5px; }}
  .title {{ text-align: center; font-weight: bold; font-size: 11pt; margin-top: 1px; }}
  .contact {{ text-align: center; margin-top: 2px; }}
  h2 {{ font-size: {HEAD_PT}pt; color: #{ACCENT}; margin: 8px 0 3px; padding-bottom: 1px; border-bottom: 0.75pt solid #{ACCENT}; }}
  .skills p {{ margin-bottom: 0.5px; }}
  .entry {{ margin-bottom: 4px; }}
  .row {{ display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }}
  .right {{ white-space: nowrap; font-weight: bold; }}
  ul {{ list-style: disc; padding-left: 15px; margin-top: 1px; }}
  li {{ margin-bottom: 1px; }}
</style>
</head>
<body>
  <h1>{e(C.NAME)}</h1>
  <p class="title">{e(C.TITLE)}</p>
  <p class="contact">{e(C.CONTACT).replace(e(C.EMAIL), f'<a href="mailto:{e(C.EMAIL)}">{e(C.EMAIL)}</a>')}</p>
  <p class="contact">{links}</p>

  <h2>PROFESSIONAL SUMMARY</h2>
  <p>{e(C.SUMMARY)}</p>

  <h2>SKILLS</h2>
  <div class="skills">
{skills}
  </div>

  <h2>EXPERIENCE</h2>
{exp}

  <h2>PROJECTS</h2>
{proj}

  <h2>EDUCATION</h2>
  <div class="row"><b>{e(edu_l)}</b><span class="right">{e(edu_r)}</span></div>
</body>
</html>
"""


# ---------------------------------------------------------------- DOCX
def add_hyperlink(paragraph, url, text):
    r_id = paragraph.part.relate_to(url, RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    link = OxmlElement("w:hyperlink")
    link.set(qn("r:id"), r_id)
    run = OxmlElement("w:r")
    rpr = OxmlElement("w:rPr")
    for tag, val in (("w:rFonts", None), ("w:sz", str(int(BODY_PT * 2)))):
        el = OxmlElement(tag)
        if tag == "w:rFonts":
            el.set(qn("w:ascii"), FONT)
            el.set(qn("w:hAnsi"), FONT)
        else:
            el.set(qn("w:val"), val)
        rpr.append(el)
    run.append(rpr)
    t = OxmlElement("w:t")
    t.text = text
    t.set(qn("xml:space"), "preserve")
    run.append(t)
    link.append(run)
    paragraph._p.append(link)


def bottom_rule(paragraph):
    ppr = paragraph._p.get_or_add_pPr()
    bdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    for k, v in (("w:val", "single"), ("w:sz", "6"), ("w:space", "1"), ("w:color", ACCENT)):
        bottom.set(qn(k), v)
    bdr.append(bottom)
    ppr.append(bdr)


def build_docx(path: Path):
    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Mm(210), Mm(297)
    for side in ("left_margin", "right_margin", "top_margin", "bottom_margin"):
        setattr(sec, side, Inches(MARGIN_IN))
    text_width = sec.page_width - sec.left_margin - sec.right_margin

    normal = doc.styles["Normal"]
    normal.font.name = FONT
    normal.element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
    normal.font.size = Pt(BODY_PT)
    normal.paragraph_format.space_after = Pt(0)
    normal.paragraph_format.space_before = Pt(0)
    normal.paragraph_format.line_spacing = 1.0
    accent = RGBColor.from_string(ACCENT)

    def para(text="", bold=False, size=None, align=None, color=None, after=0):
        p = doc.add_paragraph()
        if align:
            p.alignment = align
        p.paragraph_format.space_after = Pt(after)
        if text:
            r = p.add_run(text)
            r.bold = bold
            if size:
                r.font.size = Pt(size)
            if color:
                r.font.color.rgb = color
        return p

    def heading(text):
        p = para(text, bold=True, size=HEAD_PT, color=accent, after=2)
        p.paragraph_format.space_before = Pt(7)
        bottom_rule(p)

    def title_row(left, right):
        p = para()
        p.paragraph_format.tab_stops.add_tab_stop(text_width, WD_TAB_ALIGNMENT.RIGHT)
        p.add_run(left).bold = True
        if right:
            p.add_run("\t" + right).bold = True
        return p

    def bullet(text):
        p = doc.add_paragraph(text, style="List Bullet")
        p.paragraph_format.space_after = Pt(1)
        p.paragraph_format.left_indent = Inches(0.2)
        p.paragraph_format.first_line_indent = Inches(-0.15)

    para(C.NAME, bold=True, size=NAME_PT, align=WD_ALIGN_PARAGRAPH.CENTER, color=accent)
    para(C.TITLE, bold=True, size=11, align=WD_ALIGN_PARAGRAPH.CENTER)
    para(C.CONTACT, align=WD_ALIGN_PARAGRAPH.CENTER)
    p = para(align=WD_ALIGN_PARAGRAPH.CENTER)
    for i, (label, url) in enumerate(C.LINKS):
        if i == 2:  # Portfolio on its own line, matching the PDF
            p = para(align=WD_ALIGN_PARAGRAPH.CENTER)
        p.add_run(("" if i in (0, 2) else " | ") + f"{label}: ")
        add_hyperlink(p, url, url)

    heading("PROFESSIONAL SUMMARY")
    para(C.SUMMARY)

    heading("SKILLS")
    for k, v in C.SKILLS:
        p = para()
        p.add_run(k + ": ").bold = True
        p.add_run(v)

    heading("EXPERIENCE")
    for t, d, bullets in C.EXPERIENCE:
        title_row(t, d)
        for b in bullets:
            bullet(b)
        doc.paragraphs[-1].paragraph_format.space_after = Pt(4)

    heading("PROJECTS")
    for t, bullets in C.PROJECTS:
        title_row(t, "")
        for b in bullets:
            bullet(b)
        doc.paragraphs[-1].paragraph_format.space_after = Pt(4)

    heading("EDUCATION")
    title_row(*C.EDUCATION)

    doc.core_properties.title = "Hammad Toufeeq - Full Stack Developer Resume"
    doc.core_properties.author = "Hammad Toufeeq"
    doc.save(path)


if __name__ == "__main__":
    (HERE / "resume.html").write_text(build_html(), encoding="utf-8")
    build_docx(OUT / f"{BASENAME}.docx")
    print("wrote", HERE / "resume.html", "and", OUT / f"{BASENAME}.docx")
