from os import getenv
from datetime import date, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build
from backend.models.plan import Plan


SCOPES = [
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar",
]
SERVICE_ACCOUNT_FILE = "service-account-google-credentials.json"
CALENDAR_ID = getenv("GOOGLE_CALENDAR_ID")
FUTURE_DAYS_TO_UPDATE = 7


class CalendarService:
    def __init__(self):
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES
        )
        calendar = build("calendar", "v3", credentials=credentials)

        self.calendar_events = calendar.events()

    def update_with_plan(self, plan: Plan) -> None:
        today = date.today()
        dates_to_update = [
            today + timedelta(days=n) for n in range(FUTURE_DAYS_TO_UPDATE)
        ]

        self._clear_existing_events()
        for plan_date in dates_to_update:
            planned_summary = plan.get_summary_for_day(plan_date)
            if planned_summary:
                self._create_calendar_event(day=plan_date, title=planned_summary)

    def _clear_existing_events(self) -> None:
        all_events = self.calendar_events.list(calendarId=CALENDAR_ID).execute()
        for event in all_events.get("items", []):
            self.calendar_events.delete(
                calendarId=CALENDAR_ID, eventId=event["id"]
            ).execute()

    def _create_calendar_event(self, day: date, title: str) -> None:
        self.calendar_events.insert(
            calendarId=CALENDAR_ID,
            body={
                "creator": {"self": True},
                "organizer": {"self": True},
                "summary": title,
                "start": {"date": day.isoformat()},
                "end": {"date": (day + timedelta(days=1)).isoformat()},
                "reminders": {"useDefault": True},
            },
        ).execute()
