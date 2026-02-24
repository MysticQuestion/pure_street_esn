import unittest
from fastapi.testclient import TestClient

# Adjust sys.path so that `app` can be imported when running tests from the
# repository root. Without this, Python cannot locate the `app` package
# because it resides in the `src` directory.
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from app.main import app


class TestHealthEndpoint(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(app)

    def test_health_endpoint(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["status"], "ok")
        self.assertEqual(body["service"], "esn-api")