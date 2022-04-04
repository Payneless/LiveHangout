from app.models import db, Hangout
from datetime import date, time

def seed_hangouts():
	demo = Hangout(
		host=1, title="My First Hangout", link="https://discord.gg/jJvff5Y6Ef", image="https://image.shutterstock.com/image-photo/young-people-dancing-night-club-260nw-351380480.jpg", description="Hey everyone! This is my first Hangout posted here and I'm hoping to see a lot of people join! I can't wait!", open=True, category="Chill", startDate=date(2025, 3, 21), endDate=date(2025, 3, 22), startTime=time(17,00), endTime=time(2,00)
	)
	watchParty = Hangout(
		host=2, title="College Basketball Watch Party!", link="https://discord.gg/jJvff5Y6Ef", image="https://cdn.vox-cdn.com/thumbor/qPoE8cbcRZkQfVEfQ7iIxXSMNG0=/0x0:5206x3470/620x413/filters:focal(2344x1613:3176x2445):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69014344/1308326276.0.jpg", open=False, description="I am hosting a watch party for the NCAA Tournament online! I hope lots of people can make it!", category="Watch Party", startDate=date(2025, 3, 21), endDate=date(2025, 3, 21), startTime=time(17,00), endTime=time(22,00)
	)
	ListentoThis = Hangout(
		host=3, title="Check out this Music!", link="https://discord.gg/jJvff5Y6Ef", image="https://www.lifewire.com/thmb/xFwPYBWbaOoQFqTSWNeY30tWvdQ=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-186591584-c4183cefc9684f72a9613e5f39e96bf6.jpg", description="I got music you should check out! Come listen along with me!", open=True, category="Concert", startDate=date(2024, 1, 5), endDate=date(2024, 1, 12), startTime=time(00,00), endTime=time(00,00)
	)
	CodeAlong = Hangout(
		host=1, title="I'm creating an App", link="https://discord.gg/jJvff5Y6Ef", image="https://cdn-wordpress-info.futurelearn.com/info/wp-content/uploads/into-codin.jpg", description="Coding an application for my Capstone Project! Come join in and help me or code along!", open=True, category="Workshop", startDate=date(2021, 12, 27), endDate=date(2021, 12, 30), startTime=time(9,00), endTime=time(17,00)
	)
	FutureEvent = Hangout(
		host=1, title="The Future Discussion", link="https://discord.gg/jJvff5Y6Ef", image="https://images.immediate.co.uk/production/volatile/sites/4/2018/08/22-ideas-606ea9b.jpg?webp=true&quality=90&crop=8px%2C0px%2C1183px%2C509px&resize=940%2C399", open=False, description="A talk in the future, about the future! Come discuss potential upcoming technologies and breakthroughs and what they can mean for the world in the coming years.", category="AMA", startDate=date(2022, 4, 1), endDate=date(2022, 4, 2), startTime=time(12,00), endTime=time(00,00)
	)
	DnD = Hangout(
		host=4, title="Session 0", link="https://discord.gg/jJvff5Y6Ef", image="https://cdn.discordapp.com/attachments/920440490548146189/927358397496569887/index.jpg", open=True, description="Session 0 will be an introductory session where players will learn the rules, learn the gamestyle, and make characters together to plan out their party for the upcoming sessions!", category="Chill", startDate=date(2022, 4, 1), endDate=date(2022, 4, 2), startTime=time(12,00), endTime=time(00,00)
	)
	DnD1 = Hangout(
		host=4, title="Session 1", link="https://discord.gg/jJvff5Y6Ef", image="https://cdn.discordapp.com/attachments/920440490548146189/927358397496569887/index.jpg", open=False, description="Session 1 will begin with the opening story, the reason the party gathers, as well as the first introductory combat encounter for the party!", category="Chill", startDate=date(2022, 4, 8), endDate=date(2022, 4, 9), startTime=time(12,00), endTime=time(00,00)
	)
	Example = Hangout(
		host=2, title="The General Discussion", link="https://discord.gg/jJvff5Y6Ef", image="https://cdn.discordapp.com/attachments/920440490548146189/927359644953878538/wp2416044.jpg", open=True, description="A general talk about all various topics brought up. I'll answer any and all questions kept PG!", category="AMA", startDate=date(2022, 4, 1), endDate=date(2022, 4, 2), startTime=time(12,00), endTime=time(00,00)
	)
	ExampleTwo = Hangout(
		host=3, title="Journalist AMA", link="https://discord.gg/jJvff5Y6Ef", image="https://cdn.discordapp.com/attachments/920440490548146189/927360038660620288/Trophy_1920x1080.jpg", open=False, description="Diving into specifics covering my professional career as a journalist overseas over the past decade. I've got many stories to share, so ask away!.", category="AMA", startDate=date(2022, 4, 1), endDate=date(2022, 4, 2), startTime=time(12,00), endTime=time(00,00)
	)


	db.session.add(demo)
	db.session.add(watchParty)
	db.session.add(ListentoThis)
	db.session.add(CodeAlong)
	db.session.add(FutureEvent)
	db.session.add(DnD)
	db.session.add(DnD1)
	db.session.add(Example)
	db.session.add(ExampleTwo)


	db.session.commit()


def undo_hangouts():
		db.session.execute('TRUNCATE hangouts RESTART IDENTITY CASCADE;')
		db.session.commit()
