from cfclasses import *
from playhouse import shortcuts

obj = ChicagoBallot.get(ChicagoBallot.id == 1)
print(shortcuts.model_to_dict(obj))