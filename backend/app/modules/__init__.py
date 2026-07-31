"""
Pluggable Investigation Modules.

Each module implements one stage of the ACaaS pipeline. Modules are
designed to be independently replaceable — swap the Curiosity Engine
for a more advanced algorithm without touching other components.

Modules communicate ONLY through typed Pydantic models (defined in
app/models/). No module imports another module directly.
"""
