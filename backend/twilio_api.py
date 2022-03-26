# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import streamlit as st
from dotenv import load_dotenv


def twilio_init(local=False):
    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure

    if local == True:
        load_dotenv()
        ACCOUNT_SID = os.getenv("ACCOUNT_SID")
        AUTH_TOKEN = os.getenv("AUTH_TOKEN")
    client = Client(ACCOUNT_SID, AUTH_TOKEN)

    return client


def send_message(client, from_phone: str, to_phone: str, message: str) -> str:

    try:
        message = client.messages.create(body=message, from_=from_phone, to=to_phone)
    except Exception as err:
        print(f"Exception caught: {err}")
