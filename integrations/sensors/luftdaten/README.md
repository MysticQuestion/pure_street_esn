# Luftdaten Integration

This directory is intended for an integration with the Luftdaten
(Sensor.Community) air quality sensor network. Luftdaten sensors are
community‑deployed devices measuring particulate matter and sometimes
temperature or humidity. An integration could:

* Collect data from the Luftdaten API or MQTT streams.
* Filter readings by geographic bounding boxes around ESN corridors.
* Convert raw measurements into the ESN sensor reading schema and store
  them via the sensor API.

The Luftdaten project provides [API documentation](https://docs.sensor.community) detailing
available endpoints and data formats.