import os
import re
import glob

def build():
    # Read template
    with open("template.html", "r", encoding="utf-8") as f:
        template = f.read()
    
    # Get all pages
    page_files = glob.glob("pages/*.html")
    
    for page_file in page_files:
        with open(page_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Extract sections using regex
        head_meta_match = re.search(r'<!-- HEAD_META -->(.*?)<!-- END_HEAD_META -->', content, re.DOTALL)
        page_content_match = re.search(r'<!-- PAGE_CONTENT -->(.*?)<!-- END_PAGE_CONTENT -->', content, re.DOTALL)
        page_scripts_match = re.search(r'<!-- PAGE_SCRIPTS -->(.*?)<!-- END_PAGE_SCRIPTS -->', content, re.DOTALL)
        
        head_meta = head_meta_match.group(1).strip() if head_meta_match else ""
        page_content = page_content_match.group(1).strip() if page_content_match else ""
        page_scripts = page_scripts_match.group(1).strip() if page_scripts_match else ""
        
        # Replace in template
        final_html = template.replace("<!-- HEAD_META -->", head_meta)
        final_html = final_html.replace("<!-- PAGE_CONTENT -->", page_content)
        final_html = final_html.replace("<!-- PAGE_SCRIPTS -->", page_scripts)
        
        # Get filename and write to root
        basename = os.path.basename(page_file)
        with open(basename, "w", encoding="utf-8") as f:
            f.write(final_html)
        
        print(f"Generated {basename}")

if __name__ == "__main__":
    build()
