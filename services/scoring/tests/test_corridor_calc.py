import unittest
import os
import sys

# Adjust path to import esn_scoring from src directory
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from esn_scoring.corridor_calc import Report, calculate_corridor_health


class TestCorridorCalc(unittest.TestCase):
    def test_high_score(self):
        reports = [Report(base_severity=1, confidence_multiplier=1.0) for _ in range(5)]
        result = calculate_corridor_health(reports, last_month_deductions=10.0)
        self.assertGreaterEqual(result["score"], 90)
        self.assertEqual(result["grade"], "A")
        self.assertEqual(result["trend"], "improving")

    def test_low_score(self):
        reports = [Report(base_severity=5, confidence_multiplier=1.5) for _ in range(10)]
        result = calculate_corridor_health(reports, last_month_deductions=50.0)
        self.assertEqual(result["grade"], "F")
        self.assertEqual(result["trend"], "declining")