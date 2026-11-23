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
BODY_PT, HEAD_PT, NAME_PT, TITLE_PT = 10.5, 11.5, 20, 10
MARGIN_IN = 0.65          # left / right
MARGIN_TB_IN = 0.55       # top / bottom (trimmed so everything fits on one page)
# Widest title letter spacing that pdftotext still reads as whole words ("FULL STACK", not "F U L L").
TITLE_SPACING_PT = 0.9


# ---------------------------------------------------------------- HTML / PDF
def build_html() -> str:
    e = escape
    links = " | ".join(f'<a href="{e(url)}">{e(label)}</a>' for label, url in C.LINKS)
    skills = "\n".join(f"  <p><b>{e(k)}:</b> {e(v)}</p>" for k, v in C.SKILLS)

    def entry(title, right, bullets):
        right_html = f'<span class="right">{e(right)}</span>' if right else ""
        items = "".join(f"<li>{e(b)}</li>" for b in bullets)
        return f'  <div class="entry"><div class="row"><b>{e(title)}</b>{right_html}</div><ul>{items}</ul></div>'

    exp = "\n".join(entry(t, d, b) for t, d, b in C.EXPERIENCE)
    proj = "\n".join(entry(t, "", b) for t, b in C.PROJECTS)
    edu_l, edu_r = C.EDUCATION
    certs = "\n".join(f"  <p>{e(c)}</p>" for c in C.CERTIFICATIONS)

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Hammad Toufeeq - Full Stack Developer Resume</title>
<style>
  @page {{ size: A4; margin: {MARGIN_TB_IN}in {MARGIN_IN}in; }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: Calibri, Carlito, Arial, sans-serif; font-size: {BODY_PT}pt; line-height: 1.15; color: #000; }}
  /* fills the printable page so the URL footer sits at the very bottom */
  .page {{ min-height: calc(297mm - {2 * MARGIN_TB_IN}in - 4mm); display: flex; flex-direction: column; }}
  a {{ color: #000; text-decoration: none; }}
  h1 {{ font-size: {NAME_PT}pt; text-align: center; }}
  .title {{ text-align: center; font-weight: bold; font-size: {TITLE_PT}pt; letter-spacing: {TITLE_SPACING_PT}pt; margin-top: 2px; }}
  .contact {{ text-align: center; margin-top: 3px; }}
  h2 {{ font-size: {HEAD_PT}pt; margin: 8px 0 3px; padding-bottom: 1px; border-bottom: 0.75pt solid #000; }}
  .skills p {{ margin-bottom: 0.5px; }}
  .entry {{ margin-bottom: 4px; }}
  .row {{ display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }}
  .right {{ white-space: nowrap; font-weight: bold; }}
  ul {{ list-style: disc; padding-left: 15px; margin-top: 1px; }}
  li {{ margin-bottom: 1px; }}
</style>
</head>
<body>
<div class="page">
  <h1>{e(C.NAME)}</h1>
  <p class="title">{e(C.TITLE)}</p>
  <p class="contact">{e(C.CONTACT)}</p>
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
  <p><b>{e(edu_l)} — {e(edu_r)}</b></p>

  <h2>CERTIFICATIONS</h2>
{certs}
</div>
</body>
</html>
"""


# ---------------------------------------------------------------- DOCX
def _rpr(size_pt, bold=False, border=False):
    rpr = OxmlElement("w:rPr")
    fonts = OxmlElement("w:rFonts")
    fonts.set(qn("w:ascii"), FONT)
    fonts.set(qn("w:hAnsi"), FONT)
    rpr.append(fonts)
    if bold:
        rpr.append(OxmlElement("w:b"))
    color = OxmlElement("w:color")
    color.set(qn("w:val"), "000000")
    rpr.append(color)
    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), str(int(size_pt * 2)))
    rpr.append(sz)
    if border:  # Word draws a box around the run: the DOCX version of a button
        bdr = OxmlElement("w:bdr")
        for k, v in (("w:val", "single"), ("w:sz", "8"), ("w:space", "2"), ("w:color", "000000")):
            bdr.set(qn(k), v)
        rpr.append(bdr)
    return rpr


def add_hyperlink(paragraph, url, text, size_pt, bold=False, border=False):
    r_id = paragraph.part.relate_to(url, RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    link = OxmlElement("w:hyperlink")
    link.set(qn("r:id"), r_id)
    run = OxmlElement("w:r")
    run.append(_rpr(size_pt, bold, border))
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
    for k, v in (("w:val", "single"), ("w:sz", "6"), ("w:space", "1"), ("w:color", "000000")):
        bottom.set(qn(k), v)
    bdr.append(bottom)
    ppr.append(bdr)


def build_docx(path: Path):
    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Mm(210), Mm(297)
    sec.left_margin = sec.right_margin = Inches(MARGIN_IN)
    sec.top_margin = sec.bottom_margin = Inches(MARGIN_TB_IN)
    sec.footer_distance = Inches(0.3)
    text_width = sec.page_width - sec.left_margin - sec.right_margin
    black = RGBColor(0, 0, 0)

    normal = doc.styles["Normal"]
    normal.font.name = FONT
    normal.font.color.rgb = black
    normal.element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
    normal.font.size = Pt(BODY_PT)
    normal.paragraph_format.space_after = Pt(0)
    normal.paragraph_format.space_before = Pt(0)
    normal.paragraph_format.line_spacing = 1.0

    def para(text="", bold=False, size=None, align=None, after=0):
        p = doc.add_paragraph()
        if align is not None:
            p.alignment = align
        p.paragraph_format.space_after = Pt(after)
        if text:
            r = p.add_run(text)
            r.bold = bold
            r.font.color.rgb = black
            if size:
                r.font.size = Pt(size)
        return p

    def heading(text):
        p = para(text, bold=True, size=HEAD_PT, after=2)
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

    # Header
    para(C.NAME, bold=True, size=NAME_PT, align=WD_ALIGN_PARAGRAPH.CENTER)
    p = para(align=WD_ALIGN_PARAGRAPH.CENTER)
    r = p.add_run(C.TITLE)
    r.bold, r.font.size = True, Pt(TITLE_PT)
    spacing = OxmlElement("w:spacing")  # character spacing, not space characters
    spacing.set(qn("w:val"), str(int(TITLE_SPACING_PT * 20)))
    r._r.get_or_add_rPr().append(spacing)
    para(C.CONTACT, align=WD_ALIGN_PARAGRAPH.CENTER)
    p = para(align=WD_ALIGN_PARAGRAPH.CENTER)
    for i, (label, url) in enumerate(C.LINKS):
        if i:
            p.add_run(" | ")
        add_hyperlink(p, url, label, BODY_PT)

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
    para(f"{C.EDUCATION[0]} — {C.EDUCATION[1]}", bold=True)

    heading("CERTIFICATIONS")
    for c in C.CERTIFICATIONS:
        para(c)


    doc.core_properties.title = "Hammad Toufeeq - Full Stack Developer Resume"
    doc.core_properties.author = "Hammad Toufeeq"
    doc.save(path)


if __name__ == "__main__":
    (HERE / "resume.html").write_text(build_html(), encoding="utf-8")
    build_docx(OUT / f"{BASENAME}.docx")
    print("wrote", HERE / "resume.html", "and", OUT / f"{BASENAME}.docx")
