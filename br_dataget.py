import requests
import json

# fetch some position data based on address
# data = open("samplepos.json","w")
# header = {'x-api-key': 'bre6oJ2HAO3wMXQs6mkhY31LqgEkK6Eo8zvUSbpZ'}
# urlen = {'address' : '2154 W Walton St, Chicago, IL 60622, USA', 'include_candidates': 1}
# r = requests.get('https://api.civicengine.com/positions',headers=header,params=urlen)
# try:
#   json.dump(r.json(),data)
# except ValueError as e:
#   data.write(r.text)
# 
# data.close()


# fetch my positions data for demo
# data = open("mydist.json","w")
# header = {'x-api-key': 'bre6oJ2HAO3wMXQs6mkhY31LqgEkK6Eo8zvUSbpZ'}
# urlen = {'address' : '2154 W Walton St, Chicago, IL 60622, USA'}
# r = requests.get('https://api.civicengine.com/districts',headers=header,params=urlen)
# try:
#   json.dump(r.json(),data)
# except ValueError as e:
#   data.write(r.text)
# data.close()


# data = open("mypos.json","w")
# header = {'x-api-key': 'bre6oJ2HAO3wMXQs6mkhY31LqgEkK6Eo8zvUSbpZ'}
# urlen = {'address' : '2154 W Walton St, Chicago, IL 60622, USA', 'include_candidates': 1, 'election_id': 840}
# r = requests.get('https://api.civicengine.com/positions',headers=header,params=urlen)
# try:
#   json.dump(r.json(),data)
# except ValueError as e:
#   data.write(r.text)

# data.close()


# data = open("samplecand.json","w")
# header = {'x-api-key': 'bre6oJ2HAO3wMXQs6mkhY31LqgEkK6Eo8zvUSbpZ'}
# urlen = {'election_id' : 840}
# r = requests.get('https://api.civicengine.com/candidate/399824',headers=header,params=urlen)
# try:
#   json.dump(r.json(),data)
# except ValueError as e:
#   data.write(r.text)

# data.close()

data = open("2.json","w")
header = {'x-api-key': 'bre6oJ2HAO3wMXQs6mkhY31LqgEkK6Eo8zvUSbpZ'}
urlen = {'election_id' : 840}
r = requests.get('https://api.civicengine.com/candidate/2',headers=header,params=urlen)
try:
  json.dump(r.json(),data)
except ValueError as e:
  data.write(r.text)

# data.close()

