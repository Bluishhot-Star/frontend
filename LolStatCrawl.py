import requests 
from bs4 import BeautifulSoup
# <!-- install lib -->
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
# <!-- setting headers as User-Agent -->

print('리그오브레전드 최근 20게임 결과 알리미')
user = input('소환사 명을 입력하세요 : ')
# <!-- get input the Summoner's name of League of Legends-->

data1 = requests.get(f'https://www.op.gg/summoner/userName={user}',headers=headers)
soup = BeautifulSoup(data1.text, 'html.parser')

gameresults = soup.select('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-summary > div.RealContent > div > div.Content > div.GameItemList > div')
# <!-- take the selector of the gameresult(Victory / Defeat / Remake) -->

stat = []
Vcnt, Dcnt, Rcnt = 0, 0, 0
for gameresult in gameresults:
    game = gameresult.select_one('div > div.Content > div.GameStats > div.GameResult').text.strip()
    if game == 'Victory':
        Vcnt += 1
    elif game == 'Defeat':
        Dcnt += 1
    else :
        Rcnt += 1
    stat.append(game)
# <!-- Count the gameresult -->
for i in range(len(stat)):
    print(f'{i+1:<3}|', stat[i])
print(f'승리 : {Vcnt}회 | 패배 : {Dcnt}회 | 다시하기 : {Rcnt}회')
print(f'승률 : {Vcnt/(Vcnt+Dcnt)*100}%')
# <!-- print the result and stats of the recent game for 20days & -->
