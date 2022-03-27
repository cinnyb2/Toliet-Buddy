from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials, firestore
from gcp_creds import get_creds
from google.cloud import language_v1
from google.oauth2 import service_account

app = FastAPI()


@app.get("/")
async def root():
    return "hello world"


@app.get("/locations")
async def get_locations():

    creds_json = get_creds(local=True)

    creds = credentials.Certificate(creds_json)
    app = firebase_admin.initialize_app(creds)

    db = firestore.client()

    docs = db.collection("restrooms").stream()

    loc_dicts = {}
    for idx, doc in enumerate(docs):
        doc_info = doc.to_dict()
        loc_dicts[idx] = [doc_info["latitude"], doc_info["longitude"]]

    return loc_dicts


@app.get("/sentiment")
async def get_sentiment(review: str = "I hated this toilet") -> str:

    creds_json = get_creds(local=True)

    creds = service_account.Credentials.from_service_account_info(creds_json)

    client = language_v1.LanguageServiceClient(credentials=creds)

    document = language_v1.Document(
        content=review, type_=language_v1.Document.Type.PLAIN_TEXT
    )

    sentiment = client.analyze_sentiment(
        request={"document": document}
    ).document_sentiment

    score = round(sentiment.score, 3)

    if score >= 0.25 <= 1.0:
        response = "Your review of the bathroom is positive 😀"

    elif score >= -0.25 < 0.25:
        response = "Your review of the bathroom is neutral 😐"
    else:
        response = "Your review of the bathroom is negative 😡"

    return {response, score}


@app.post("/form_submit")
async def submit_details():
    pass
