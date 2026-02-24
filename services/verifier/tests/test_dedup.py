import unittest
import os
import sys

# Ensure the `esn_verifier` package in the `src` directory is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from esn_verifier.dedup import GeoReportCandidate, check_duplicate


class TestDeduplication(unittest.TestCase):
    def test_non_duplicate(self):
        existing = [GeoReportCandidate("r1", 37.7749, -122.4194, "DUMP_01")]
        decision = check_duplicate(37.78, -122.42, "BIO_01", existing)
        self.assertFalse(decision.is_duplicate)
        self.assertEqual(decision.action, "CREATE_NEW_TICKET")

    def test_duplicate(self):
        existing = [GeoReportCandidate("r1", 37.7749, -122.4194, "BIO_01")]
        decision = check_duplicate(37.775, -122.4195, "BIO_01", existing, radius_meters=100)
        self.assertTrue(decision.is_duplicate)
        self.assertEqual(decision.action, "MERGE_DUPLICATE")
        self.assertEqual(decision.duplicate_of_report_id, "r1")