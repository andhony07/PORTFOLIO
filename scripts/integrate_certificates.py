import os
import shutil
from PIL import Image

src_pdf_dir = r"D:\PORTFOLIO\temp_certificates"
src_img_dir = r"D:\PORTFOLIO\temp_certificates\renders"
dest_dir = r"D:\PORTFOLIO\public\assets\certificates"
dest_pdf_dir = os.path.join(dest_dir, "documents")

os.makedirs(dest_dir, exist_ok=True)
os.makedirs(dest_pdf_dir, exist_ok=True)

# Mapping of original files to canonical filenames
mapping = {
    # Certifications
    "Programming In Java": ("nptel-java", "nptel-java.png", "nptel-programming-in-java.pdf"),
    "AWS-Prompt Engineering": ("aws-bedrock-prompt-eng", "aws-bedrock-prompt-eng.png", "aws-prompt-engineering.pdf"),
    "AWS-Automating Cloud Security": ("aws-cloud-security", "aws-cloud-security.png", "aws-automating-cloud-security.pdf"),
    "Deloitte-Technology job sim": ("deloitte-technology", "deloitte-technology.png", "deloitte-technology-job-sim.pdf"),
    "Deloitte-Data Analytics Job sim": ("deloitte-data-analytics", "deloitte-data-analytics.png", "deloitte-data-analytics-job-sim.pdf"),
    "Tata-GenAi (Data Analytics)": ("tata-genai-analytics", "tata-genai-analytics.png", "tata-genai-data-analytics.pdf"),
    "Vista-AI in Action Job sim": ("vista-ai-in-action", "vista-ai-in-action.png", "vista-ai-in-action-job-sim.pdf"),
    "python_basic certificate": ("hackerrank-python-basic", "hackerrank-python-basic.png", "hackerrank-python-basic.pdf"),
    "problem_solving_basic certificate": ("hackerrank-problem-solving-basic", "hackerrank-problem-solving-basic.png", "hackerrank-problem-solving-basic.pdf"),
    
    # Achievements
    "Adobe Hackathon": ("adobe-hackathon", "adobe-hackathon.png", "adobe-hackathon.pdf"),
    "Frontend-Odyssey": ("frontend-odyssey", "frontend-odyssey.png", "frontend-odyssey.pdf"),
    "HackSprint_Andhony_Saviyar": ("hacksprint-26", "hacksprint-26.png", "hacksprint-26.pdf"),
    "TVS-Certificate": ("tvs-credit-epic", "tvs-credit-epic.png", "tvs-credit-epic.pdf"),
    "Orchestrate-Hackerrank": ("hackerrank-orchestrate", "hackerrank-orchestrate.png", "hackerrank-orchestrate.pdf"),
    
    # Experience
    "Code_Alpha_Python_Internship": ("internship-codealpha", "internship-codealpha.png", "codealpha-python-internship.pdf"),
    "LOR_Andhony Saviyar": ("lor-codealpha", "lor-codealpha.png", "codealpha-lor.pdf"),
    "Internship -Brainery": ("internship-brainery", "internship-brainery.png", "brainery-spot-internship.pdf"),
    "be10x Certificate": ("workshop-be10x", "workshop-be10x.png", "be10x-claude-workshop.pdf"),
}

print(f"Processing and copying {len(mapping)} certificate assets...")

for orig_base, (cid, target_img, target_pdf) in mapping.items():
    # 1. Copy PDF
    src_pdf = os.path.join(src_pdf_dir, f"{orig_base}.pdf")
    dest_pdf = os.path.join(dest_pdf_dir, target_pdf)
    shutil.copy2(src_pdf, dest_pdf)
    
    # 2. Optimize and save web image (target width: 1400px max, web-optimized PNG)
    src_png = os.path.join(src_img_dir, f"{orig_base}.png")
    dest_png = os.path.join(dest_dir, target_img)
    
    im = Image.open(src_png)
    if im.mode in ('RGBA', 'LA'):
        background = Image.new('RGB', im.size, (255, 255, 255))
        background.paste(im, mask=im.split()[-1])
        im = background
    elif im.mode != 'RGB':
        im = im.convert('RGB')
        
    # Resize if excessively large for fast loading
    if im.width > 1600:
        ratio = 1600 / im.width
        new_size = (1600, int(im.height * ratio))
        im = im.resize(new_size, Image.Resampling.LANCZOS)
        
    im.save(dest_png, "PNG", optimize=True)
    size_kb = os.path.getsize(dest_png) / 1024
    print(f"[SAVED] {target_img} ({size_kb:.1f} KB) & {target_pdf}")

print("All assets successfully integrated into public/assets/certificates/")

