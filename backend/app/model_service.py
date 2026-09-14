import asyncio
import logging
import re
from collections import Counter

logger = logging.getLogger(__name__)

class ModelService:
    def __init__(self):
        self.is_loaded = False
        # Common Arabic stopwords to ignore when scoring
        self.stopwords = set([
            "في", "من", "على", "إلى", "عن", "ب", "ل", "ك", "أن", "أنه", "التي", "الذي", 
            "هذا", "هذه", "كان", "كانت", "مع", "ذلك", "وقد", "كما", "أو", "و", "ثم", 
            "بعد", "قبل", "عند", "حتى", "بين", "إن", "إذا", "لا", "ما", "لم", "لن", "هل"
        ])

    def load_model(self):
        if self.is_loaded:
            return
        logger.info("Initializing Pure Python offline summarizer (Zero Dependencies)...")
        self.is_loaded = True

    def _split_sentences(self, text: str) -> list[str]:
        # Split by arabic full stops, question marks, and exclamation marks
        sentences = re.split(r'[.؟!؛\n]+', text)
        return [s.strip() for s in sentences if len(s.strip()) > 10]

    def _tokenize(self, text: str) -> list[str]:
        # Extract Arabic words
        words = re.findall(r'[\u0600-\u06FF]+', text)
        return [w for w in words if w not in self.stopwords]

    async def summarize_async(self, article: str) -> list[str]:
        if not self.is_loaded:
            self.load_model()
            
        logger.info("Generating real summary using offline pure Python logic...")
        await asyncio.sleep(0.1) # yield event loop
        
        try:
            sentences = self._split_sentences(article)
            if not sentences:
                return ["النص فارغ أو قصير جداً للتلخيص."]
            if len(sentences) <= 3:
                return sentences
                
            # Calculate global word frequencies
            words = self._tokenize(article)
            word_freq = Counter(words)
            max_freq = max(word_freq.values()) if word_freq else 1
            
            # Normalize frequencies
            for word in word_freq:
                word_freq[word] = word_freq[word] / max_freq
                
            # Score sentences
            sentence_scores = {}
            for i, sentence in enumerate(sentences):
                score = 0
                sentence_words = self._tokenize(sentence)
                for word in sentence_words:
                    score += word_freq.get(word, 0)
                # Normalize score by sentence length to avoid bias towards very long sentences
                if sentence_words:
                    sentence_scores[i] = score / len(sentence_words)
                else:
                    sentence_scores[i] = 0
                    
            # Get top 3 sentences (keeping their original order)
            top_indices = sorted(sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:3])
            
            summary_points = [sentences[i] for i in top_indices]
            return summary_points
            
        except Exception as e:
            logger.error(f"Summarization error: {e}")
            return ["حدث خطأ أثناء محاولة التلخيص بالاعتماد الذاتي."]

model_service = ModelService()
