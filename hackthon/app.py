from flask import Flask, render_template, redirect, url_for, request
import os
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
import re
import spacy
from spacy.matcher import PhraseMatcher

app = Flask(__name__)

# Configuration for file uploads
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # SQLite database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Load spaCy NLP Model
nlp = spacy.load("en_core_web_sm")

# Database Model for Resumes
class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(100), nullable=False)
    filepath = db.Column(db.String(200), nullable=False)
    extracted_text = db.Column(db.Text, nullable=True)

# Create the database and tables
with app.app_context():
    db.create_all()

# Function to extract skills
def extract_skills(text):
    skills_list = [
        "Python", "Machine Learning", "Deep Learning", "JavaScript", "Data Science", 
        "NLP", "AI", "Cloud Computing", "Coursera", "edX", "Deep Learning Specialization", 
        "Data Science Bootcamp", "AI for Everyone", "Advanced Machine Learning", 
        "Applied Data Science with Python", "Data Science A-Z", "Introduction to Data Science",
        "AI Programming with Python", "Data Science and Machine Learning Bootcamp", 
        "Python for Data Science", "TensorFlow for Deep Learning", "Reinforcement Learning Specialization", 
        "Machine Learning by Stanford University", "Deep Learning by Andrew Ng", 
        "Artificial Intelligence Nanodegree", "AI and Machine Learning for Business", 
        "Intro to Machine Learning with PyTorch", "AWS Certified Solutions Architect", 
        "Google Cloud Professional Data Engineer", "Microsoft Certified: Azure AI Engineer Associate", 
        "Cloud Computing Specialization", "IBM Data Science Professional Certificate", 
        "Data Scientist Nanodegree", "Deep Learning AI", "Neural Networks and Deep Learning", 
        "Big Data Specialization", "Deep Learning with TensorFlow", "Data Science Methodology",
        "Introduction to Cloud Computing", "AI and Machine Learning in Python", 
        "Introduction to Artificial Intelligence (AI)", "Advanced Machine Learning with TensorFlow", 
        "Machine Learning Engineer Nanodegree", "Computer Vision Nanodegree", 
        "Natural Language Processing with Python", "Microsoft Certified: Azure Data Scientist Associate", 
        "Certified Data Scientist", "Python for Machine Learning and Data Science", 
        "Data Science Capstone Project", "Full Stack Web Development with JavaScript", 
        "Certified TensorFlow Developer", "Natural Language Processing Specialization", 
        "Udacity Machine Learning Engineer", "AI for Healthcare", "Deep Learning with PyTorch"
    ]
    matcher = PhraseMatcher(nlp.vocab)
    patterns = [nlp(skill.lower()) for skill in skills_list]  # Case-insensitive matching
    matcher.add("SKILLS", patterns)

    doc = nlp(text.lower())  # Convert text to lowercase for case-insensitive matching
    matches = matcher(doc)
    skills = [doc[start:end].text for match_id, start, end in matches]
    return list(set(skills))

# Function to extract education
def extract_education(text):
    education_list = [
        "Bachelor", "Bachelors", "B.Sc", "B.Tech", "B.E", "B.E.", "Bachelor of Science", 
        "Bachelor of Technology", "Bachelor of Engineering", "Master", "Masters", "M.Sc", 
        "M.Tech", "M.E", "M.E.", "Master of Science", "Master of Technology", 
        "Master of Engineering", "PhD", "Ph.D", "Doctorate", "Postgraduate", "Graduate", 
        "Diploma", "Certification", "Degree", "High School", "Associate Degree", 
        "Undergraduate", "Postgraduate Diploma", "Engineering", "B.Com", "M.Com", 
        "Bachelor of Commerce", "Master of Commerce", "BBA", "MBA", "Bachelor of Business Administration", 
        "Master of Business Administration", "BCA", "MCA", "Bachelor of Computer Applications", 
        "Master of Computer Applications", "LLB", "LL.M", "Bachelor of Law", "Master of Law",
        "Education", "Educational Qualification", "Academic Background", "Academic Qualification",
        "Qualification", "Qualifications","Computer Science Engineering in Data Science"
    ]
    matcher = PhraseMatcher(nlp.vocab)
    patterns = [nlp(education.lower()) for education in education_list]  # Case-insensitive matching
    matcher.add("EDUCATION", patterns)

    doc = nlp(text.lower())  # Convert text to lowercase for case-insensitive matching
    matches = matcher(doc)
    education = [doc[start:end].text for match_id, start, end in matches]
    return list(set(education))

# Function to extract experience
def extract_experience(text):
    experience_patterns = [
        r'\b\d+\+?\s*(?:years?|yrs?)\b',  # 5 years, 3+ yrs
        r'\b\d+\s*-\s*\d+\s*(?:years?|yrs?)\b',  # 3-5 years
    ]
    experiences = []
    for pattern in experience_patterns:
        experiences.extend(re.findall(pattern, text, re.IGNORECASE))  # Case-insensitive matching
    return list(set(experiences))

# Route for home page (index.html)
@app.route('/')
def index():
    return render_template('index.html')

# Route for dashboard (dashboard.html)
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# Route for resume upload (resume-upload.html)
@app.route('/resume-upload', methods=['GET', 'POST'])
def resume_upload():
    if request.method == 'POST':
        file = request.files['resume']
        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(file_path)

            # Extract text from the resume (you can use your existing functions here)
            # For now, we'll just save the file and redirect to the job section
            new_resume = Resume(filename=filename, filepath=file_path, extracted_text="")
            db.session.add(new_resume)
            db.session.commit()

            # Redirect to the job section after processing
            return redirect(url_for('job_details'))

    return render_template('resume-upload.html')

# Route for job details (job-details.html)
@app.route('/job-details')
def job_details():
    return render_template('job-details.html')

# Route for application tracker (application-tracker.html)
@app.route('/application-tracker')
def application_tracker():
    return render_template('application-tracker.html')

# Run the Flask application
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure the database and tables are created
    print("Database initialized successfully!")
    app.run(host="0.0.0.0", port=5000, debug=True)