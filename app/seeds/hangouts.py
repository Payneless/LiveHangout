from app.models import db, Hangout
from datetime import date, time, datetime

def seed_hangouts():
	demo = Hangout(
		host=1, title="My First Hangout", link="https://discord.gg/jJvff5Y6Ef", image="https://image.shutterstock.com/image-photo/young-people-dancing-night-club-260nw-351380480.jpg", description="Hey everyone! This is my first Hangout posted here and I'm hoping to see a lot of people join! I can't wait!", category="Chill", startDate=date(2025, 3, 21), endDate=date(2025, 3, 22), startTime=time(17,00), endTime=time(2,00)
	)
	watchParty = Hangout(
		host=1, title="College Basketball Watch Party!", link="https://discord.gg/jJvff5Y6Ef", image="https://cdn.vox-cdn.com/thumbor/qPoE8cbcRZkQfVEfQ7iIxXSMNG0=/0x0:5206x3470/620x413/filters:focal(2344x1613:3176x2445):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69014344/1308326276.0.jpg", description="I am hosting a watch party for the NCAA Tournament online! I hope lots of people can make it!", category="Watch Party", startDate=date(2025, 3, 21), endDate=date(2025, 3, 21), startTime=time(17,00), endTime=time(22,00)
	)
