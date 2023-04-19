from google.oauth2 import service_account
from googleapiclient.discovery import build
import os

class GoogleCalendar:
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    FILE_PATH = 'calc-384209-8d02386e0430.json'

    def __init__(self):
        credentinals = service_account.Credentials.from_service_account_file(
            filename=self.FILE_PATH, scopes=self.SCOPES
        )

        self.service = build('calendar', 'v3', credentials=credentinals)

    def get_calendar_list(self):
        return self.service.calendarList().list().execute()

    def add_calendar(self, calendar_id):
        calendar_list_entry = {
            'id': calendar_id
        }

        return self.service.calendarList().insert(body=calendar_list_entry).execute()

    def add_event(self, calendar_id, event):

        return self.service.events().insert(calendarId=calendar_id, body=event).execute()