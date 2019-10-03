import requests
from bs4 import BeautifulSoup

page = requests.get('https://qz.com/india/latest') 
soup = BeautifulSoup(page.content, 'html.parser')

weblinks = soup.find_all('article')
pagelinks = []
for link in weblinks:    
    url = link.contents[0].find_all('a')[0]   
    pagelinks.append('http://qz.com'+url.get('href'))

for link in pagelinks:
    page = requests.get(link)
    soup = BeautifulSoup(page.text, 'html.parser')
    abody = soup.find(class_='_5e088').find('a')
    aname = abody.get_text()
    print(aname)
