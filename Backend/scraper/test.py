import requests

url = "https://httpbin.org/ip"

host = 'brd.superproxy.io'
port = 33335
username = 'brd-customer-hl_54c78514-zone-serp_api1'
password = '02m4d5xybt79'

# format proxy
proxy_url = f'https://{username}:{password}@{host}:{port}'
proxies = {
    'http': proxy_url
    
}

response = requests.get(url, proxies=proxies, verify='../Downloads/cacert.crt')
print(response.text)