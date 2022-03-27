from google.cloud import language_v1
from google.oauth2 import service_account
from gcp_creds import get_creds


def get_sentiment(review: str) -> str:

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
        mood = "positive 😀"

    elif score >= -0.25 < 0.25:
        mood = "neutral 😐"
    else:
        mood = "negative 😡"

    return {mood, score}
