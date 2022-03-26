# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import streamlit as st
from dotenv import load_dotenv


def init_twilio(local=False):
    """
    Initialize twilio client
    Find your Account SID and Auth Token at twilio.com/console
    """

    if local == True:
        load_dotenv()
        ACCOUNT_SID = os.getenv("ACCOUNT_SID")
        AUTH_TOKEN = os.getenv("AUTH_TOKEN")

    client = Client(ACCOUNT_SID, AUTH_TOKEN)

    return client


def create_service(client):
    """
    Creates a service SID for verify API https://www.twilio.com/docs/verify/api
    Check service in console https://www.twilio.com/console/verify/services
    """

    # create with api
    service = client.verify.services.create(friendly_name="Toilet Buddy")

    return service["sid"]


def send_ver_code(client, service_sid, user_name: str, to_phone: str):
    """send verification code to user to verify phone number"""

    try:
        # send code to user
        verification = client.verify.services(service_sid).verifications.create(
            to=to_phone, channel="sms"
        )
    except Exception as err:
        print(f"Exception caught: {err}")


def verify_code(client, service_sid: str, code: str) -> bool:
    """verify code sent to user"""

    try:
        verification_check = client.verify.services(
            service_sid
        ).verification_checks.create(to="+15017122661", code=code)
    except Exception as err:
        print(f"Exception caught: {err}")

    return verification_check.status


def send_message(to_phone: str, message: str) -> str:

    client = init_twilio(local=True)

    # twilio acc phone number
    from_phone = "+15154979533"

    try:
        message = client.messages.create(body=message, from_=from_phone, to=to_phone)
    except Exception as err:
        print(f"Exception caught: {err}")

    return "message successfully sent!"


# example usage of api
def main():
    to_phone = +15153880996
    name = "Ben"
    message = "There are 10 toilets nearby! The closest one is ..."

    client = init_twilio()
    service_sid = create_service(client)

    send_ver_code(client, service_sid, to_phone)

    # await user input of code
    code = 123456

    # callback function awaiting user input
    res = verify_code(client, service_sid, code)

    if res == "approved":
        send_message(to_phone, message)
    else:
        print("code not approved")
