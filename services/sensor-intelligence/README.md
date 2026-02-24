# ESN Sensor Intelligence Service

This service contains the environmental sentinel network logic originally developed for Pure Street.  It models a network of sensor nodes, ingests telemetry (temperature, particulate matter, nitrogen dioxide, noise, humidity), computes composite risk scores, and propagates alerts to neighboring nodes.

Although ESN-Lite focuses on hazard reporting, the sensor intelligence layer will be integrated in later phases to enrich corridor risk models and predictive analytics.

## Key Modules

* `sentinel_network.py` – Defines classes for telemetry, alerts, node status, and the `EnvironmentalSentinelNetwork` class for ingesting and scoring sensor data.
* `bootstrap_network` – Utility for building a network graph from an edge list.

For usage examples and API details, refer to the docstring in `sentinel_network.py` and the unit tests in `tests/test_sentinel_network.py`.