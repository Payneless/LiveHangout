from app.models import db, Bookmark

def seed_bookmarks():
	AOne = Bookmark(
		userId=1, hangoutId=5
	)
	BOne = Bookmark(
		userId=2, hangoutId=5
	)
	COne = Bookmark(
		userId=3, hangoutId=5
	)

	db.session.add(AOne)
	db.session.add(BOne)
	db.session.add(COne)

	db.session.commit()

def undo_bookmarks():
		db.session.execute('TRUNCATE bookmarks RESTART IDENTITY CASCADE;')
		db.session.commit()
