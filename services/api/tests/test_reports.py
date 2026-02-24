import unittest
from fastapi.testclient import TestClient

import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from app.main import app
from uuid import UUID
from datetime import datetime, timezone


class TestReportEndpoints(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(app)

    def test_create_and_get_report(self):
        # Create a report
        payload = {
            "reporter_id": str(UUID("12345678-1234-5678-1234-567812345678")),
            "category_id": "BIO_01",
            "location": {"lat": 37.7749, "lng": -122.4194},
            "observed_at": datetime.now(timezone.utc).isoformat(),
        }
        response = self.client.post("/v1/reports", json=payload)
        assert response.status_code == 201
        data = response.json()
        report_id = data["report_id"]
        # Retrieve the report
        get_resp = self.client.get(f"/v1/reports/{report_id}")
        assert get_resp.status_code == 200
        report = get_resp.json()
        assert report["report_id"] == report_id
        assert report["verification_status"] == "pending"