import spacy
from sentence_transformers import SentenceTransformer, util


nlp = spacy.load('en_core_web_sm')
embed_model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_skills_from_text(text: str, top_n: int = 30):
# simple approach: extract noun chunks and named entities + split common separators
    doc = nlp(text)
    candidates = set()
    for chunk in doc.noun_chunks:
        candidates.add(chunk.text.strip().lower())
    for ent in doc.ents:
        candidates.add(ent.text.strip().lower())
    # also split by commas for some job descriptions
    for part in text.split(','):
        if len(part) > 2:
            candidates.add(part.strip().lower())
    # return top_n naive
    return list(candidates)[:top_n]



def semantic_match_score(user_skills: list[str], job_text: str):
    if not user_skills:
        return 0.0
    user_emb = embed_model.encode(user_skills, convert_to_tensor=True)
    job_emb = embed_model.encode([job_text], convert_to_tensor=True)
    sim = util.cos_sim(user_emb, job_emb).max().item()
    return float(sim)