# ts-esn-types

This package exports TypeScript interfaces and types shared between the ESN
web and mobile applications. By keeping type definitions in a central
package, we ensure consistency across clients and facilitate API integration.

Interfaces defined here correspond to the JSON schemas in `data/schemas` and
the Python dataclasses in `py-esn-core`. When modifying the schemas,
remember to update these types accordingly.