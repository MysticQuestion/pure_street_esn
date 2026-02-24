# Custom Sensors

Use this directory to document and implement integrations for custom or
proprietary sensors. A custom sensor could be a handheld device used by
Pure Street crews, an IoT device deployed for pilot corridors or any
hardware platform that is not covered by existing integrations.

For each custom sensor type, provide:

* A brief description of the hardware and measured parameters.
* The data format (e.g. JSON, CSV) and any transformation required.
* Transport mechanism (e.g. REST API, MQTT, WebSocket).
* Authentication or registration steps.
* Calibration or quality control procedures.

By standardising custom sensor integration here, ESN remains extensible
without introducing ad hoc ingestion pathways.