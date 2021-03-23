import pickle
import gensim
from razdel import tokenize
import regex
import stopwordsiso
from typing import List, Union, Dict, Any, Set

LOCAL_FT_PATH = "hseling-data-antidict/api/models/fasttext/araneum_none_fasttextcbow_300_5_2018.model"
DOCKER_FT_PATH = "/data/models/fasttext/araneum_none_fasttextcbow_300_5_2018.model"

stops = set("""чей свой из-за вполне вообще вроде сюда аж той
россия россии россию россией путин путина путину путиным путине
даю даешь дает даем даете дают""".split())
stops = stops | stopwordsiso.stopwords("ru")

with open("hseling-api-antidict/hseling_api_antidict/models/classifier.pkl", "rb") as file:
    loanword_clf = pickle.load(file)
with open("hseling-api-antidict//hseling_api_antidict/models/cb_classifier.pkl", "rb") as file:
    obscene_clf = pickle.load(file)
with open("hseling-api-antidict//hseling_api_antidict/models/expressive_classifier.pkl", "rb") as file:
    expressive_clf = pickle.load(file)


try:
    model = gensim.models.KeyedVectors.load(LOCAL_FT_PATH)
except FileNotFoundError:
    model = gensim.models.KeyedVectors.load(DOCKER_FT_PATH)


def statistics(analysis: List[dict]) -> dict:
    total = len(analysis)
    loanword = len([t for t in analysis if t["loanword"]])
    obscene = len([t for t in analysis if t["obscene"]])
    expressive = len([t for t in analysis
                      if (t["obscene"] or t["expressive"])])
    stats = {"loanword_ratio": loanword,
             "obscene_ratio": obscene,
             "expressive_ratio": expressive}
    return {k: round(v / total, 2) for k, v in stats.items()}


def is_word(token: str, min_len: int, max_len: int, s_words: Set[str]) -> bool:
    t = token.lower()
    min_max = str(min_len) + ',' + str(max_len)
    return regex.fullmatch(r"[а-яё\-]{" + min_max + "}", t) and (t not in s_words)


def predict(text: str) -> List[Dict[str, Union[List[Dict[str, Any]], dict]]]:
    tokens = [t.text for t in tokenize(text)]
    cache = {t: {"loanword": 0, "obscene": 0, "expressive": 0}
             for t in set(t.lower() for t in tokens)}
    for t in cache:
        if is_word(t, min_len=3, max_len=30, s_words=stops):
            cache[t]["emb"] = model[t]
            cache[t]["loanword"] = loanword_clf.predict([cache[t]["emb"]]).item()
            cache[t]["obscene"] = obscene_clf.predict([cache[t]["emb"]]).item()
            cache[t]["expressive"] = expressive_clf.predict([cache[t]["emb"]]).item()
    analysis = [{"word": t,
                 "loanword": cache[t.lower()]["loanword"],
                 "obscene": cache[t.lower()]["obscene"],
                 "expressive": cache[t.lower()]["expressive"]
                 } for t in tokens]
    a = [{"word": d["word"], "categories": [k for k, v in d.items() if v and k != "word"]} for d in analysis]
    return [{"analysis": a, "statistics": statistics(analysis)}]
